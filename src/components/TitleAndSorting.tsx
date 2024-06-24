import { useState } from "react";
import clsx from "clsx";
import { BiSortDown } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";

type Props = {
  title: string;
  onSort: (item: Sort) => void;
};

type Sort = {
  id: number;
  sortField: "name" | "price";
  order: "asc" | "desc";
  label: string;
};

const SORT_ITEMS: Sort[] = [
  { id: 1, sortField: "name", order: "asc", label: "A → Z" },
  { id: 2, sortField: "name", order: "desc", label: "Z → A" },
  { id: 3, sortField: "price", order: "asc", label: "Giá tăng dần" },
  { id: 4, sortField: "price", order: "desc", label: "Giá giảm dần" },
];

export default function TitleAndSorting(props: Props) {
  const { title, onSort } = props;
  const [selectedSort, setSelectedSort] = useState<Sort>();

  const handleSort = (item: Sort) => {
    setSelectedSort(item);
    onSort(item);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white-yellow rounded-lg text-sm">
      <p className="uppercase font-semibold text-black-light">{title}</p>

      <div className="flex items-center gap-2">
        <div className="flex items-center text-gray-600">
          <BiSortDown size={20} />
          <span>Sắp xếp:</span>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-1">
            <span>{selectedSort ? selectedSort.label : "Mặc định"}</span>
            <FaAngleDown
              size={15}
              className="-rotate-180 group-hover:rotate-0 duration-300"
            />
          </div>

          <div className="absolute flex flex-col z-30 top-5 -right-2 w-[200px] bg-white rounded shadow-[0px_0px_10px_1px_rgb(0,0,0,0.3)] h-0 overflow-hidden group-hover:h-auto duration-300">
            {SORT_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSort(item)}
                className={clsx(
                  "px-2 py-1 text-start hover:bg-pink hover:text-white",
                  { "text-pink": selectedSort?.id === item.id }
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
