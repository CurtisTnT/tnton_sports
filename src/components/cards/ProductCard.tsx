import { MdLabel } from "react-icons/md";

import ProductDetailOverlay from "@/components/ProductDetailOverlay";
import { Product } from "@/services/interface";
import { formatVndCurrency } from "@/utils/helpers";
import { useStore } from "@/context/Store";

type Props = {
  product: Product;
  onSelectProduct: () => void;
};

export default function ProductCard(props: Props) {
  const { product, onSelectProduct } = props;
  const { name, image_url, price, init_price, discount_percent } = product;
  const setAppState = useStore()[1];

  return (
    <div className="relative col-span-1 flex flex-col rounded overflow-hidden">
      {!!discount_percent && (
        <div className="absolute top-0 right-0">
          <div className="relative">
            <MdLabel size={45} className="rotate-180 text-red-600" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white font-semibold">
              {discount_percent}%
            </p>
          </div>
        </div>
      )}

      <div className="flex-grow flex items-center">
        <img src={image_url[0]} alt="preview-image" />
      </div>

      <div className="px-2 pb-2">
        <h4>{name}</h4>
        <p className="text-pink font-bold">
          {formatVndCurrency(price)}{" "}
          {!!init_price && (
            <span className="text-sm text-gray-500 line-through font-normal">
              {formatVndCurrency(init_price)}
            </span>
          )}
        </p>
      </div>

      <ProductDetailOverlay
        onSeeDetailProduct={onSelectProduct}
        onAddProductInFavorite={() => {
          setAppState((prev) => ({
            ...prev,
            favoriteItems: [...prev.favoriteItems, product],
          }));
        }}
      />
    </div>
  );
}
