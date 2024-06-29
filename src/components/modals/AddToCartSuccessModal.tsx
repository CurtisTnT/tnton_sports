import { Ref } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import Modal, { ModalRef } from "./Modal";
import { Product } from "@/services/interface";
import { formatVndCurrency } from "@/utils/helpers";
import { useStore } from "@/context/Store";

type Props = {
  addToCartSuccessModalRef: Ref<ModalRef>;
  product: Product;
  selectedAttributes: {
    size: string;
    quantity: number;
  };
  onClose: () => void;
};

export default function AddToCartSuccessModal(props: Props) {
  const { addToCartSuccessModalRef, product, selectedAttributes, onClose } =
    props;
  const { name, image_url, price, init_price, product_type } = product;

  const {
    appState: {
      user: { cart_products },
    },
    setAppState,
  } = useStore();

  return (
    <Modal ref={addToCartSuccessModalRef} size="sm">
      <div className="flex items-center gap-2 p-2 bg-pink text-white">
        <IoMdCheckmarkCircleOutline size={18} />
        <p>Thêm sản phẩm vào giỏ hàng thành công</p>
      </div>

      <div className="flex gap-2 p-2 border-b">
        <div className="w-[100px] h-[100px]">
          <img src={image_url[0]} alt="product-img" width={100} height={100} />
        </div>

        <div>
          <h5 className="font-bold">{name}</h5>
          <p className="font-bold text-pink">
            {formatVndCurrency(price)}{" "}
            {!!init_price && (
              <span className="text-xs font-normal text-gray-400 line-through">
                {formatVndCurrency(init_price)}
              </span>
            )}
          </p>

          {product_type !== "racket" && (
            <div className="flex gap-2 text-sm">
              <p>
                SL:{" "}
                <span className="font-bold">{selectedAttributes.quantity}</span>
              </p>
              {selectedAttributes.size && (
                <p>
                  Size:{" "}
                  <span className="font-bold">{selectedAttributes.size}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-2">
        <p className="text-sm">
          Giỏ hàng của bạn hiện có <span>{cart_products.length}</span> sản phẩm.
        </p>

        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="py-2 px-5 bg-white border border-pink rounded-lg text-sm text-pink font-semibold hover:text-white hover:bg-pink"
            onClick={onClose}
          >
            Tiếp tục mua sắm
          </button>
          <button
            type="button"
            className="py-2 px-5 bg-pink border border-pink rounded-lg text-sm text-white font-semibold hover:text-pink hover:bg-white"
            onClick={() => {
              onClose();
              setAppState((prev) => ({ ...prev, isCartModalOpen: true }));
            }}
          >
            Xem giỏ hàng
          </button>
        </div>
      </div>
    </Modal>
  );
}
