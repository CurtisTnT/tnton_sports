import { useNavigate } from "react-router-dom";

import { useStore } from "@/context/Store";
import SlideModal from "@/components/modals/SlideModal";
import ProductCard from "./ProductCard";
import { formatVndCurrency } from "@/utils/helpers";
import { useState } from "react";
import ComponentSpinner from "@/components/loading/ComponentSpinner";

export default function CartModal() {
  const navigate = useNavigate();

  const {
    appState: {
      isCartModalOpen,
      user: { cart_products },
    },
    setAppState,
  } = useStore();

  const [loading, setLoading] = useState(false);

  const totalPrice = cart_products.reduce(
    (acc, { price }) => (acc += price),
    0
  );
  const totalInitPrice = cart_products.reduce(
    (acc, { init_price }) => (acc += init_price),
    0
  );

  const handleCloseModal = () => {
    setAppState((prev) => ({ ...prev, isCartModalOpen: false }));
  };

  return (
    <SlideModal
      isOpenModal={isCartModalOpen}
      onCloseModal={handleCloseModal}
      size="sm"
      header={
        <h2 className="text-xl text-pink font-bold uppercase">
          Giỏ hàng{" "}
          <span className="text-sm text-black font-normal lowercase">
            ({cart_products.length} sản phẩm)
          </span>
        </h2>
      }
      footer={
        <>
          <div className="flex justify-between">
            <h6 className="font-bold">Tổng tiền:</h6>
            <div className="flex items-center gap-4">
              <p className="text-xl text-pink font-bold">
                {formatVndCurrency(totalPrice)}
              </p>
              <p className="text-sm text-gray-400 line-through">
                {formatVndCurrency(totalInitPrice)}
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <button
              type="button"
              className="py-2 px-5 bg-white border border-pink rounded-lg text-sm text-pink font-semibold hover:text-white hover:bg-pink"
              onClick={() =>
                setAppState((prev) => ({
                  ...prev,
                  isCartModalOpen: false,
                }))
              }
            >
              Tiếp tục mua sắm
            </button>
            <button
              type="button"
              className="py-2 px-5 bg-pink border border-pink rounded-lg text-sm text-white font-semibold hover:text-pink hover:bg-white disabled:opacity-50 disabled:hover:text-white disabled:hover:bg-pink"
              onClick={() => {
                setAppState((prev) => ({ ...prev, isCartModalOpen: false }));
                navigate("/payment");
              }}
              disabled={!cart_products.length}
            >
              Thanh toán
            </button>
          </div>
        </>
      }
    >
      <ComponentSpinner isLoading={loading}>
        <div className="space-y-2 overflow-y-scroll h-[calc(100vh-236px)] scrollbar-hide">
          {cart_products.length ? (
            cart_products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setLoading={setLoading}
              />
            ))
          ) : (
            <p>Không có sản phẩm nào trong giỏ hàng của bạn!</p>
          )}
        </div>
      </ComponentSpinner>
    </SlideModal>
  );
}
