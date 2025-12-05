import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState, useEffect } from "react";
import { stringToHex } from "@meshsdk/core";
import { mintDrugBatch } from "../utils/mint";
import { transferDrugBatch } from "../utils/transfer"; // Import new engine

export default function ManufacturerDashboard() {
    const { connected, wallet } = useWallet();
    const [isClient, setIsClient] = useState(false);
    const [status, setStatus] = useState("");

    // YOUR POLICY ID (From the previous step)
    const MY_POLICY_ID = "dea909d9658e872bd9827cafda7a5d415c753a9ff3310a3f59dad227";

    // Form State
    const [recipient, setRecipient] = useState("");
    const [batchToTransfer, setBatchToTransfer] = useState("");

    useEffect(() => { setIsClient(true); }, []);

    // --- MINT ACTION ---
    const handleMint = async () => {
        setStatus("⏳ Minting... Please sign.");
        try {
            const randomId = "BATCH-" + Math.floor(Math.random() * 1000);
            const testBatch = {
                drugName: "Amartem",
                batchId: randomId,
                expiryDate: "2028-12-01",
                manufacturer: "Emzor",
                quantity: "5000"
            };
            const hash = await mintDrugBatch(wallet, testBatch);
            setStatus(`✅ Minted! ID: ${randomId}`);
            // Auto-fill the transfer box for convenience
            setBatchToTransfer("Batch" + randomId.replace(/[^a-zA-Z0-9]/g, ""));
        } catch (error: any) {
            console.error(error);
            setStatus("❌ Mint Error: " + error.message);
        }
    };

    // --- TRANSFER ACTION ---
    const handleTransfer = async () => {
        if (!recipient || !batchToTransfer) {
            alert("Please enter a Recipient Address and Batch Name");
            return;
        }
        setStatus("🚚 Transferring... Please sign.");

        try {
            // Convert English Name (Batch-123) to Hex
            const assetNameHex = stringToHex(batchToTransfer);

            const hash = await transferDrugBatch(wallet, recipient, MY_POLICY_ID, assetNameHex);
            setStatus(`✅ Transfer Successful! Hash: ${hash}`);
        } catch (error: any) {
            console.error(error);
            setStatus("❌ Transfer Error: " + error.message);
        }
    };

    if (!isClient) return null;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "40px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", padding: "30px", borderRadius: "15px" }}>
                <h1 style={{ color: "#1f2937", fontSize: "28px" }}>🏭 Manufacturer Portal</h1>

                <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                    <span style={{ fontWeight: "bold", color: connected ? "green" : "orange" }}>
                        {connected ? "🟢 Online" : "🟠 Offline"}
                    </span>
                    <CardanoWallet />
                </div>

                {connected && (
                    <div style={{ marginTop: "20px" }}>

                        {/* SECTION 1: MINT */}
                        <div style={{ padding: "20px", background: "#eff6ff", borderRadius: "10px", marginBottom: "20px" }}>
                            <h3>Step 1: Create Product</h3>
                            <button
                                onClick={handleMint}
                                style={{ padding: "10px 20px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                            >
                                🧪 Mint New Batch
                            </button>
                        </div>

                        {/* SECTION 2: TRANSFER */}
                        <div style={{ padding: "20px", background: "#ecfdf5", borderRadius: "10px" }}>
                            <h3>Step 2: Ship to Distributor</h3>

                            <input
                                type="text"
                                placeholder="Recipient Wallet Address (addr_test...)"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                            />

                            <input
                                type="text"
                                placeholder="Batch Name (e.g. Batch123)"
                                value={batchToTransfer}
                                onChange={(e) => setBatchToTransfer(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                            />

                            <button
                                onClick={handleTransfer}
                                style={{ padding: "10px 20px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                            >
                                🚚 Send Shipment
                            </button>
                        </div>

                        <p style={{ marginTop: "20px", fontWeight: "bold", color: "#333" }}>{status}</p>
                    </div>
                )}
            </div>
        </div>
    );
}