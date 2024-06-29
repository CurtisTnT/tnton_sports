import { Ref, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { TfiClose } from "react-icons/tfi";
import { MdLabel } from "react-icons/md";

import Modal, { ModalRef } from "./Modal";
import { Product } from "@/services/interface";
import { Brand } from "@/constants/brand";
import { formatVndCurrency } from "@/utils/helpers";
import { clothesSizes } from "@/constants/clothesSize";
import { shoesSizes } from "@/constants/shoesSize";
import { useStore } from "@/context/Store";
import BuyNowButton from "@/components/buttons/BuyNowButton";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import AddToFavoriteButton from "@/components/buttons/AddToFavoriteButton";
import AddToCartSuccessModal from "./AddToCartSuccessModal";
import AddToFavoriteSuccessModal from "./AddToFavoriteSuccessModal";
import AddToCartUnsuccessModal from "./AddToCartUnsuccessModal";

type Props = {
  detailProductModalRef: Ref<ModalRef>;
  selectedProduct: Product;
  onClose: () => void;
};

export default function DetailProductModal(props: Props) {
  const { detailProductModalRef, selectedProduct, onClose } = props;
  const {
    name,
    image_url,
    brand,
    stores,
    price,
    init_price,
    product_type,
    clothes_sizes,
    shoes_size,
    discount_percent,
  } = selectedProduct;

  const {
    appState: {
      user: { cart_products },
    },
    setAppState,
  } = useStore();

  const [previewImg, setPreviewImg] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState<{
    size: string;
    quantity: number;
  }>({ size: "", quantity: 1 });
  const [error, setError] = useState("");

  const addToCartSuccessModalRef = useRef<ModalRef>(null);
  const addToFavoriteSuccessModalRef = useRef<ModalRef>(null);
  const addToCartUnsuccessModalRef = useRef<ModalRef>(null);

  const resetState = () => {
    setSelectedAttributes({ size: "", quantity: 1 });
    setError("");
  };

  const handleAddToCart = () => {
    if (!selectedAttributes.size && product_type !== "racket") {
      setError("Vui lòng chọn size");
    } else {
      const selectedProductId =
        selectedProduct.id +
        selectedProduct.product_type! +
        selectedAttributes.size;

      if (cart_products.map(({ id }) => id).includes(selectedProductId)) {
        addToCartUnsuccessModalRef.current?.open();
      } else {
        setAppState((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            cart_products: [
              ...prev.user.cart_products,
              {
                ...selectedProduct,
                id: selectedProductId,
                selectedQuantity: selectedAttributes.quantity,
                selectedSize: selectedAttributes.size,
              },
            ],
          },
        }));
        addToCartSuccessModalRef.current?.open();
      }
    }
  };

  const handleAddProductToFavorite = () => {
    setAppState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        favorite_products: [
          ...prev.user.favorite_products,
          {
            ...selectedProduct,
            selectedQuantity: selectedAttributes.quantity,
            selectedSize: selectedAttributes.size,
          },
        ],
      },
    }));
    addToFavoriteSuccessModalRef.current?.open();
  };

  useEffect(() => {
    if (image_url.length) {
      setPreviewImg(image_url[0]);
    }
  }, [image_url]);

  const renderSelectedSize = (opts: {
    initItems: { type: string; label: string }[];
    curItems: string[];
  }) => (
    <div className="flex gap-2">
      {opts.initItems.map(({ type, label }) => {
        const isActive = opts.curItems.includes(type);
        const isSelected = selectedAttributes.size === type;
        return (
          <button
            key={type}
            type="button"
            className={clsx("relative border rounded px-2 py-1", {
              "bg-gray-300": !isActive,
              "bg-pink text-white border-pink": isSelected,
            })}
            disabled={!isActive}
            onClick={() => {
              setError("");
              setSelectedAttributes((prev) => ({
                ...prev,
                size: type,
              }));
            }}
          >
            {label}
            {!isActive && (
              <TfiClose
                size={33}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <Modal ref={detailProductModalRef} size="lg" onClose={resetState}>
        <div className="relative p-7 px-5">
          <div className="flex gap-4">
            <div className="relative w-[350px] h-[350px] flex items-center rounded-xl shadow-[0px_0px_10px_1px_rgb(0,0,0,0.3)] shrink-0 overflow-hidden">
              <img
                src={previewImg}
                alt="preview-image"
                width={400}
                height={400}
                className="object-cover"
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
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{name}</h3>

                <div className="flex gap-5 text-sm">
                  <p>
                    Thương hiệu:{" "}
                    <span className="font-semibold text-pink">
                      {brand && Brand[brand].label}
                    </span>{" "}
                  </p>
                  <p>
                    Tình trạng:{" "}
                    <span className="font-semibold text-pink">
                      {stores.length ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </p>
                </div>

                <p className="text-2xl font-bold text-pink">
                  {formatVndCurrency(price)}{" "}
                  {!!init_price && (
                    <span className="text-sm font-normal text-gray-400">
                      Giá niêm yết:{" "}
                      <span className="line-through">
                        {formatVndCurrency(init_price)}
                      </span>
                    </span>
                  )}
                </p>

                {product_type !== "racket" && (
                  <div className="space-y-1 !mb-4">
                    <h3>Chọn size:</h3>
                    {clothes_sizes &&
                      renderSelectedSize({
                        initItems: clothesSizes,
                        curItems: clothes_sizes,
                      })}

                    {shoes_size &&
                      renderSelectedSize({
                        initItems: shoesSizes,
                        curItems: shoes_size,
                      })}

                    <p
                      className={clsx("text-red-500 text-xs h-4", {
                        invisible: !error,
                      })}
                    >
                      {error}
                    </p>
                  </div>
                )}

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
              </div>

              <div className="flex gap-2">
                <BuyNowButton onClick={() => {}} />
                <AddToCartButton onClick={handleAddToCart} />
                <AddToFavoriteButton onClick={handleAddProductToFavorite} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {image_url.map((src) => {
              const isSelected = src === previewImg;
              return (
                <button
                  key={src}
                  type="button"
                  className={clsx(
                    "w-[65px] h-[85px] flex items-center border rounded",
                    {
                      "border-pink": isSelected,
                    }
                  )}
                  onClick={() => setPreviewImg(src)}
                >
                  <img src={src} alt="preview-image" width={65} />
                </button>
              );
            })}
          </div>
        </div>
      </Modal>

      <AddToCartSuccessModal
        addToCartSuccessModalRef={addToCartSuccessModalRef}
        product={selectedProduct}
        selectedAttributes={selectedAttributes}
        onClose={() => {
          resetState();
          addToCartSuccessModalRef.current?.close();
          onClose();
        }}
      />

      <AddToFavoriteSuccessModal
        addToFavoriteSuccessModalRef={addToFavoriteSuccessModalRef}
        product={selectedProduct}
        onClose={() => addToFavoriteSuccessModalRef.current?.close()}
      />

      <AddToCartUnsuccessModal
        addToCartUnsuccessModalRef={addToCartUnsuccessModalRef}
        onClose={() => addToCartUnsuccessModalRef.current?.close()}
      />
    </>
  );
}
