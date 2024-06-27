import { Ref } from "react";
import { BiErrorAlt } from "react-icons/bi";

import Modal, { ModalRef } from "./Modal";

type Props = {
  addToCartUnsuccessModalRef: Ref<ModalRef>;
  onClose: () => void;
};

export default function AddToCartUnsuccessModal(props: Props) {
  const { addToCartUnsuccessModalRef, onClose } = props;

  return (
    <Modal ref={addToCartUnsuccessModalRef} size="sm">
      <div className="flex items-center gap-2 p-2 bg-white-dark-yellow text-white">
        <BiErrorAlt size={18} />
        <p>Thêm sản phẩm vào giỏ hàng không thành công</p>
      </div>

      <div className="flex flex-col items-center p-5">
        <p className="text-sm text-center mb-5">
          Sản phẩm này đang có trong giỏ hàng của bạn.
          <br />
          Vui lòng chọn size hoặc sản phẩm khác!
        </p>
        <button
          type="button"
          className="py-2 px-5 bg-white border border-white-dark-yellow rounded-lg text-sm text-white-dark-yellow font-semibold hover:text-white hover:bg-white-dark-yellow"
          onClick={onClose}
        >
          Chọn size/sản phẩm khác
        </button>
      </div>
    </Modal>
  );
}
