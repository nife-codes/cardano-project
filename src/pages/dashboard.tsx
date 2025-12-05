import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState, useEffect } from "react";
import { mintDrugBatch } from "../utils/mint"; // Import your new engine

export default function ManufacturerDashboard() {
    const { connected, wallet } = useWallet();
    const [isClient, setIsClient] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => { setIsClient(true); }, []);

    // --- THE NEW MINTING FUNCTION ---
    const handleMint = async () => {
        setStatus("⏳ Processing... Please sign in your wallet.");
        try {
            // Test Data (In a real app, this comes from a form)
            const testBatch = {
                drugName: "Amartem",
                batchId: "BATCH-" + Math.floor(Math.random() * 1000), // Random ID so we can mint multiple times
                expiryDate: "2028-12-01",
                manufacturer: "Emzor",
                quantity: "5000"
            };

            const hash = await mintDrugBatch(wallet, testBatch);
            setStatus(`✅ Success! Batch Minted. Tx Hash: ${hash}`);
        } catch (error: any) {
            console.error(error);
            setStatus("❌ Error: " + error.message);
        }
    };

    if (!isClient) return null;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "40px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", padding: "30px", borderRadius: "15px" }}>
                <h1 style={{ color: "#1f2937", fontSize: "28px" }}>🏭 Manufacturer Portal</h1>

                <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                    <span style={{ fontWeight: "bold", color: connected ? "green" : "orange" }}>
                        {connected ? "🟢 System Online" : "🟠 Waiting..."}
                    </span>
                    <CardanoWallet />
                </div>

                {connected && (
                    <div style={{ marginTop: "20px" }}>
                        <h3 style={{ color: "#374151" }}>Quick Actions</h3>

                        {/* THE ACTION BUTTON */}
                        <button
                            onClick={handleMint}
                            style={{ padding: "20px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px", marginRight: "10px" }}
                        >
                            🧪 Mint Test Batch
                        </button>

                        <p style={{ marginTop: "20px", fontWeight: "bold", color: "#333" }}>{status}</p>
                    </div>
                )}
            </div>
        </div>
    );
}