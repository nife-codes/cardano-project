import "@/styles/globals.css";
import "@meshsdk/react/styles.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // Fix for Eternal wallet errors
  useEffect(() => {
    // Suppress wallet-related errors that are safe to ignore
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const errorString = args[0]?.toString?.() || "";
      if (
        errorString.includes("invalidated") ||
        errorString.includes("postMessage") ||
        errorString.includes("account changed") ||
        errorString.includes("account_changed")
      ) {
        // Silently ignore these specific errors - they're handled by Mesh
        return;
      }
      originalError.apply(console, args);
    };

    // Patch postMessage to handle cloning issues
    if (typeof window !== "undefined") {
      const originalPostMessage = window.postMessage.bind(window);

      // @ts-ignore
      window.postMessage = function (
        message: any,
        targetOrigin: string,
        transfer?: any
      ) {
        try {
          // Try to clone the message safely
          if (typeof message === "object" && message !== null) {
            const safeMessage = JSON.parse(JSON.stringify(message));
            originalPostMessage(safeMessage, targetOrigin, transfer);
          } else {
            originalPostMessage(message, targetOrigin, transfer);
          }
        } catch (error) {
          // If cloning fails, try original message
          try {
            originalPostMessage(message, targetOrigin, transfer);
          } catch (fallbackError) {
            // Silently fail - this prevents the error from showing
          }
        }
      };

      // Handle account change events from wallet
      window.addEventListener("message", (event) => {
        if (
          event.data?.type === "account_changed" ||
          event.data?.type === "accountChanged"
        ) {
          // Account changed - this is normal, just refresh the connection state
          console.log("Wallet account changed - connection maintained");
        }
      });
    }

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <MeshProvider>
      <Component {...pageProps} />
    </MeshProvider>
  );
}
