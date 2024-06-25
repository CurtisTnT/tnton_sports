import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetailsPage from "@/components/ProductDetailsPage";
import { Product } from "@/services/interface";
import { initialProduct } from "@/services/initialState";
import { getDetailClothes } from "@/services/productsAction";

export default function PantsDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    (async () => {
      if (Number(productId)) {
        const res = await getDetailClothes({
          productId: Number(productId),
        });

        setProduct(res);
      }
    })();
  }, [productId]);

  return Number(productId) ? (
    product.id && product.product_type === "pants" ? (
      <ProductDetailsPage product={product} />
    ) : (
      <h1 className="text-center">There is no product!</h1>
    )
  ) : (
    <h1>404 Page not found!</h1>
  );
}
