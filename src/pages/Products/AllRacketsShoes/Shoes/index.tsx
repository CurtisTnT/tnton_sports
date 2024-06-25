import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ContentContainer from "@/components/layouts/ContentContainer";
import { Brand, BrandType, brands } from "@/constants/brand";
import { HighLight, HighLightType, highLights } from "@/constants/hightLight";
import {
  PriceLevel,
  PriceLevelType,
  priceLevels,
} from "@/constants/priceLevel";
import { ShoesForm, ShoesFormType, shoesForms } from "@/constants/shoesForm";
import { ShoesSize, ShoesSizeType, shoesSizes } from "@/constants/shoesSize";
import { Store, StoreType, stores } from "@/constants/store";
import { Subject, SubjectType, subjects } from "@/constants/subject";
import { Product, ProductParams, RacketShoes } from "@/services/interface";
import { initialProduct } from "@/services/initialState";
import { ModalRef } from "@/components/modals/Modal";
import { getRacketsAndShoes } from "@/services/productsAction";
import { IoClose } from "react-icons/io5";
import SelectedFilters from "@/components/SelectedFilters";
import SideBarFilter from "@/components/SideBarFilter";
import TitleAndSorting from "@/components/TitleAndSorting";
import ComponentSpinner from "@/components/loading/ComponentSpinner";
import ProductCard from "@/components/cards/ProductCard";
import PaginationComponent from "@/components/PaginationComponent";
import DetailProductModal from "@/components/modals/DetailProductModal";

type Filters = {
  page: number;
  limit: number;
  product_type: "shoes";
  brand: BrandType[];
  price_level: PriceLevelType[];
  shoes_size: ShoesSizeType[];
  subject: SubjectType[];
  hight_light: HighLightType[];
  shoes_form: ShoesFormType[];
  stores: StoreType[];
} & Pick<ProductParams, "sortBy" | "order">;

export default function Shoes() {
  const [searchParams] = useSearchParams();
  const brandQuery = searchParams.get("brand");

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 9,
    product_type: "shoes",
    brand: [],
    price_level: [],
    shoes_size: [],
    subject: [],
    hight_light: [],
    shoes_form: [],
    stores: [],
  });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<RacketShoes[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(initialProduct);

  const detailProductModalRef = useRef<ModalRef>(null);

  const isShowSelectedItems =
    !!filters.brand.length ||
    !!filters.price_level.length ||
    !!filters.brand.length ||
    !!filters.price_level.length ||
    !!filters.shoes_size.length ||
    !!filters.subject.length ||
    !!filters.hight_light.length ||
    !!filters.shoes_form.length ||
    !!filters.stores.length;

  const handleFilters = async (values: Partial<Filters>) => {
    setLoading(true);
    const newFilters = values.page
      ? { ...filters, ...values }
      : { ...filters, ...values, page: 1 };
    setFilters(newFilters);

    const res = await getRacketsAndShoes({
      ...newFilters,
      brand: newFilters.brand.join("|"),
      price_level: newFilters.price_level.join("|"),
      shoes_size: newFilters.shoes_size.join("|"),
      subject: newFilters.subject.join("|"),
      hight_light: newFilters.hight_light.join("|"),
      shoes_form: newFilters.shoes_form.join("|"),
      stores: newFilters.stores.join("|"),
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
        brand: "",
        price_level: "",
        shoes_size: "",
        subject: "",
        hight_light: "",
        shoes_form: "",
        stores: "",
      });

      if (res) {
        setProducts(res);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (brandQuery) {
      handleFilters({ brand: [brandQuery as BrandType] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandQuery]);

  return (
    <ContentContainer>
      <div className="flex gap-10">
        <div>
          <nav className="w-[300px] p-5 space-y-5 bg-white border rounded-xl shrink-0">
            {isShowSelectedItems && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-black-light">
                  <p className="font-semibold">Bạn chọn</p>
                  <button
                    type="button"
                    onClick={() =>
                      handleFilters({
                        brand: [],
                        price_level: [],
                        shoes_size: [],
                        subject: [],
                        hight_light: [],
                        shoes_form: [],
                        stores: [],
                      })
                    }
                    className="flex items-center gap-1 py-0.5 px-2 text-sm font-semibold hover:text-pink"
                  >
                    <label>Bỏ hết</label>
                    <IoClose size={18} />
                  </button>
                </div>

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
                  selectedItems={filters.shoes_size}
                  object={ShoesSize}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      shoes_size: newValues as ShoesSizeType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.subject}
                  object={Subject}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      subject: newValues as SubjectType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.hight_light}
                  object={HighLight}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      hight_light: newValues as HighLightType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.shoes_form}
                  object={ShoesForm}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      shoes_form: newValues as ShoesFormType[],
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
              label="Size"
              filterItems={shoesSizes}
              selectedItems={filters.shoes_size}
              onCheckItem={(items) =>
                handleFilters({ shoes_size: items as ShoesSizeType[] })
              }
            />
            <SideBarFilter
              label="Đối tượng"
              filterItems={subjects}
              selectedItems={filters.subject}
              onCheckItem={(items) =>
                handleFilters({ subject: items as SubjectType[] })
              }
            />
            <SideBarFilter
              label="Điểm nổi bật"
              filterItems={highLights}
              selectedItems={filters.hight_light}
              onCheckItem={(items) =>
                handleFilters({ hight_light: items as HighLightType[] })
              }
            />
            <SideBarFilter
              label="Form giày"
              filterItems={shoesForms}
              selectedItems={filters.shoes_form}
              onCheckItem={(items) =>
                handleFilters({ shoes_form: items as ShoesFormType[] })
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
            title="Giày cầu lông"
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
        closeModal={() => detailProductModalRef.current?.close()}
      />
    </ContentContainer>
  );
}
