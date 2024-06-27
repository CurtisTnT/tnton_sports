import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SideBarFilter from "@/components/SideBarFilter";
import ContentContainer from "@/components/layouts/ContentContainer";
import {
  PriceLevel,
  PriceLevelType,
  priceLevels,
} from "@/constants/priceLevel";
import { Store, StoreType, stores } from "@/constants/store";
import { Product, ProductParams, RacketShoes } from "@/services/interface";
import { getRacketsAndShoes } from "@/services/productsAction";
import ComponentSpinner from "@/components/loading/ComponentSpinner";
import ProductCard from "@/components/cards/ProductCard";
import {
  ProductType,
  ProductTypeType,
  productTypes,
} from "@/constants/productType";
import PaginationComponent from "@/components/PaginationComponent";
import { Brand, BrandType, brands } from "@/constants/brand";
import TitleAndSorting from "@/components/TitleAndSorting";
import SelectedFilters from "@/components/SelectedFilters";
import { IoClose } from "react-icons/io5";
import DetailProductModal from "@/components/modals/DetailProductModal";
import { ModalRef } from "@/components/modals/Modal";
import { initialProduct } from "@/services/initialState";

type Filters = {
  page: number;
  limit: number;
  is_discount: true;
  product_type: ProductTypeType[];
  brand: BrandType[];
  price_level: PriceLevelType[];
  stores: StoreType[];
} & Pick<ProductParams, "sortBy" | "order">;

export default function RacketsShoes() {
  const [searchParams] = useSearchParams();
  const productTypeQuery = searchParams.get("product_type");

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 9,
    is_discount: true,
    product_type: [],
    brand: [],
    price_level: [],
    stores: [],
  });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<RacketShoes[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(initialProduct);

  const detailProductModalRef = useRef<ModalRef>(null);

  const handleFilters = async (values: Partial<Filters>) => {
    setLoading(true);
    const newFilters = values.page
      ? { ...filters, ...values }
      : { ...filters, ...values, page: 1 };
    setFilters(newFilters);

    const res = await getRacketsAndShoes({
      ...newFilters,
      product_type: newFilters.product_type.join("|"),
      brand: newFilters.brand.join("|"),
      stores: newFilters.stores.join("|"),
      price_level: newFilters.price_level.join("|"),
    });

    if (res) {
      setProducts(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getRacketsAndShoes({
        ...filters,
        product_type: "",
        brand: "",
        stores: "",
        price_level: "",
      });

      if (res) {
        setProducts(res);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productTypeQuery) {
      handleFilters({ product_type: [productTypeQuery as ProductTypeType] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productTypeQuery]);

  return (
    <ContentContainer>
      <div className="flex gap-10">
        <div>
          <nav className="w-[300px] p-5 space-y-5 bg-white border rounded-xl shrink-0">
            {(!!filters.product_type.length ||
              !!filters.brand.length ||
              !!filters.stores.length ||
              !!filters.price_level.length) && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-black-light">
                  <p className="font-semibold">Bạn chọn</p>
                  <button
                    type="button"
                    onClick={() =>
                      handleFilters({
                        product_type: [],
                        brand: [],
                        stores: [],
                        price_level: [],
                      })
                    }
                    className="flex items-center gap-1 py-0.5 px-2 text-sm font-semibold hover:text-pink"
                  >
                    <label>Bỏ hết</label>
                    <IoClose size={18} />
                  </button>
                </div>

                <SelectedFilters
                  selectedItems={filters.product_type}
                  object={ProductType}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      product_type: newValues as ProductTypeType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.brand}
                  object={Brand}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      brand: newValues as BrandType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.price_level}
                  object={PriceLevel}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      price_level: newValues as PriceLevelType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.stores}
                  object={Store}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      stores: newValues as StoreType[],
                    })
                  }
                />
              </div>
            )}

            <SideBarFilter
              label="Vợt, giày"
              filterItems={productTypes.slice(0, 2)}
              selectedItems={filters.product_type}
              onCheckItem={(items) =>
                handleFilters({ product_type: items as ProductTypeType[] })
              }
            />
            <SideBarFilter
              label="Thương hiệu"
              filterItems={brands}
              selectedItems={filters.brand}
              onCheckItem={(items) =>
                handleFilters({ brand: items as BrandType[] })
              }
            />
            <SideBarFilter
              label="Chọn mức giá"
              filterItems={priceLevels}
              selectedItems={filters.price_level}
              onCheckItem={(items) =>
                handleFilters({ price_level: items as PriceLevelType[] })
              }
            />
            <SideBarFilter
              label="Chi nhánh"
              filterItems={stores}
              selectedItems={filters.stores}
              onCheckItem={(items) =>
                handleFilters({ stores: items as StoreType[] })
              }
            />
          </nav>
        </div>

        <main className="flex-grow space-y-4">
          <TitleAndSorting
            title="Sản phẩm thanh lý"
            onSort={({ sortField, order }) =>
              handleFilters({ sortBy: sortField, order })
            }
          />

          <ComponentSpinner isLoading={loading}>
            {products.length ? (
              <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id + product.product_type!}
                    product={product}
                    onSelectProduct={() => {
                      setSelectedProduct(product);
                      detailProductModalRef.current?.open();
                    }}
                  />
                ))}
              </div>
            ) : (
              <p>Không có sản phẩm ở trang hay bộ lọc này!</p>
            )}
          </ComponentSpinner>

          <PaginationComponent
            currentPage={filters.page}
            hasNextPage={products.length === filters.limit}
            onNavigate={(page) => handleFilters({ page })}
          />
        </main>
      </div>

      <DetailProductModal
        detailProductModalRef={detailProductModalRef}
        selectedProduct={selectedProduct}
        onClose={() => detailProductModalRef.current?.close()}
      />
    </ContentContainer>
  );
}
