import React from "react";
import { GetServerSideProps } from "next";
import { ProductDetail } from "../../src/components/ProductDetail";
import { Product } from "../../src/App";
import { getProductById } from "../../src/services/marketplace";
import { useCart } from "../../src/context/CartContext";

interface Props {
  product: Product | null;
}

export default function ProductPage({ product }: Props) {
  const { addToCart } = useCart();
  if (!product) return <div className="p-8">Product not found</div>;

  const navigateTo = (page: string) => {
    if (page === "products") return window.location.assign("/products");
    return window.location.assign("/");
  };

  return (
    <ProductDetail
      product={product}
      navigateTo={navigateTo as any}
      addToCart={addToCart}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string | undefined;
  if (!id) return { props: { product: null } };

  try {
    const product = await getProductById(id);
    return { props: { product } };
  } catch {
    return { props: { product: null } };
  }
};
