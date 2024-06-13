import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

import shopName from "@/assets/images/shopName.png";

export default function Header() {
  const divRef = useRef<HTMLDivElement>(null);
  const appIconRef = useRef<HTMLAnchorElement>(null);

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
            <button className="font-bold">0987258871</button>
          </div>

          <Link to="/" className="col-span-4 justify-self-center h-[44px]">
            <img src={shopName} alt="shopName" width={120} />
          </Link>

          <div className="col-span-4 flex items-center justify-end gap-2">
            <FaMapLocationDot size={25} className="shrink-0" />
            <button className="text-sm">HỆ THỐNG CỬA HÀNG</button>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 grid grid-cols-12 bg-white py-2 px-4 shadow-lg">
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

        <div className="col-span-6 content-center">
          <ul className="grid grid-cols-4 justify-items-center content-center">
            <li className="col-span-1">
              <button
                type="button"
                className="text-white-dark-yellow hover:text-pink font-semibold"
              >
                Sản phẩm
              </button>
            </li>

            <li className="col-span-1">
              <Link
                to="/sale-off"
                className="text-white-dark-yellow hover:text-pink font-semibold"
              >
                Sale off
              </Link>
            </li>

            <li className="col-span-1">
              <Link
                to="/news"
                className="text-white-dark-yellow hover:text-pink font-semibold"
              >
                Tin tức
              </Link>
            </li>

            <li className="col-span-1">
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
          >
            <RiSearchLine size={25} className="shrink-0" />
            <span>Tìm kiếm</span>
          </button>

          <div className="flex gap-2">
            <Link
              to="/favorite"
              className="relative p-2 border rounded-3xl hover:text-pink"
            >
              <span className="absolute -top-1.5 right-0 min-w-4 h-4 text-center text-xs text-white rounded-lg bg-pink">
                2
              </span>
              <FaRegHeart size={25} className="shrink-0" />
            </Link>

            <Link
              to="/shopping-cart"
              className="relative p-2 border rounded-3xl hover:text-pink"
            >
              <span className="absolute -top-1.5 right-0 min-w-4 h-4 text-center text-xs text-white rounded-lg bg-pink">
                2
              </span>
              <PiShoppingCartSimpleBold size={25} className="shrink-0" />
            </Link>

            <Link
              to="/profile"
              className="p-2 border rounded-3xl hover:text-pink"
            >
              <FaRegUser size={25} className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
