import { ethers } from "ethers";

type DashboardProps = {
  account: string;
  balance: string;
  recipient: string;
  setRecipient: (value: string) => void;
  sendAmount: string;
  setSendAmount: (value: string) => void;
  loading: boolean;
  sendTokens: () => void;
  connectWallet: () => void;
  redeem: () => void;
  transactions: any[];
};

export default function Dashboard({
  account,
  balance,
  recipient,
  setRecipient,
  sendAmount,
  setSendAmount,
  loading,
  sendTokens,
  connectWallet,
  redeem,
  transactions,
}: DashboardProps) {
  return (
    <main className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Account and Balance */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-8">
        <div className="text-gray-700">
          <strong>Account:</strong> {account || "Not connected"}
        </div>
        <div className="text-gray-700">
          <strong>Balance:</strong> {balance}
        </div>
      </div>

      {/* Greeting and Send Button */}
      <h2 className="text-2xl font-bold mb-2">Good morning, User</h2>
      <p className="mb-6 text-gray-500">Manage your tokens securely.</p>
      {/* <button className="bg-black text-white px-6 py-2 rounded mb-8">Send Tokens</button> */}

      {/* Cards Row
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded shadow p-4">
          <div className="font-semibold mb-2">Pending Transactions</div>
          <div className="text-gray-500">Processing...</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="font-semibold mb-2">Success Messages</div>
          <div className="text-gray-500">Error Alerts</div>
        </div>
        <div className="bg-gray-200 rounded shadow p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">?</div>
          <div className="text-gray-500">Transaction Status</div>
        </div>
      </div> */}

      {/* My Transactions */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <div className="font-semibold mb-4">My Transactions</div>
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {transactions.length === 0 && <div>No transactions found.</div>}
          {transactions.map((tx, idx) => (
            <div key={tx.transactionHash + idx} className="flex items-center justify-between">
              <span>
                <span className="font-mono text-xs">
                  {tx.args.from.slice(0, 6)}... → {tx.args.to.slice(0, 6)}...
                </span>
                <span className="ml-2">{ethers.formatUnits(tx.args.value, 18)} MTK</span>
              </span>
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View
              </a>
            </div>
          ))}
        </div>
        <button
          onClick={connectWallet}
          className="bg-black text-white px-4 py-2 rounded mt-4"
        >
          Connect Wallet
        </button>
      </div>

      {/* Send Tokens and Current Month */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Send Tokens */}
        <div>
          <div className="font-semibold mb-2">Send Tokens</div>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={sendAmount}
            onChange={e => setSendAmount(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={sendTokens}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Send Tokens
          </button>
          <button
            onClick={redeem}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-2"
          >
            Redeem 50
          </button>
        </div>

        {/* Current Month (placeholder) */}
        {/* <div>
          <div className="font-semibold mb-2">Current Month</div>
          <div className="text-gray-400">No data yet.</div>
        </div> */}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-4 text-center text-gray-500">Processing...</div>
      )}
    </main>
  );
}