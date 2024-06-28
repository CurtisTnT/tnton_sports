import { Fragment, useState } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import { useStore } from "@/context/Store";
import shopName from "@/assets/images/shopName.png";
import ContentContainer from "@/components/layouts/ContentContainer";
import { Product } from "@/services/interface";
import SearchBar from "./SearchBar";
import { formatVndCurrency } from "@/utils/helpers";

const SEARCH_KEYWORD_ITEMS = [
  { id: 1, label: "Vợt cầu lông", to: "/search-results?search=vợt cầu lông" },
  { id: 2, label: "Giày cầu lông", to: "/search-results?search=giày cầu lông" },
  { id: 3, label: "Áo cầu lông", to: "/search-results?search=áo cầu lông" },
  { id: 4, label: "Quần cầu lông", to: "/search-results?search=quần cầu lông" },
  { id: 5, label: "Váy cầu lông", to: "/search-results?search=váy cầu lông" },
];

export default function SearchProductModal() {
  const navigate = useNavigate();

  const {
    appState: { isSearchModalOpen, racketsAndShoes, clothes },
    setAppState,
  } = useStore();

  const [searchProducts, setSearchProducts] = useState<Product[]>([]);

  const handleSearchProduct = (search: string) => {
    const products: Product[] = [...racketsAndShoes, ...clothes];

    const newProducts = products.filter(({ name }) =>
      name.toLowerCase().includes(search.trim().toLowerCase())
    );

    setSearchProducts(search ? newProducts.slice(0, 4) : []);
  };

  const handleCloseModal = () => {
    setAppState((prev) => ({ ...prev, isSearchModalOpen: false }));
    setSearchProducts([]);
  };

  const handleViewAll = () => {
    const searchElm = document.getElementById("search-bar") as HTMLInputElement;
    handleCloseModal();
    navigate(`/search-results?search=${searchElm.value}`);
  };

  return (
    <Transition appear show={isSearchModalOpen} as={Fragment}>
      <Dialog as="div" open={isSearchModalOpen} onClose={handleCloseModal}>
        <div className="fixed inset-0 bg-[black]/60 z-[999]">
          <div className={clsx("flex items-start justify-end")}>
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <DialogPanel
                as="div"
                className={clsx(
                  "relative bg-white shadow border-0 w-full antialiased"
                )}
              >
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="absolute z-10 top-3 right-3 hover:opacity-80"
                >
                  <IoClose size={20} />
                </button>

                <ContentContainer>
                  <div className="flex flex-col items-center">
                    <Link to="/" onClick={handleCloseModal}>
                      <img src={shopName} alt="shopName" width={130} />
                    </Link>
                  </div>

                  <SearchBar onSearch={handleSearchProduct} />

                  <div className="flex flex-col items-center mt-2">
                    <h4 className="uppercase text-sm font-bold">
                      Được tìm kiếm nhiều nhất
                    </h4>

                    <div className="flex gap-2 mt-1">
                      {SEARCH_KEYWORD_ITEMS.map(({ id, label, to }) => (
                        <Link
                          key={id}
                          to={to}
                          onClick={handleCloseModal}
                          className="py-0.5 px-2 border border-pink rounded-lg text-pink text-xs font-medium hover:text-white hover:bg-pink"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 flex justify-center gap-2 h-[250px]">
                    {searchProducts.length ? (
                      <>
                        {searchProducts.map(
                          ({ id, product_type, image_url, name, price }) => {
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

                            return (
                              <Link
                                key={id}
                                to={`/products/${url}/${id}`}
                                onClick={handleCloseModal}
                                className="flex flex-col w-[150px] border rounded overflow-hidden hover:border-pink hover:text-black"
                              >
                                <div className="flex-grow flex items-center ">
                                  <img src={image_url[0]} alt="preview-image" />
                                </div>

                                <div className="px-2 pb-2 text-xs">
                                  <h4 className="">{name}</h4>
                                  <p className="text-pink font-bold">
                                    {formatVndCurrency(price)}
                                  </p>
                                </div>
                              </Link>
                            );
                          }
                        )}
                        <button
                          type="button"
                          className="self-end text-sm text-pink"
                          onClick={handleViewAll}
                        >
                          Xem tất cả...
                        </button>
                      </>
                    ) : (
                      <div>Không có sản phẩm phù hợp!</div>
                    )}
                  </div>
                </ContentContainer>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
