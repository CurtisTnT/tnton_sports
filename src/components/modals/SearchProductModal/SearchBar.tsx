import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

import { useStore } from "@/context/Store";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar(props: Props) {
  const { onSearch } = props;

  const navigate = useNavigate();

  const { setAppState } = useStore();

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText) {
      setAppState((prev) => ({ ...prev, isSearchModalOpen: false }));
      navigate(`/search-results?search=${searchText}`);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchText);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className="flex gap-5 mt-5">
      <input
        id="search-bar"
        type="text"
        className="px-5 py-1 flex-grow outline-none border-b focus:border-pink"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        autoFocus
        placeholder="Tìm kiếm sản phẩm..."
      />

      <button
        type="button"
        onClick={handleSearch}
        className="text-black hover:scale-125 duration-300 disabled:opacity-65 disabled:hover:scale-100"
        disabled={!searchText}
      >
        <RiSearchLine size={25} className="shrink-0" />
      </button>
    </div>
  );
}
