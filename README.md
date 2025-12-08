💊 **MediSure: Decentralized Pharmaceutical Verification**

📋 **Project Summary**

MediSure is a blockchain-based supply chain tracking application built on Cardano. It allows pharmaceutical manufacturers to mint digital twins (NFTs) of drug batches, distributors to track them, and patients to instantly verify authenticity using a transparent, immutable ledger.

**🔴 The Problem**

Fake drugs kill thousands of people in Nigeria annually.

**Trust Gap**: Patients cannot verify if the medicine in their hand is real.

**Centralized Failure**: Scratch-card systems rely on central databases that can be hacked or manipulated by corrupt insiders.

**Visibility**: Manufacturers lose sight of their products once they leave the factory.

**🟢 The Solution**

We built a decentralized Track-and-Trace system.

**Minting**: Manufacturers verify their identity and mint "Batch Tokens" (NFTs) representing physical drugs.

**Tracking**: These tokens are transferred through the supply chain wallets (Factory → Distributor).

**Verification**: Patients scan a QR code (Asset ID) to query the blockchain directly, receiving a "Verified" or "Fake" status without needing a middleman.

**⚡ Why Blockchain / Cardano?**

**Immutability**: Once a drug batch is minted on Cardano, its data (expiry, composition) cannot be changed by anyone, preventing data tampering.

**Native Assets**: Cardano handles tokens natively without complex smart contracts, reducing costs and security risks.

**Low Fees**: The transaction fees on Cardano are low enough to make tracking everyday medicine economically viable in Nigeria.

**🛠️ Technical Stack**

**Frontend**: Next.js (React), TypeScript

**Blockchain SDK**: MeshJS

**Data Provider**: Blockfrost API

**Network**: Cardano Preprod Testnet

**🚀 How to Test the MVP**

**Clone the Repo:**

Bash

git clone https://github.com/[YOUR-USERNAME]/MediSure.git

cd MediSure

**Install Dependencies:**

Bash

npm install

**Run Development Server:**

Bash

npm run dev
**Open Browser:** Go to http://localhost:3000

**Live Demo Link**: https://medisure-ebon.vercel.app/

**📜 Smart Contract Workflow**


**1. The Core Logic:** Native Scripts (Minting Policy)
MediSure does not rely on a centralized database. Instead, it uses Cardano Native Scripts to define the rules of existence for every batch of medicine.

**The Policy:** We utilize a ForgeScript with a "One Signature" constraint.

**How it works:** When the Manufacturer connects their wallet, the application derives a unique Policy ID based on their wallet's signature. This ensures that only the specific Manufacturer's wallet can ever mint tokens under this Policy ID.

**Security:** If a counterfeiter tries to create a fake "Amartem" token, it will have a different Policy ID, and the MediSure verification system will immediately reject it.

**2. The Asset: Non-Fungible Token (NFT) Generation**

When the "Mint" command is executed, the application builds a Cardano transaction that performs two atomic actions:

**Minting:** It generates exactly 1 unit of a unique asset (The Batch Token). This scarcity (Quantity = 1) makes it a Non-Fungible Token (NFT), representing a specific physical box or pallet of medicine.

**Naming**: The Asset Name is converted to Hexadecimal (e.g., Batch-2025-001) to comply with ledger standards.

**3. The Data: On-Chain Metadata (CIP-25 Standard)**

To create a "Digital Twin" of the medicine, we attach metadata directly to the minting transaction using the CIP-25 (Cardano Improvement Proposal 25) standard.

This data is not stored on a cloud server; it is etched into the blockchain transaction itself.

**Batch ID:** Unique identifier.

**Expiry Date:** Critical safety data.

**Manufacturer:** The verified identity.

**Chemical Composition:** Drug details.

Because this data is on-chain, it is immutable (cannot be changed) and permanent (cannot be deleted).

**4. The Verification: Zero-Knowledge Trust**

The Patient Verification Portal acts as a "Block Explorer" tailored for healthcare.

**Query:** The app searches the Cardano Preprod network for the specific Policy ID or Asset ID.

**Validation:** It cross-references the token found on-chain against the known Policy ID of the legitimate manufacturer.

**Result:**

**Match:** The Green Checkmark ✅ proves the drug originated from the Manufacturer's wallet.

**No Match:** The system flags the product as counterfeit.
