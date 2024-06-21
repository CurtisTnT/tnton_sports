import { Ref, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";

import Modal, { ModalRef } from "./Modal";
import { Product } from "@/services/interface";
import { Brand } from "@/constants/brand";
import { formatVndCurrency } from "@/utils/helpers";
import { clothesSizes } from "@/constants/clothesSize";
import clsx from "clsx";
import { shoesSizes } from "@/constants/shoesSize";

type Props = {
  detailProductModalRef: Ref<ModalRef>;
  selectedProduct: Product;
  closeModal: () => void;
};

export default function DetailProductModal(props: Props) {
  const { detailProductModalRef, selectedProduct, closeModal } = props;
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
  } = selectedProduct;

  const [previewImg, setPreviewImg] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState<{
    size: string;
    quantity: number;
  }>({ size: "", quantity: 1 });

  useEffect(() => {
    if (image_url.length) {
      setPreviewImg(image_url[0]);
    }
  }, [image_url]);

  return (
    <Modal ref={detailProductModalRef} size="lg">
      <div className="relative p-7 px-5">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 hover:opacity-80"
        >
          <IoClose size={20} />
        </button>

        <div className="flex gap-4">
          {/* <div className="space-y-5"> */}
          <div className="w-[350px] h-[350px] flex items-center rounded-xl shadow-[0px_0px_10px_1px_rgb(0,0,0,0.3)] shrink-0 overflow-hidden">
            <img
              src={previewImg}
              alt="preview-image"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
          {/* </div> */}

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
                  <span className="text-base text-gray-500">
                    Giá niêm yết:{" "}
                    <span className="line-through">{init_price}</span>
                  </span>
                )}
              </p>

              {product_type !== "racket" && (
                <div className="space-y-1 !mb-4">
                  <h3>Chọn size:</h3>
                  {clothes_sizes && (
                    <div className="flex gap-2">
                      {clothesSizes.map(({ type, label }) => {
                        const isActive = clothes_sizes.includes(type);
                        const isSelected = selectedAttributes.size === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            className={clsx(
                              "relative border rounded px-2 py-1",
                              {
                                "bg-gray-300": !isActive,
                                "bg-pink text-white border-pink": isSelected,
                              }
                            )}
                            disabled={!isActive}
                            onClick={() =>
                              setSelectedAttributes((prev) => ({
                                ...prev,
                                size: type,
                              }))
                            }
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
                  )}

                  {shoes_size && (
                    <div className="flex gap-2">
                      {shoesSizes.map(({ type, label }) => {
                        const isActive = shoes_size.includes(type);
                        const isSelected = selectedAttributes.size === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            className={clsx(
                              "relative border rounded px-2 py-1",
                              {
                                "bg-gray-300": !isActive,
                                "bg-pink text-white border-pink": isSelected,
                              }
                            )}
                            disabled={!isActive}
                            onClick={() =>
                              setSelectedAttributes((prev) => ({
                                ...prev,
                                size: type,
                              }))
                            }
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
                  )}
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
              <button
                type="button"
                className="py-2 px-5 bg-pink border border-pink rounded-lg text-sm text-white font-semibold hover:text-pink hover:bg-white"
              >
                Mua ngay
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-[#ffb916] border border-[#ffb916] rounded-lg text-sm text-white font-semibold hover:text-[#ffb916] hover:bg-white"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-[#E95221] border border-[#E95221] rounded-lg text-sm text-white font-semibold hover:text-[#E95221] hover:bg-white"
              >
                Thêm vào yêu thích
              </button>
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
  );
}
