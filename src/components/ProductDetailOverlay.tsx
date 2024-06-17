import { FiExternalLink } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

export default function ProductDetailOverlay() {
  return (
    <div className="absolute flex justify-center items-center inset-0 bg-black/60 opacity-0 hover:opacity-100">
      <div className="flex items-center gap-1">
        <button type="button">
          <FiExternalLink size={20} className="text-white hover:text-pink" />
        </button>

        <button type="button">
          <LuEye size={20} className="text-white hover:text-pink" />
        </button>

        <button type="button">
          <FaRegHeart size={18} className="text-white hover:text-pink" />
        </button>

        <button type="button">
          <BsCartPlus size={20} className="text-white hover:text-pink" />
        </button>
      </div>
    </div>
  );
}
