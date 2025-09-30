import { FaBell, FaSearch } from "react-icons/fa";

type TopBarProps = {
  account: string;
};

export default function TopBar({ account }: TopBarProps) {

  return (

    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">

        <div className="flex items-center w-1/2">

                <input
                type="text"
                placeholder="Recipient Address"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                />
                <FaSearch className="ml-2 text-gray-400" />
                
        </div>

        <div className="flex items-center gap-6">

                <FaBell className="text-xl text-gray-400" />
                <span className="text-gray-700 font-medium">{account ? "Connected" : "Not Connected"}</span>
                <div className="w-8 h-8 rounded-full bg-gray-300" />

        </div>

    </header>

  );
}