import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { TfiClose } from "react-icons/tfi";
import { MdLabel } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { PiShieldCheckFill } from "react-icons/pi";

import { Product } from "@/services/interface";
import { Brand } from "@/constants/brand";
import { formatVndCurrency } from "@/utils/helpers";
import { clothesSizes } from "@/constants/clothesSize";
import { shoesSizes } from "@/constants/shoesSize";
import ContentContainer from "./layouts/ContentContainer";
import { ProductTypeType } from "@/constants/productType";
import { Store } from "@/constants/store";
import StoreList from "./StoreList";
import Modal, { ModalRef } from "./modals/Modal";
import { IoClose } from "react-icons/io5";

type Props = {
  product: Product;
};

const SELF_PREFERENCE_ITEMS: {
  [key in ProductTypeType]: { id: number; title: string | ReactNode }[];
} = {
  racket: [
    {
      id: 1,
      title: (
        <>
          Tặng 2 Quấn cán vợt Cầu Lông:{" "}
          <span className="text-pink">T&T Pro TT103</span>,{" "}
          <span className="text-pink">VS002</span> hoặc{" "}
          <span className="text-pink">Joto 001</span>.
        </>
      ),
    },
    {
      id: 2,
      title: "Sản phẩm cam kết chính hãng.",
    },
    {
      id: 3,
      title: "Một số sản phẩm sẽ được tặng bao đơn hoặc bao nhung bảo vệ vợt.",
    },
    {
      id: 4,
      title: "Thanh toán sau khi kiểm tra và nhận hàng (Giao khung vợt).",
    },
    {
      id: 5,
      title:
        "Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay).",
    },
  ],
  shoes: [
    { id: 1, title: "Tặng 1 đôi vớ cầu lông." },
    { id: 2, title: "Sản phẩm cam kết chính hãng." },
    { id: 3, title: "Thanh toán sau khi kiểm tra và nhận hàng." },
    {
      id: 4,
      title:
        "Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay).",
    },
  ],
  shirt: [
    { id: 1, title: "Thanh toán sau khi kiểm tra và nhận hàng." },
    { id: 2, title: "Hỗ trợ đổi size." },
  ],
  pants: [
    { id: 1, title: "Thanh toán sau khi kiểm tra và nhận hàng." },
    { id: 2, title: "Hỗ trợ đổi size." },
  ],
  dress: [
    { id: 1, title: "Thanh toán sau khi kiểm tra và nhận hàng." },
    { id: 2, title: "Hỗ trợ đổi size." },
  ],
};

const GENERAL_PREFERENCE_ITEMS = [
  { id: 1, title: "Sơn logo mặt vợt miễn phí." },
  { id: 2, title: "Bảo hành lưới đan trong 72 giờ." },
  { id: 3, title: "Thay gen vợt miễn phí trọn đời." },
  { id: 4, title: "Tích luỹ điểm thành viên Premium." },
  { id: 5, title: "Voucher giảm giá cho lần mua hàng tiếp theo." },
];

export default function ProductDetailsPage(props: Props) {
  const { product } = props;
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
  } = product;

  const [previewImg, setPreviewImg] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState<{
    size: string;
    quantity: number;
  }>({ size: "", quantity: 1 });

  const zoomImgModalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (image_url.length) {
      setPreviewImg(image_url[0]);
    }
  }, [image_url]);

  const renderSelfPreference = (item: {
    id: number;
    title: string | ReactNode;
  }) => (
    <div key={item.id} className="flex gap-1">
      <GiCheckMark size={18} />
      <p className="text-sm">{item.title}</p>
    </div>
  );

  const renderGeneralPreference = (item: { id: number; title: string }) => (
    <div key={item.id} className="flex gap-1 pl-2">
      <PiShieldCheckFill size={18} className="text-pink" />
      <p className="text-sm">{item.title}</p>
    </div>
  );

  return (
    <ContentContainer>
      <div className="flex gap-4">
        <div>
          <div className="relative w-[350px] h-[350px] flex items-center rounded-xl shadow-[0px_0px_10px_1px_rgb(0,0,0,0.3)] shrink-0 overflow-hidden">
            <button
              type="button"
              onClick={() => zoomImgModalRef.current?.open()}
            >
              <img
                src={previewImg}
                alt="preview-image"
                width={400}
                height={400}
                className="object-cover"
              />
            </button>

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

        <div className="space-y-5">
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

            <div className="border-t pt-7">
              <div className="relative px-2 py-5 border border-dotted border-pink rounded">
                <div className="absolute -top-4 left-2 inline-flex items-end bg-white border border-pink rounded px-1 py-0.5">
                  <img
                    src={"https://cdn.shopvnb.com/themes/images/code_dis.gif"}
                    alt="preference-icon"
                    width={23}
                    height={23}
                    className="w-[23px] h-[23px]"
                  />
                  <span className="uppercase text-sm text-pink font-bold">
                    ưu đãi
                  </span>
                </div>

                <div className="space-y-1">
                  {product_type &&
                    SELF_PREFERENCE_ITEMS[product_type].map(
                      renderSelfPreference
                    )}
                </div>

                <div className="mt-5 space-y-1">
                  <h5 className="text-sm font-bold">
                    🎁 Ưu đãi thêm khi mua sản phẩm tại{" "}
                    <span className="text-pink">{Store.quan_1.label}</span>
                  </h5>
                  {GENERAL_PREFERENCE_ITEMS.map(renderGeneralPreference)}
                </div>
              </div>
            </div>

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
                          className={clsx("relative border rounded px-2 py-1", {
                            "bg-gray-300": !isActive,
                            "bg-pink text-white border-pink": isSelected,
                          })}
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
                          className={clsx("relative border rounded px-2 py-1", {
                            "bg-gray-300": !isActive,
                            "bg-pink text-white border-pink": isSelected,
                          })}
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

        <StoreList stores={stores} />
      </div>

      <Modal ref={zoomImgModalRef}>
        <div className="relative flex justify-center">
          <button
            type="button"
            onClick={() => zoomImgModalRef.current?.close()}
            className="absolute top-3 right-3 hover:opacity-80"
          >
            <IoClose size={20} />
          </button>
          <img src={previewImg} alt="preview-image" />
        </div>
      </Modal>
    </ContentContainer>
  );
}