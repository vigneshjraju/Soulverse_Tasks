import { FaWallet, FaCoins } from "react-icons/fa";
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from "react-icons/md";

type SidebarProps = {
  onConnect: () => void;
  onMint: () => void;
  onBurn: () => void;
};


export default function Sidebar({ onConnect, onMint, onBurn }: SidebarProps) {

  return (

    <aside className="bg-white h-full w-56 flex flex-col py-8 px-4 border-r border-gray-200">

        <div className="flex items-center mb-10">

            <FaWallet className="text-3xl mr-2" />
            <span className="font-bold text-lg">Upgradeable ERC20</span>

        </div>

        <nav className="flex flex-col gap-4">

            <button onClick={onConnect} className="flex items-center gap-2 text-gray-800 hover:text-black">
            <FaWallet /> Connect Wallet
            </button>

            <div className="flex items-center gap-2 text-gray-800">
                <FaCoins /> Wallet Address
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                <FaCoins /> Token Balance
            </div>

            <button onClick={onMint} className="flex items-center gap-2 text-gray-800 hover:text-black">
                <MdOutlineAddCircle /> Mint 1000
                </button>
                <button onClick={onBurn} className="flex items-center gap-2 text-gray-800 hover:text-black mt-auto">
                <MdOutlineRemoveCircle /> Burn 100
            </button>

        </nav>

    </aside>
  );
}