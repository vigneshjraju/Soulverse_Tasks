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
  const [transactions, setTransactions] = useState<any[]>([]);

  // Fetch transactions involving the user
  const fetchTransactions = async (userAddress: string, tokenContract: ethers.Contract) => {
    try {
      const filterFrom = tokenContract.filters.Transfer(userAddress, null);
      const filterTo = tokenContract.filters.Transfer(null, userAddress);

      const sentEvents = await tokenContract.queryFilter(filterFrom, -10000);
      const receivedEvents = await tokenContract.queryFilter(filterTo, -10000);

      // Combine and sort by block number (descending)
      const allEvents = [...sentEvents, ...receivedEvents].sort(
        (a, b) => b.blockNumber - a.blockNumber
      );

      setTransactions(allEvents);
    } catch (err) {
      setTransactions([]);
    }
  };

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
      setBalance(ethers.formatUnits(bal, 18));
      await fetchTransactions(userAddress, token);
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Update balance and transactions
  const updateBalanceAndTx = async () => {
    if (contract && account) {
      const bal = await contract.balanceOf(account);
      setBalance(ethers.formatUnits(bal, 18));
      await fetchTransactions(account, contract);
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
      await updateBalanceAndTx();
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
      await updateBalanceAndTx();
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
      await updateBalanceAndTx();
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
      await updateBalanceAndTx();
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
          transactions={transactions}
        />
      </div>
    </div>
  );
}

export default App;