import { useRef, useState } from "react";
import clsx from "clsx";
import { MdLabel } from "react-icons/md";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import { clothesSizes } from "@/constants/clothesSize";
import { shoesSizes } from "@/constants/shoesSize";
import { Product } from "@/services/interface";
import { formatVndCurrency } from "@/utils/helpers";
import { useStore } from "@/context/Store";
import { ModalRef } from "../Modal";
import AddToCartSuccessModal from "@/components/modals/AddToCartSuccessModal";

type Props = {
  product: Product;
};

export default function ProductCard(props: Props) {
  const { product } = props;
  const {
    id,
    image_url,
    discount_percent,
    product_type,
    name,
    init_price,
    price,
    shoes_size,
    clothes_sizes,
    selectedQuantity,
    selectedSize,
  } = product;

  const { setAppState } = useStore();

  const [selectedAttributes, setSelectedAttributes] = useState<{
    size: string;
    quantity: number;
  }>({ size: selectedSize || "", quantity: selectedQuantity || 1 });
  const [error, setError] = useState("");

  const addToCartSuccessModalRef = useRef<ModalRef>(null);

  const handleAddToCart = () => {
    if (!selectedAttributes.size && product_type !== "racket") {
      setError("Vui lòng chọn size");
    } else {
      setAppState((prev) => ({
        ...prev,
        cartItems: [
          ...prev.cartItems,
          {
            ...product,
            selectedQuantity: selectedAttributes.quantity,
            selectedSize: selectedAttributes.size,
          },
        ],
      }));
      addToCartSuccessModalRef.current?.open();
    }
  };

  const renderSelectSize = (opts: {
    initItems: { type: string; label: string }[];
    curItems: string[];
    id: string;
  }) => (
    <>
      <label htmlFor={opts.id} className="font-medium">
        Size:
      </label>
      <select
        id={opts.id}
        value={selectedAttributes.size}
        onChange={(e) => {
          setError("");
          setSelectedAttributes((prev) => ({
            ...prev,
            size: e.target.value,
          }));
        }}
      >
        <option value="" disabled></option>
        {opts.initItems.map(({ type, label }) => {
          const isDisabled = !opts.curItems.includes(type);
          return (
            <option
              key={type}
              value={type}
              disabled={isDisabled}
              className="text-center"
            >
              {label}
            </option>
          );
        })}
      </select>
    </>
  );

  return (
    <>
      <div key={id} className="flex p-2 gap-2 border border-pink rounded">
        <button
          type="button"
          className="relative h-[200px] w-[200px] rounded shadow-[0px_0px_10px_1px_rgb(0,0,0,0.1)] shrink-0 overflow-hidden"
        >
          <img
            src={image_url[0]}
            alt="product-image"
            width={200}
            height={200}
          />

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
        </button>

        <div className="flex flex-col flex-grow justify-between">
          <div>
            <button type="button" className="text-start font-bold">
              {name}
            </button>

            <p className="font-bold text-pink">
              {formatVndCurrency(price)}{" "}
              {!!init_price && (
                <span className="text-sm font-normal text-gray-400 line-through">
                  {formatVndCurrency(init_price)}
                </span>
              )}
            </p>

            <div className="flex items-start justify-between mt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-6 h-6 flex justify-center items-center bg-pink rounded-[12px] text-white disabled:opacity-80"
                  onClick={() =>
                    setSelectedAttributes((prev) => ({
                      ...prev,
                      quantity: prev.quantity - 1,
                    }))
                  }
                  disabled={selectedAttributes.quantity <= 1}
                >
                  <span className="-translate-y-px">-</span>
                </button>
                <input
                  type="number"
                  min={1}
                  className="hide-up-down-input text-center border border-pink rounded w-20"
                  value={selectedAttributes.quantity}
                  onChange={(e) =>
                    setSelectedAttributes((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value),
                    }))
                  }
                />
                <button
                  type="button"
                  className="w-6 h-6 flex justify-center items-center bg-pink rounded-[12px] text-white"
                  onClick={() =>
                    setSelectedAttributes((prev) => ({
                      ...prev,
                      quantity: prev.quantity + 1,
                    }))
                  }
                >
                  <span className="-translate-y-px">+</span>
                </button>
              </div>

              {product_type !== "racket" && (
                <div>
                  <div className="flex items-center">
                    {shoes_size &&
                      renderSelectSize({
                        initItems: shoesSizes,
                        curItems: shoes_size,
                        id: "shoes-sizes" + id,
                      })}

                    {clothes_sizes &&
                      renderSelectSize({
                        initItems: clothesSizes,
                        curItems: clothes_sizes,
                        id: "clothes" + id,
                      })}
                  </div>
                  <p
                    className={clsx("w-[110px] text-red-500 text-xs", {
                      invisible: !error,
                    })}
                  >
                    {error}
                  </p>
                </div>
              )}
            </div>
          </div>

          <AddToCartButton className="self-start" onClick={handleAddToCart} />
        </div>
      </div>

      <AddToCartSuccessModal
        addToCartSuccessModalRef={addToCartSuccessModalRef}
        product={product}
        selectedAttributes={selectedAttributes}
        onClose={() =>
          setAppState((prev) => ({ ...prev, isFavoriteModalOpen: false }))
        }
      />
    </>
  );
}
