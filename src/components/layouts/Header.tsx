import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhoneInTalk } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";

import shopName from "@/assets/images/shopName.png";
import { useStore } from "@/context/Store";
import SearchProductModal from "@/components/modals/SearchProductModal";
import { stores } from "@/constants/store";
import { initialUser } from "@/services/initialState";
import Toast from "../Toast";

const PRODUCT_NAV_ITEMS = [
  {
    id: 1,
    label: "Vợt cầu lông",
    producType: "racket",
    href: "/products/rackets",
    items: [
      { id: 1, label: "Vợt cầu lông Yonex", brand: "yonex" },
      { id: 2, label: "Vợt cầu lông Victor", brand: "victor" },
      { id: 3, label: "Vợt cầu lông Lining", brand: "lining" },
      { id: 4, label: "Vợt cầu lông Mizuno", brand: "mizuno" },
      { id: 5, label: "Vợt cầu lông Kumpoo", brand: "kumpoo" },
    ],
  },
  {
    id: 2,
    label: "Giày cầu lông",
    producType: "shoes",
    href: "/products/shoes",
    items: [
      { id: 1, label: "Giày cầu lông Yonex", brand: "yonex" },
      { id: 2, label: "Giày cầu lông Victor", brand: "victor" },
      { id: 3, label: "Giày cầu lông Lining", brand: "lining" },
      { id: 4, label: "Giày cầu lông Mizuno", brand: "mizuno" },
      { id: 5, label: "Giày cầu lông Kumpoo", brand: "kumpoo" },
    ],
  },
  {
    id: 3,
    label: "Áo cầu lông",
    producType: "shirt",
    href: "/products/shirts",
    items: [
      { id: 1, label: "Áo cầu lông Yonex", brand: "yonex" },
      { id: 2, label: "Áo cầu lông Victor", brand: "victor" },
      { id: 3, label: "Áo cầu lông Lining", brand: "lining" },
      { id: 4, label: "Áo cầu lông Mizuno", brand: "mizuno" },
      { id: 5, label: "Áo cầu lông Kumpoo", brand: "kumpoo" },
    ],
  },
  {
    id: 4,
    label: "Quần cầu lông",
    producType: "pants",
    href: "/products/pants",
    items: [
      { id: 1, label: "Quần cầu lông Yonex", brand: "yonex" },
      { id: 2, label: "Quần cầu lông Victor", brand: "victor" },
      { id: 3, label: "Quần cầu lông Lining", brand: "lining" },
      { id: 4, label: "Quần cầu lông Mizuno", brand: "mizuno" },
      { id: 5, label: "Quần cầu lông Kumpoo", brand: "kumpoo" },
    ],
  },
  {
    id: 5,
    label: "Váy cầu lông",
    producType: "dress",
    href: "/products/dresses",
    items: [
      { id: 1, label: "Váy cầu lông Yonex", brand: "yonex" },
      { id: 2, label: "Váy cầu lông Victor", brand: "victor" },
      { id: 3, label: "Váy cầu lông Lining", brand: "lining" },
      { id: 4, label: "Váy cầu lông Mizuno", brand: "mizuno" },
      { id: 5, label: "Váy cầu lông Kumpoo", brand: "kumpoo" },
    ],
  },
];

export default function Header() {
  const navigate = useNavigate();

  const {
    appState: {
      user: { id, cart_products, favorite_products },
    },
    setAppState,
  } = useStore();

  const divRef = useRef<HTMLDivElement>(null);
  const appIconRef = useRef<HTMLAnchorElement>(null);

  const PROFILE_ITEMS = id
    ? [
        {
          id: 1,
          label: "Đăng xuất",
          onClick: () => {
            setAppState((prev) => ({ ...prev, user: initialUser }));
            Toast({ type: "success", message: "Đăng xuất thành công!" });
          },
          icon: <IoIosLogOut size={18} />,
        },
      ]
    : [
        {
          id: 1,
          label: "Đăng nhập",
          onClick: () => {
            navigate("/sign-in");
          },
          icon: <IoIosLogIn size={18} />,
        },
        {
          id: 2,
          label: "Đăng kí",
          onClick: () => navigate("/sign-up"),
          icon: <FiUserPlus size={18} />,
        },
      ];

  useEffect(() => {
    const checkDivRef = () => {
      const isInView = divRef.current!.getBoundingClientRect().top > -60;

      if (isInView) {
        appIconRef.current?.classList.add("invisible");
      } else {
        appIconRef.current?.classList.remove("invisible");
      }
    };
    window.addEventListener("scroll", checkDivRef);

    return () => window.removeEventListener("scroll", checkDivRef);
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className="flex justify-center bg-black-light text-white-yellow"
      >
        <div className="w-[1200px] grid grid-cols-12 py-2">
          <div className="col-span-4 flex items-center gap-2">
            <FaPhoneFlip size={20} className="shrink-0" />
            <p>Hotline: </p>
            <span className="font-bold">0987258871</span>
          </div>

          <Link to="/" className="col-span-4 justify-self-center h-[44px]">
            <img src={shopName} alt="shopName" width={120} />
          </Link>

          <div className="relative col-span-4 flex items-center justify-end gap-2 group">
            <FaMapLocationDot size={25} className="shrink-0" />
            <span className="text-sm">HỆ THỐNG CỬA HÀNG</span>
            <div className="absolute w-[300px] h-[300px] overflow-y-scroll z-50 top-10 space-y-px p-1 bg-white rounded shadow-[0px_0px_10px_1px_rgb(0,0,0,0.1)] hidden group-hover:block text-xs">
              {stores.map(({ type, label, address, phone_number }) => (
                <div key={type} className="border border-white-dark-yellow">
                  <div className="w-full p-2 bg-white-dark-yellow text-start text-white font-bold">
                    {label}
                  </div>

                  <div className="space-y-1 p-1 font-medium duration-500 text-black-light">
                    <div className="flex gap-1">
                      <IoLocationSharp
                        size={20}
                        className="shrink-0 text-white-dark-yellow"
                      />
                      <p> {address}</p>
                    </div>
                    <div className="flex gap-1">
                      <MdPhoneInTalk
                        size={18}
                        className="shrink-0 text-white-dark-yellow"
                      />
                      <p> {phone_number}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white shadow-lg">
        <div className="grid grid-cols-12 py-2">
          <Link
            ref={appIconRef}
            to="/"
            className="col-span-3 justify-self-end invisible"
          >
            <img
              src={shopName}
              alt="shopName"
              width={130}
              className="p-1.5 border border-white-yellow rounded"
            />
          </Link>

          <div className="col-span-6">
            <ul className="grid grid-cols-4 justify-items-center h-full">
              <li className="relative w-full col-span-1 flex flex-col justify-center items-center group">
                <Link
                  to="/sale-off"
                  className="text-white-dark-yellow hover:text-pink font-semibold"
                >
                  <div className="flex items-center gap-1">
                    <p>Sản phẩm</p>
                    <FaAngleDown
                      size={15}
                      className="-rotate-180 group-hover:rotate-0 duration-300"
                    />
                  </div>
                </Link>

                <div className="absolute self-start top-[54px] w-screen -translate-x-1/4 bg-white p-5 shadow-[0px_0px_10px_1px] shadow-pink/40 hidden group-hover:block">
                  <div className="grid grid-cols-5 gap-4">
                    {PRODUCT_NAV_ITEMS.map(({ id, label, href, items }) => (
                      <div key={id} className="col-span-1 flex flex-col">
                        <Link
                          to={href}
                          className="border-b border-pink text-pink font-semibold uppercase"
                        >
                          {label}
                        </Link>

                        <div className="flex flex-col items-start pt-4">
                          {items.map(({ id, brand, label }) => (
                            <Link
                              key={id}
                              to={`${href}?brand=${brand}`}
                              className="text-sm hover:text-pink"
                            >
                              {label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              <li className="w-full col-span-1 flex flex-col justify-center items-center group">
                <Link
                  to="/sale-off"
                  className="text-white-dark-yellow hover:text-pink font-semibold"
                >
                  <div className="flex items-center gap-1">
                    <p>Sale off</p>
                    <FaAngleDown
                      size={15}
                      className="-rotate-180 group-hover:rotate-0 duration-300"
                    />
                  </div>
                </Link>

                <div className="absolute top-[54px] flex-col items-start py-1 bg-white shadow-[0px_0px_10px_1px] shadow-pink/40 hidden group-hover:flex rounded text-sm">
                  <Link
                    to="/sale-off/rackets-shoes"
                    className="py-0.5 px-4 hover:text-pink"
                  >
                    Vợt, giày cầu lông
                  </Link>
                  <Link
                    to="/sale-off/clothes"
                    className="py-0.5 px-4 hover:text-pink"
                  >
                    Áo, quần, váy cầu lông
                  </Link>
                </div>
              </li>

              <li className="w-full col-span-1 flex flex-col justify-center items-center">
                <Link
                  to="/news"
                  className="text-white-dark-yellow hover:text-pink font-semibold"
                >
                  Tin tức
                </Link>
              </li>

              <li className="w-full col-span-1 flex flex-col justify-center items-center">
                <Link
                  to="/contact"
                  className="text-white-dark-yellow hover:text-pink font-semibold"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-3 flex items-center gap-6">
            <button
              type="button"
              className="flex flex-grow gap-2 items-center pb-1 border-b hover:text-pink"
              onClick={() =>
                setAppState((prev) => ({ ...prev, isSearchModalOpen: true }))
              }
            >
              <RiSearchLine size={25} className="shrink-0" />
              <span>Tìm kiếm</span>
            </button>

            <div className="flex gap-2 px-4">
              <button
                type="button"
                className="relative p-2 border rounded-3xl hover:text-pink"
                onClick={() => {
                  if (id) {
                    setAppState((prev) => ({
                      ...prev,
                      isFavoriteModalOpen: true,
                    }));
                  } else {
                    Toast({
                      type: "info",
                      message: "Bạn cần đăng nhập để sử dụng tính năng này!",
                    });
                    navigate("/sign-in");
                  }
                }}
              >
                <span className="absolute -top-1.5 right-0 min-w-4 h-4 text-center text-xs text-white rounded-lg bg-pink">
                  {favorite_products.length || 0}
                </span>
                <FaRegHeart size={25} className="shrink-0" />
              </button>

              <button
                type="button"
                className="relative p-2 border rounded-3xl hover:text-pink"
                onClick={() => {
                  if (id) {
                    setAppState((prev) => ({
                      ...prev,
                      isCartModalOpen: true,
                    }));
                  } else {
                    Toast({
                      type: "info",
                      message: "Bạn cần đăng nhập để sử dụng tính năng này!",
                    });
                    navigate("/sign-in");
                  }
                }}
              >
                <span className="absolute -top-1.5 right-0 min-w-4 h-4 text-center text-xs text-white rounded-lg bg-pink">
                  {cart_products.length || 0}
                </span>
                <PiShoppingCartSimpleBold size={25} className="shrink-0" />
              </button>

              <span className="relative p-2 border rounded-3xl hover:text-pink group">
                <FaRegUser size={25} className="shrink-0" />

                <div className="absolute top-10 right-0 hidden group-hover:flex flex-col bg-white rounded shadow-[0px_0px_10px_1px_rgb(0,0,0,0.1)] overflow-hidden text-nowrap">
                  {PROFILE_ITEMS.map(({ id, onClick, label, icon }) => (
                    <button
                      key={id}
                      onClick={onClick}
                      className="flex items-center gap-2 px-5 py-1 text-black text-sm hover:bg-pink hover:text-white"
                    >
                      {icon}
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <SearchProductModal />
    </>
  );
}
