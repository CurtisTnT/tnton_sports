import { useEffect, useState } from "react";
import clsx from "clsx";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import ContentContainer from "@/components/layouts/ContentContainer";
import { useStore } from "@/context/Store";
import ProductCard from "./ProductCard";
import { formatVndCurrency } from "@/utils/helpers";
import ComponentSpinner from "@/components/loading/ComponentSpinner";
import Toast from "@/components/Toast";
import { updateUser } from "@/services/userAction";
import { Product } from "@/services/interface";

const PAYMENT_METHOD_ITEMS = [
  { id: 1, label: "Chuyển khoản qua ngân hàng", value: "banking" },
  { id: 2, label: "Thanh toán khi nhận hàng (COD)", value: "cod" },
];

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  note: string;
  paymentMethod: string;
};

export default function Payment() {
  const {
    appState: { user },
    setAppState,
  } = useStore();
  const { cart_products } = user;

  const navigate = useNavigate();

  const initialFormValues: FormValues = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    note: "",
    paymentMethod: "",
  };
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<{ email: string; phoneNumber: string }>({
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState<{ product: boolean; info: boolean }>({
    product: false,
    info: false,
  });

  const totalPrice = cart_products.reduce(
    (acc, { price }) => (acc += price),
    0
  );
  const deliveryCost = 35000;

  const handleChangeFormValues = (values: Partial<FormValues>) => {
    setFormValues((prev) => ({ ...prev, ...values }));
  };

  const handleRemoveProductFromCart = async (product: Product) => {
    const isDelete = confirm(
      `Bạn có muốn xoá ${product.name} ra khỏi giỏ hàng của bạn!`
    );

    if (!isDelete) return;

    setLoading({ ...loading, product: true });

    (async () => {
      const res = await updateUser({
        ...user,
        cart_products: user.cart_products.filter(
          (prod) => prod.id !== product.id
        ),
      });

      if (res) {
        setAppState((prev) => ({ ...prev, user: res }));
        setLoading({ ...loading, product: false });
      }
    })();
  };

  const handleOrder = () => {
    setLoading({ ...loading, info: true });

    (async () => {
      const res = await updateUser({ ...user, cart_products: [] });
      if (res) {
        setAppState((prev) => ({ ...prev, user: res }));
        navigate("/");
        Toast({
          type: "success",
          message:
            "Đặt hàng thành công. Nhân viên TnTon sẽ liên hệ với bạn trong giây lát để xác nhận đơn hàng. TnTon xin chân thành cảm ơn!",
        });
        setLoading({ ...loading, info: false });
      }
    })();
  };

  useEffect(() => {
    if (user.id) {
      const { name, email, phone_number } = user;
      setFormValues((prev) => ({
        ...prev,
        name,
        email,
        phoneNumber: phone_number,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <ContentContainer>
      <div>
        <div className="flex items-center gap-2 bg-white-yellow p-2">
          <PiShoppingCartSimpleBold size={25} className="shrink-0" />
          <p className="uppercase font-semibold text-black-light">Giỏ hàng</p>
        </div>

        <div className="flex mt-5 gap-5 justify-between">
          <div>
            <h3 className="uppercase font-bold mb-3">
              Thông tin đơn hàng:{" "}
              <span className="text-pink lowercase">
                {cart_products.length} sản phẩm
              </span>
            </h3>

            <ComponentSpinner isLoading={loading.product}>
              <div className="space-y-2">
                {cart_products.length ? (
                  cart_products.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onRemoveProduct={handleRemoveProductFromCart}
                    />
                  ))
                ) : (
                  <p>Không có sản phẩm nào trong giỏ hàng của bạn!</p>
                )}
              </div>
            </ComponentSpinner>
          </div>

          <ComponentSpinner isLoading={loading.info}>
            <form className="flex-grow">
              <div>
                <h3 className="uppercase font-bold mb-3">
                  Thông tin mua hàng:
                </h3>
                <div>
                  <input
                    type="text"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    value={formValues.name}
                    onChange={(e) =>
                      handleChangeFormValues({ name: e.target.value })
                    }
                    placeholder="Họ và tên"
                  />

                  <div className="w-full">
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg"
                      value={formValues.email}
                      onChange={(e) => {
                        handleChangeFormValues({ email: e.target.value });
                        setErrors({ ...errors, email: "" });
                      }}
                      placeholder="Email"
                    />
                    <p
                      className={clsx("min-h-4 text-red-500 text-xs", {
                        invisible: !errors.email,
                      })}
                    >
                      {errors.email}
                    </p>
                  </div>

                  <div className="w-full">
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border rounded-lg"
                      value={formValues.phoneNumber}
                      onChange={(e) => {
                        handleChangeFormValues({ phoneNumber: e.target.value });
                        setErrors({ ...errors, phoneNumber: "" });
                      }}
                      placeholder="Số điện thoại"
                    />
                    <p
                      className={clsx("min-h-4 text-red-500 text-xs", {
                        invisible: !errors.phoneNumber,
                      })}
                    >
                      {errors.phoneNumber}
                    </p>
                  </div>

                  <input
                    type="text"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                    value={formValues.address}
                    onChange={(e) =>
                      handleChangeFormValues({ address: e.target.value })
                    }
                    placeholder="Địa chỉ"
                  />

                  <textarea
                    className="w-full min-h-[100px] mb-4 px-4 py-2 border rounded-lg"
                    value={formValues.note}
                    onChange={(e) =>
                      handleChangeFormValues({ note: e.target.value })
                    }
                    placeholder="Ghi chú"
                  />
                </div>
              </div>

              <div>
                <h3 className="uppercase font-bold mb-3">Thanh toán:</h3>

                <div className="border rounded divide-y">
                  {PAYMENT_METHOD_ITEMS.map(({ id, label, value }) => (
                    <div>
                      <div
                        key={id}
                        className="flex items-center gap-2 px-4 py-2"
                      >
                        <input
                          type="radio"
                          name={value}
                          id={value}
                          checked={formValues.paymentMethod === value}
                          onChange={() =>
                            handleChangeFormValues({
                              paymentMethod: value,
                            })
                          }
                        />
                        <label htmlFor={value}>{label}</label>
                      </div>

                      {value === "banking" && (
                        <div
                          className={clsx(
                            "overflow-hidden bg-white-yellow space-y-1 text-sm font-medium duration-500",
                            {
                              "h-[130px] p-2":
                                formValues.paymentMethod === "banking",
                              "h-0": formValues.paymentMethod !== "banking",
                            }
                          )}
                        >
                          <p className="font-semibold">
                            Quý khách vui lòng thanh toán qua số tài khoản:
                          </p>
                          <p>- Ngân hàng Việt Nam Thịnh Vượng VPBank</p>
                          <p>- Số tài khoản: 138812278</p>
                          <p>- Tên tài khoản: TRƯƠNG NGHĨA TÍN</p>
                          <p>- Nội dung: Tên + SĐT</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="uppercase font-bold mb-3">Số tiền:</h3>

                <div className="p-2 border rounded">
                  <div className="border-b pb-3">
                    <div className="flex justify-between py-1">
                      <h6>Tạm tính: </h6>
                      <p>{formatVndCurrency(totalPrice)}</p>
                    </div>
                    <div className="flex justify-between py-1">
                      <h6>Vận chuyển: </h6>
                      <p>{formatVndCurrency(deliveryCost)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between py-1">
                    <h6 className="text-xl font-bold">Tổng cộng:</h6>
                    <p className="font-bold">
                      {formatVndCurrency(totalPrice + deliveryCost)}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 w-full py-2 px-5 bg-pink border border-pink rounded-lg text-white font-semibold hover:text-pink hover:bg-white disabled:opacity-50 disabled:hover:text-white disabled:hover:bg-pink"
                onClick={handleOrder}
                disabled={
                  !formValues.name ||
                  !formValues.email ||
                  !formValues.phoneNumber ||
                  !formValues.address ||
                  !formValues.paymentMethod ||
                  !cart_products.length
                }
              >
                Đặt hàng
              </button>
            </form>
          </ComponentSpinner>
        </div>
      </div>
    </ContentContainer>
  );
}
