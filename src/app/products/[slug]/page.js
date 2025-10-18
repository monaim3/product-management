"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug, removeProduct } from "@/store/slices/productsSlice";
import { toast } from "react-hot-toast";
import { Edit, Trash } from "lucide-react";

export default function ProductDetailsPage() {
  const { slug } = useParams(); 
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug));
    }
  }, [slug, dispatch]);

  const handleEdit = () => {
    router.push(`/products/${currentProduct.slug}/edit`);
  };

  const handleDelete = async () => {
    if (!currentProduct) return;
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(removeProduct(currentProduct.id)).unwrap();
        toast.success("Product deleted successfully!");
        router.push("/products"); 
      } catch (err) {
        toast.error(err || "Failed to delete product");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentProduct) {
    return <p className="p-6 text-red-500">Invalid product slug.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{currentProduct.name}</h1>

      <div className="flex gap-4">
        {currentProduct.images?.map((img, idx) => (
          <img key={idx} src={img} alt={currentProduct.name} className="w-48 h-48 object-cover rounded" />
        ))}
      </div>

      <p><strong>Price:</strong> ${currentProduct.price}</p>
      <p><strong>Description:</strong> {currentProduct.description}</p>
      <p><strong>Category:</strong> {currentProduct.category?.name}</p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <Edit className="w-4 h-4" /> Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
        >
          <Trash className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}
