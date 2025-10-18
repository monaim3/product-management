"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "@/store/slices/productsSlice";
import ProductForm from "@/components/products/ProductForm";
import Loading from "@/components/Loading";

export default function EditProductPage() {
  const params = useParams();
  const slug = params?.slug;
  const dispatch = useDispatch();

  const { currentProduct, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (slug) dispatch(getProductBySlug(slug));
  }, [slug, dispatch]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      {currentProduct ? (
        <ProductForm initialData={currentProduct} />
      ) : (
        <p>No product data found.</p>
      )}
    </div>
  );
}
