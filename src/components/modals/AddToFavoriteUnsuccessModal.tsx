import { Ref } from "react";
import { BiErrorAlt } from "react-icons/bi";

import Modal, { ModalRef } from "./Modal";

type Props = {
  addToFavoriteUnsuccessModalRef: Ref<ModalRef>;
  onClose: () => void;
};

export default function AddToFavoriteUnsuccessModal(props: Props) {
  const { addToFavoriteUnsuccessModalRef, onClose } = props;

  return (
    <Modal ref={addToFavoriteUnsuccessModalRef} size="sm">
      <div className="flex items-center gap-2 p-2 bg-white-dark-yellow text-white">
        <BiErrorAlt size={18} />
        <p>Thêm sản phẩm vào danh mục yêu thích không thành công</p>
      </div>

      <div className="flex flex-col items-center p-5">
        <p className="text-sm text-center mb-5">
          Sản phẩm này đang có trong danh mục yêu thích của bạn.
          <br />
          Vui lòng chọn sản phẩm khác!
        </p>
        <button
          type="button"
          className="py-2 px-5 bg-white border border-white-dark-yellow rounded-lg text-sm text-white-dark-yellow font-semibold hover:text-white hover:bg-white-dark-yellow"
          onClick={onClose}
        >
          Chọn sản phẩm khác
        </button>
      </div>
    </Modal>
  );
}
