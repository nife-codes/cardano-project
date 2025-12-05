import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState, useEffect } from "react";

export default function ManufacturerDashboard() {
    const { connected } = useWallet();
    const [isClient, setIsClient] = useState(false);

    // Fix: Hydration error prevention
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "40px" }}>

            {/* HEADER SECTION */}
            <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h1 style={{ color: "#1f2937", fontSize: "28px", marginBottom: "10px" }}>
                    🏭 Manufacturer Portal
                </h1>
                <p style={{ color: "#6b7280", marginBottom: "30px" }}>
                    Securely mint and track pharmaceutical batches on the Cardano blockchain.
                </p>

                {/* GOAL 1: WALLET INTEGRATION */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb", paddingBottom: "20px", marginBottom: "20px" }}>
                    <span style={{ fontWeight: "bold", color: connected ? "green" : "orange" }}>
                        {connected ? "🟢 System Online" : "🟠 Waiting for Connection..."}
                    </span>
                    {/* This component handles all wallet logic automatically */}
                    <CardanoWallet />
                </div>

                {/* SECURE AREA (Only visible if connected) */}
                {connected ? (
                    <div style={{ marginTop: "20px" }}>
                        <h3 style={{ color: "#374151" }}>Quick Actions</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "15px" }}>
                            <button style={{ padding: "20px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" }}>
                                🧪 Mint New Batch
                            </button>
                            <button style={{ padding: "20px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" }}>
                                📜 View Batch History
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>
                        🔒 Please connect your Emzor Wallet to access the manufacturing tools.
                    </div>
                )}

            </div>
        </div>
    );
}