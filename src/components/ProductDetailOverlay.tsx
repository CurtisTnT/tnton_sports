import { useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";

import { Product } from "@/services/interface";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/Store";
import { ModalRef } from "./modals/Modal";
import AddToFavoriteSuccessModal from "./modals/AddToFavoriteSuccessModal";

type Props = {
  product: Product;
  onSeeDetailProduct: () => void;
};

export default function ProductDetailOverlay(props: Props) {
  const { product, onSeeDetailProduct } = props;

  const {
    appState: { favoriteItems },
    setAppState,
  } = useStore();

  const navigate = useNavigate();

  const addToFavoriteSuccessModalRef = useRef<ModalRef>(null);

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

  const handleAddProductToFavorite = () => {
    const selectedProductId = product.id + product.product_type!;

    if (favoriteItems.map(({ id }) => id).includes(selectedProductId)) {
      //
    } else {
      setAppState((prev) => ({
        ...prev,
        favoriteItems: [
          ...prev.favoriteItems,
          {
            ...product,
            id: selectedProductId,
          },
        ],
      }));
      addToFavoriteSuccessModalRef.current?.open();
    }
  };

  return (
    <>
      <div className="absolute z-20 flex justify-center items-center inset-0 bg-black/60 opacity-0 hover:opacity-100">
        <div className="flex items-center gap-1">
          <button type="button" onClick={handleGoToDetailProduct}>
            <FiExternalLink size={20} className="text-white hover:text-pink" />
          </button>

          <button type="button" onClick={onSeeDetailProduct}>
            <LuEye size={20} className="text-white hover:text-pink" />
          </button>

          <button type="button" onClick={handleAddProductToFavorite}>
            <FaRegHeart size={18} className="text-white hover:text-pink" />
          </button>
        </div>
      </div>

      <AddToFavoriteSuccessModal
        addToFavoriteSuccessModalRef={addToFavoriteSuccessModalRef}
        product={product}
        onClose={() => addToFavoriteSuccessModalRef.current?.close()}
      />
    </>
  );
}
