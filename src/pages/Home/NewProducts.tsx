import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import ContentContainer from "@/components/layouts/ContentContainer";
import HomeTitle from "@/components/titles/HomeTitle";
import { ProductTypeType, productTypes } from "@/constants/productType";
import { getClothes, getRacketsAndShoes } from "@/services/productsAction";
import { Product, Products } from "@/services/interface";
import { initialProduct, initialProducts } from "@/services/initialState";
import HomeProductsCarousel from "@/components/carousels/HomeProductsCarousel";
import ComponentSpinner from "@/components/loading/ComponentSpinner";
import DetailProductModal from "@/components/modals/DetailProductModal";
import { ModalRef } from "@/components/modals/Modal";

const NEW_PRODUCT_ITEMS: { type: ProductTypeType | "all"; label: string }[] = [
  {
    type: "all",
    label: "Tất cả",
  },
  ...productTypes,
];

export default function NewProducts() {
  const [selectedType, setSelectedType] = useState<ProductTypeType | "all">(
    "all"
  );
  const [newProducts, setNewProducts] = useState<Products>(initialProducts);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(initialProduct);

  const detailProductModalRef = useRef<ModalRef>(null);

  useEffect(() => {
    setLoading(true);

    (async () => {
      switch (selectedType) {
        case "racket":
          {
            const res = await getRacketsAndShoes({
              isNew: true,
              product_type: "racket",
            });
            res && setNewProducts({ clothes: [], racketsShoes: res });
            setLoading(false);
          }
          break;
        case "shoes":
          {
            const res = await getRacketsAndShoes({
              isNew: true,
              product_type: "shoes",
            });
            res && setNewProducts({ clothes: [], racketsShoes: res });
            setLoading(false);
          }
          break;
        case "shirt":
          {
            const res = await getClothes({
              isNew: true,
              product_type: "shirt",
            });
            res && setNewProducts({ clothes: res, racketsShoes: [] });
            setLoading(false);
          }
          break;
        case "pants":
          {
            const res = await getClothes({
              isNew: true,
              product_type: "pants",
            });
            res && setNewProducts({ clothes: res, racketsShoes: [] });
            setLoading(false);
          }
          break;
        case "dress":
          {
            const res = await getClothes({
              isNew: true,
              product_type: "dress",
            });
            res && setNewProducts({ clothes: res, racketsShoes: [] });
            setLoading(false);
          }
          break;
        default:
          {
            const [racketsShoes, clothes] = await Promise.all([
              getRacketsAndShoes({ isNew: true }),
              getClothes({ isNew: true }),
            ]);
            racketsShoes &&
              clothes &&
              setNewProducts({ racketsShoes, clothes });
            setLoading(false);
          }
          break;
      }
    })();
  }, [selectedType]);

  return (
    <>
      <ContentContainer>
        <HomeTitle title="NEW ARRIVALS" />

        <div className="border rounded">
          <div className="flex divide-x overflow-x-scroll scrollbar-hide">
            {NEW_PRODUCT_ITEMS.map(({ type, label }) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  className={clsx(
                    "shrink-0 w-[200px] py-1 m-2 rounded text-xl font-semibold",
                    {
                      "bg-pink text-white": isSelected,
                      "text-white-dark-yellow": !isSelected,
                    }
                  )}
                  onClick={() => setSelectedType(type)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <ComponentSpinner isLoading={loading}>
            <HomeProductsCarousel
              products={[...newProducts.racketsShoes, ...newProducts.clothes]}
              onSelectProduct={(product) => {
                setSelectedProduct(product);
                detailProductModalRef.current?.open();
              }}
            />
          </ComponentSpinner>
        </div>
      </ContentContainer>

      <DetailProductModal
        detailProductModalRef={detailProductModalRef}
        selectedProduct={selectedProduct}
        closeModal={() => detailProductModalRef.current?.close()}
      />
    </>
  );
}
