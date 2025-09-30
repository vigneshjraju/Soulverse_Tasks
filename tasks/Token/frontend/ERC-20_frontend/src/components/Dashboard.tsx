
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
};

export default function Dashboard({
  account,balance,
  recipient,setRecipient,
  sendAmount,setSendAmount,
  loading,
  sendTokens,connectWallet,redeem,
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
      <button className="bg-black text-white px-6 py-2 rounded mb-8">Send Tokens</button>

      {/* Cards Row */}

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

      </div>

      {/* My Transactions */}

      <div className="bg-white rounded shadow p-6 mb-8">

            <div className="font-semibold mb-4">My Transactions</div>
            
            <div className="flex flex-col gap-2">

                <div className="flex items-center justify-between">
                    <span>User’s</span>
                    <span className="text-gray-400">Connect</span>
                </div>

                <div className="flex items-center justify-between">
                    <span>Upgrade</span>
                    <span className="text-gray-400">Next</span>
                </div>

                <div className="flex items-center justify-between">
                    <span>Connect</span>
                    <span className="text-gray-400">Pending</span>
                </div>

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

            <div>
            <div className="font-semibold mb-2">Current Month</div>
            {/* You can add stats, actions, or charts here */}
            <div className="text-gray-400">No data yet.</div>
            </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-4 text-center text-gray-500">Processing...</div>
      )}
    </main>
  );
}