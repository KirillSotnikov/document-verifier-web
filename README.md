# Document Verifier Dashboard

A modern, decentralized web application for registering and verifying documents on the blockchain. Built with React, TypeScript, RainbowKit, Wagmi, and Ethers, this dashboard allows users to securely upload documents, store their hashes on-chain, and verify authenticity across multiple EVM networks (Polygon Amoy, Ethereum Sepolia).

---

## Features
- Register documents by uploading files or entering text
- Verify document authenticity using blockchain
- Multi-network support (Polygon Amoy, Ethereum Sepolia)
- Wallet connection and network switching (RainbowKit)
- Transaction status, error handling, and user notifications
- Responsive, modern UI with Tailwind CSS

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app locally:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
---

## Configuration
- Update contract addresses and supported networks in `src/hooks/config.ts` as needed.
- The app uses RainbowKit and Wagmi for wallet and network management.

---

## License

MIT © 2025

---

## Author

Made by Kyrylo Sotnykov · [GitHub](https://github.com/KirillSotnikov)