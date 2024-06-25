import { FiExternalLink } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

import { Product } from "@/services/interface";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
  onSeeDetailProduct: () => void;
};

export default function ProductDetailOverlay(props: Props) {
  const { product, onSeeDetailProduct } = props;

  const navigate = useNavigate();

  const handleGoToDetailProduct = () => {
    let path = "";
    switch (product.product_type) {
      case "racket":
        path = "rackets";
        break;
      case "shoes":
        path = "shoes";
        break;
      case "shirt":
        path = "shirts";
        break;
      case "pants":
        path = "pants";
        break;
      default:
        path = "dresses";
        break;
    }
    navigate(`/products/${path}/${product.id}`);
  };

  const handleAddProductInFavorite = () => {
    //
  };

  return (
    <div className="absolute z-20 flex justify-center items-center inset-0 bg-black/60 opacity-0 hover:opacity-100">
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => handleGoToDetailProduct()}>
          <FiExternalLink size={20} className="text-white hover:text-pink" />
        </button>

        <button type="button" onClick={onSeeDetailProduct}>
          <LuEye size={20} className="text-white hover:text-pink" />
        </button>

        <button type="button" onClick={() => handleAddProductInFavorite()}>
          <FaRegHeart size={18} className="text-white hover:text-pink" />
        </button>

        <button type="button">
          <BsCartPlus size={20} className="text-white hover:text-pink" />
        </button>
      </div>
    </div>
  );
}
