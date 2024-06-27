// import { IoClose } from "react-icons/io5";

import { useStore } from "@/context/Store";
import SlideModal from "@/components/modals/SlideModal";
import ProductCard from "./ProductCard";

export default function FavoriteProductsModal() {
  const {
    appState: { isFavoriteModalOpen, favoriteItems },
    setAppState,
  } = useStore();

  const handleCloseModal = () => {
    setAppState((prev) => ({ ...prev, isFavoriteModalOpen: false }));
  };

  return (
    <SlideModal
      isOpenModal={isFavoriteModalOpen}
      onCloseModal={handleCloseModal}
      size="sm"
      header={
        <h2 className="text-xl text-pink font-bold uppercase">
          Danh mục sản phẩm yêu thích{" "}
          <span className="text-sm text-black font-normal lowercase">
            ({favoriteItems.length} sản phẩm)
          </span>
        </h2>
      }
    >
      <div className="space-y-2 overflow-y-scroll h-[calc(100vh-108px)] scrollbar-hide">
        {favoriteItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SlideModal>
  );
}
