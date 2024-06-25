import { useState } from "react";
import clsx from "clsx";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhoneInTalk } from "react-icons/md";

import { Store, StoreType } from "@/constants/store";

type Props = {
  stores: string[];
  className?: string;
};

export default function StoreList(props: Props) {
  const { stores, className } = props;

  const [selectedStore, setSelectedStore] = useState("");

  return (
    <div className={clsx("w-[300px]", className)}>
      <div className="relative p-3 pt-7 border border-dotted border-pink rounded text-sm">
        <h3 className="absolute -top-[15px] left-3 p-1 bg-white border border-pink rounded uppercase text-pink font-bold">
          Đang có hàng tại
        </h3>

        <div className="space-y-px">
          {stores.map((store) => (
            <div key={store} className="border border-pink">
              <button
                type="button"
                className="w-full p-2 bg-pink text-start text-white font-bold"
                onClick={() =>
                  setSelectedStore(selectedStore === store ? "" : store)
                }
              >
                {Store[store as StoreType].label}
              </button>

              <div
                className={clsx(
                  "overflow-hidden space-y-1 font-medium duration-500",
                  {
                    "h-[100px] p-1": selectedStore === store,
                    "h-0": selectedStore !== store,
                  }
                )}
              >
                <div className="flex gap-1">
                  <IoLocationSharp size={20} className="shrink-0 text-pink" />
                  <p> {Store[store as StoreType].address}</p>
                </div>
                <div className="flex gap-1">
                  <MdPhoneInTalk size={18} className="shrink-0 text-pink" />
                  <p> {Store[store as StoreType].phone_number}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
