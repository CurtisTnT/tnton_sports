import { useState } from "react";

import { useStore } from "@/context/Store";
import SlideModal from "@/components/modals/SlideModal";
import ProductCard from "./ProductCard";
import ComponentSpinner from "@/components/loading/ComponentSpinner";

export default function FavoriteProductsModal() {
  const {
    appState: {
      isFavoriteModalOpen,
      user: { favorite_products },
    },
    setAppState,
  } = useStore();

  const [loading, setLoading] = useState(false);

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
            ({favorite_products.length} sản phẩm)
          </span>
        </h2>
      }
    >
      <ComponentSpinner isLoading={loading}>
        <div className="space-y-2 overflow-y-scroll h-[calc(100vh-108px)] scrollbar-hide">
          {favorite_products.length ? (
            favorite_products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setLoading={setLoading}
              />
            ))
          ) : (
            <p>Không có sản phẩm này trong danh mục yêu thích của bạn!</p>
          )}
        </div>
      </ComponentSpinner>
    </SlideModal>
  );
}
