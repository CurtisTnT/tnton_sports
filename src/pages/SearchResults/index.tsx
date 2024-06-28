import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "@/components/cards/ProductCard";
import ContentContainer from "@/components/layouts/ContentContainer";
import { useStore } from "@/context/Store";
import { Product } from "@/services/interface";
import { initialProduct } from "@/services/initialState";
import DetailProductModal from "@/components/modals/DetailProductModal";
import { ModalRef } from "@/components/modals/Modal";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const {
    appState: { racketsAndShoes, clothes },
  } = useStore();

  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(initialProduct);

  const detailProductModalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (searchQuery) {
      const products: Product[] = [...racketsAndShoes, ...clothes];
      const newProducts = products.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );

      setSearchResults(searchQuery ? newProducts : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, racketsAndShoes.length, clothes.length]);

  return (
    <ContentContainer>
      <h1 className="my-5">
        Tìm kiếm sản phẩm <span className="font-bold">"{searchQuery}"</span>
      </h1>

      {searchResults.length ? (
        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {searchResults.map((product) => (
            <ProductCard
              key={product.id + product.product_type!}
              product={product}
              onSelectProduct={() => {
                setSelectedProduct(product);
                detailProductModalRef.current?.open();
              }}
            />
          ))}
        </div>
      ) : (
        <p>Không có sản phẩm phù hợp!</p>
      )}

      <DetailProductModal
        detailProductModalRef={detailProductModalRef}
        selectedProduct={selectedProduct}
        onClose={() => detailProductModalRef.current?.close()}
      />
    </ContentContainer>
  );
}
