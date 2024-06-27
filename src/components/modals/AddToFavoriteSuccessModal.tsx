import { Ref } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { Product } from "@/services/interface";
import Modal, { ModalRef } from "./Modal";
import { formatVndCurrency } from "@/utils/helpers";
import { useStore } from "@/context/Store";

type Props = {
  addToFavoriteSuccessModalRef: Ref<ModalRef>;
  product: Product;
  onClose: () => void;
};

export default function AddToFavoriteSuccessModal(props: Props) {
  const { addToFavoriteSuccessModalRef, product, onClose } = props;
  const { image_url, name, price, init_price } = product;

  const {
    appState: { favoriteItems },
    setAppState,
  } = useStore();

  return (
    <Modal ref={addToFavoriteSuccessModalRef} size="sm">
      <div className="flex items-center gap-2 p-2 bg-pink text-white">
        <IoMdCheckmarkCircleOutline size={18} />
        <p>Thêm sản phẩm vào danh mục yêu thích thành công</p>
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
        </div>
      </div>

      <div className="p-2">
        <p className="text-sm">
          Danh mục yêu thích của bạn hiện có <span>{favoriteItems.length}</span>{" "}
          sản phẩm.
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
              setAppState((prev) => ({ ...prev, isFavoriteModalOpen: true }));
            }}
          >
            Xem danh mục yêu thích
          </button>
        </div>
      </div>
    </Modal>
  );
}
