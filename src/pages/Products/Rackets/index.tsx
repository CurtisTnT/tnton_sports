import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ContentContainer from "@/components/layouts/ContentContainer";
import { ModalRef } from "@/components/modals/Modal";
import { Balance, BalanceType, balances } from "@/constants/balance";
import { Brand, BrandType, brands } from "@/constants/brand";
import {
  GripLength,
  GripLengthType,
  gripLengths,
} from "@/constants/gripLength";
import {
  PriceLevel,
  PriceLevelType,
  priceLevels,
} from "@/constants/priceLevel";
import {
  RacketLength,
  RacketLengthType,
  racketLengths,
} from "@/constants/racketLength";
import { Stiffness, StiffnessType, stiffness } from "@/constants/stiffness";
import { Store, StoreType, stores } from "@/constants/store";
import {
  SwingWeight,
  SwingWeightType,
  swingWeights,
} from "@/constants/swingWeight";
import { Weight, WeightType, weights } from "@/constants/weight";
import { initialProduct } from "@/services/initialState";
import { Product, ProductParams, RacketShoes } from "@/services/interface";
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
  product_type: "racket";
  brand: BrandType[];
  price_level: PriceLevelType[];
  racket_length: RacketLengthType[];
  grip_length: GripLengthType[];
  swing_weight: SwingWeightType[];
  balance: BalanceType[];
  weight: WeightType[];
  stiffness: StiffnessType[];
  stores: StoreType[];
} & Pick<ProductParams, "sortBy" | "order">;

export default function Rackets() {
  const [searchParams] = useSearchParams();
  const brandQuery = searchParams.get("brand");

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 9,
    product_type: "racket",
    brand: [],
    price_level: [],
    racket_length: [],
    grip_length: [],
    swing_weight: [],
    balance: [],
    weight: [],
    stiffness: [],
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
    !!filters.racket_length.length ||
    !!filters.grip_length.length ||
    !!filters.swing_weight.length ||
    !!filters.balance.length ||
    !!filters.weight.length ||
    !!filters.stiffness.length ||
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
      racket_length: newFilters.racket_length.join("|"),
      grip_length: newFilters.grip_length.join("|"),
      swing_weight: newFilters.swing_weight.join("|"),
      balance: newFilters.balance.join("|"),
      weight: newFilters.weight.join("|"),
      stiffness: newFilters.stiffness.join("|"),
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
        racket_length: "",
        grip_length: "",
        swing_weight: "",
        balance: "",
        weight: "",
        stiffness: "",
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
                        racket_length: [],
                        grip_length: [],
                        swing_weight: [],
                        balance: [],
                        weight: [],
                        stiffness: [],
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
                  selectedItems={filters.racket_length}
                  object={RacketLength}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      racket_length: newValues as RacketLengthType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.grip_length}
                  object={GripLength}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      grip_length: newValues as GripLengthType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.swing_weight}
                  object={SwingWeight}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      swing_weight: newValues as SwingWeightType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.balance}
                  object={Balance}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      balance: newValues as BalanceType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.weight}
                  object={Weight}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      weight: newValues as WeightType[],
                    })
                  }
                />
                <SelectedFilters
                  selectedItems={filters.stiffness}
                  object={Stiffness}
                  onDeleteItem={(newValues) =>
                    handleFilters({
                      stiffness: newValues as StiffnessType[],
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
              label="Chiều dài vợt"
              filterItems={racketLengths}
              selectedItems={filters.racket_length}
              onCheckItem={(items) =>
                handleFilters({ racket_length: items as RacketLengthType[] })
              }
            />
            <SideBarFilter
              label="Chiều dài cán vợt"
              filterItems={gripLengths}
              selectedItems={filters.grip_length}
              onCheckItem={(items) =>
                handleFilters({ grip_length: items as GripLengthType[] })
              }
            />
            <SideBarFilter
              label="Swing weight"
              filterItems={swingWeights}
              selectedItems={filters.swing_weight}
              onCheckItem={(items) =>
                handleFilters({ swing_weight: items as SwingWeightType[] })
              }
            />
            <SideBarFilter
              label="Điểm cân bằng"
              filterItems={balances}
              selectedItems={filters.balance}
              onCheckItem={(items) =>
                handleFilters({ balance: items as BalanceType[] })
              }
            />
            <SideBarFilter
              label="Trọng lượng"
              filterItems={weights}
              selectedItems={filters.weight}
              onCheckItem={(items) =>
                handleFilters({ weight: items as WeightType[] })
              }
            />
            <SideBarFilter
              label="Độ cứng đũa"
              filterItems={stiffness}
              selectedItems={filters.stiffness}
              onCheckItem={(items) =>
                handleFilters({ stiffness: items as StiffnessType[] })
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
            title="Vợt cầu lông"
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
