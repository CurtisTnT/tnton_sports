import { useState } from "react";
import { MdLabel } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Product } from "@/services/interface";
import { formatVndCurrency } from "@/utils/helpers";
import { shoesSizes } from "@/constants/shoesSize";
import { clothesSizes } from "@/constants/clothesSize";
import { updateUser } from "@/services/userAction";
import { useStore } from "@/context/Store";

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

  const {
    appState: { user },
    setAppState,
  } = useStore();

  const [selectedAttributes, setSelectedAttributes] = useState<{
    size: string;
    quantity: number;
  }>({ size: selectedSize || "", quantity: selectedQuantity || 1 });

  let url = "";
  switch (product_type) {
    case "racket":
      url = "rackets";
      break;
    case "shirt":
      url = "shirts";
      break;
    case "dress":
      url = "dresses";
      break;
    default:
      url = product_type!;
      break;
  }

  const handleRemoveProductFromCart = async () => {
    const isDelete = confirm(
      `Bạn có muốn xoá ${product.name} ra khỏi giỏ hàng của bạn!`
    );

    if (!isDelete) return;

    const res = await updateUser({
      ...user,
      cart_products: user.cart_products.filter((prod) => prod.id !== id),
    });

    if (res) {
      setAppState((prev) => ({ ...prev, user: res }));
    }
  };

  const renderSelectSize = (opts: {
    initItems: { type: string; label: string }[];
    curItems: string[];
    id: string;
  }) => (
    <>
      <label htmlFor={opts.id} className="font-medium mr-4">
        Size: <span className="font-bold">{selectedAttributes.size}</span>
      </label>
    </>
  );

  return (
    <div
      key={id}
      className="relative flex p-2 gap-2 border border-pink rounded"
    >
      <Link
        to={`/products/${url}/${id.toString().split(" ")[0]}`}
        onClick={() =>
          setAppState((prev) => ({ ...prev, isCartModalOpen: false }))
        }
        className="relative h-[200px] w-[200px] rounded shadow-[0px_0px_10px_1px_rgb(0,0,0,0.1)] shrink-0 overflow-hidden"
      >
        <img src={image_url[0]} alt="product-image" width={200} height={200} />

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
      </Link>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <Link
            to={`/products/${url}/${id.toString().split(" ")[0]}`}
            onClick={() =>
              setAppState((prev) => ({ ...prev, isCartModalOpen: false }))
            }
            type="button"
            className="text-start font-bold"
          >
            {name}
          </Link>

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
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-2 right-2 text-red-500"
        onClick={handleRemoveProductFromCart}
      >
        <BsTrash size={18} />
      </button>
    </div>
  );
}
