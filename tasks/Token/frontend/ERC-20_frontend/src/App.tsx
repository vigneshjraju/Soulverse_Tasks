import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI } from "./abi/abi.ts";
import type { MetaMaskInpageProvider } from "@metamask/providers";
import Sidebar from "./components/Sidebar.tsx";
import TopBar from "./components/TopBar.tsx";
import Dashboard from "./components/Dashboard.tsx";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const CONTRACT_ADDRESS = "0xB1e19139D382d891dd7fc6F6BB1744acE03Fd594";

function App() {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<string>("");

  // Connect wallet and contract
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);
      const token = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(token);
      const bal = await token.balanceOf(userAddress);
      setBalance(bal.toString());
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Update balance
  const updateBalance = async () => {
    if (contract && account) {
      const bal = await contract.balanceOf(account);
      setBalance(bal.toString());
    }
  };

  // Mint tokens
  const mint = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.mint(account, ethers.parseUnits("1000", 18));
      await tx.wait();
      alert("Minted 1000 tokens!");
      updateBalance();
    } catch (err: any) {
      alert("Mint failed: " + err.message);
    }
    setLoading(false);
  };

  // Burn tokens
  const burn = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.burn(ethers.parseUnits("100", 18));
      await tx.wait();
      alert("Burned 100 tokens!");
      updateBalance();
    } catch (err: any) {
      alert("Burn failed: " + err.message);
    }
    setLoading(false);
  };

  // Redeem tokens
  const redeem = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.redeem(ethers.parseUnits("50", 18));
      await tx.wait();
      alert("Redeemed 50 tokens!");
      updateBalance();
    } catch (err: any) {
      alert("Redeem failed: " + err.message);
    }
    setLoading(false);
  };

  // Send tokens to another address
  const sendTokens = async () => {
    if (!contract) return;
    if (!ethers.isAddress(recipient)) {
      alert("Invalid recipient address!");
      return;
    }
    setLoading(true);
    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(sendAmount, 18));
      await tx.wait();
      alert(`Sent ${sendAmount} tokens to ${recipient}`);
      updateBalance();
    } catch (err: any) {
      alert("Send failed: " + err.message);
    }
    setLoading(false);
  };

  return (

    <div className="flex h-screen bg-gray-200">

        <Sidebar onConnect={connectWallet} onMint={mint} onBurn={burn} />

        <div className="flex-1 flex flex-col">

            <TopBar account={account} />
            
            <Dashboard
              account={account}
              balance={balance}
              recipient={recipient}
              setRecipient={setRecipient}
              sendAmount={sendAmount}
              setSendAmount={setSendAmount}
              loading={loading}
              sendTokens={sendTokens}
              connectWallet={connectWallet}
              redeem={redeem}
            />

        </div>

    </div>

  );
}

export default App;