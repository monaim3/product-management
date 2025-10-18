"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug, removeProduct } from "@/store/slices/productsSlice";
import { toast } from "react-hot-toast";
import { Edit, Trash, ArrowLeft, Tag, DollarSign, Info, Image as ImageIcon } from "lucide-react";

export default function ProductDetailsDashboard() {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (slug) dispatch(getProductBySlug(slug));
  }, [slug, dispatch]);

  const handleEdit = () => router.push(`/products/${currentProduct.slug}/edit`);

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#EFF1F3" }}> <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: "#4E6E5D" }}></div>
        <p className="text-lg font-medium" style={{ color: "#4E6E5D" }}>Loading product...</p> </div> </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#EFF1F3" }}>
        <div className="text-center bg-white p-8 rounded-2xl border-2" style={{ borderColor: "#A44A3F" }}>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#A44A3F" }}>Product Not Found</h2>
          <p className="text-sm mb-6" style={{ color: "#4E6E5D" }}>The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{ backgroundColor: "#4E6E5D", color: "#EFF1F3" }}
          >
            Back to Products </button> </div> </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#EFF1F3" }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col justify-between p-6 w-64" style={{ backgroundColor: "#0D1821" }}> <div>
        <button
          onClick={() => router.push("/products")}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg font-medium transition-all duration-200"
          style={{ backgroundColor: "rgba(239,241,243,0.1)", color: "#EFF1F3" }}
        > <ArrowLeft className="w-4 h-4" /> Back </button> <div className="space-y-4">
          <button
            onClick={handleEdit}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{ backgroundColor: "#4E6E5D", color: "#EFF1F3" }}
          > <Edit className="w-4 h-4" /> Edit Product </button>
          <button
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{ backgroundColor: "#A44A3F", color: "#EFF1F3" }}
          > <Trash className="w-4 h-4" /> Delete </button> </div> </div>
         </aside>


      <main className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#0D1821" }}>
            Product Overview
          </h1>
          <div className="flex md:hidden gap-2">
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg"
              style={{ backgroundColor: "#4E6E5D", color: "#EFF1F3" }}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg"
              style={{ backgroundColor: "#A44A3F", color: "#EFF1F3" }}
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: "#ffffff" }}>
            {currentProduct.images?.length > 0 ? (
              <img
                src={currentProduct.images[0]}
                alt={currentProduct.name}
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-72">
                <ImageIcon className="w-10 h-10 mb-2" style={{ color: "#4E6E5D" }} />
                <p style={{ color: "#4E6E5D" }}>No image available</p>
              </div>
            )}
            {currentProduct.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2 p-3">
                {currentProduct.images.slice(1, 5).map((img, i) => (
                  <img key={i} src={img} alt="thumb" className="rounded-lg h-16 object-cover" />
                ))}
              </div>
            )}
          </div>

          <div className="col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: "#ffffff" }}>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#0D1821" }}>
                {currentProduct.name}
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-5 h-5" style={{ color: "#AD8A64" }} />
                <span className="text-3xl font-bold" style={{ color: "#AD8A64" }}>
                  ${currentProduct.price}
                </span>
              </div>
              {currentProduct.category && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" style={{ color: "#4E6E5D" }} />
                  <span
                    className="px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: "#4E6E5D", color: "#EFF1F3" }}
                  >
                    {currentProduct.category.name}
                  </span>
                </div>
              )}
            </div>
            {currentProduct.description && (
              <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: "#ffffff" }}>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3" style={{ color: "#0D1821" }}>
                  <Info className="w-5 h-5" style={{ color: "#4E6E5D" }} /> Description
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#4E6E5D" }}>
                  {currentProduct.description}
                </p>
              </div>
            )}

            <div className="p-6 rounded-2xl shadow-xl grid grid-cols-2 sm:grid-cols-3 gap-4" style={{ backgroundColor: "#ffffff" }}>
              <div>
                <p className="text-sm" style={{ color: "#4E6E5D" }}>Product ID</p>
                <p className="font-semibold" style={{ color: "#0D1821" }}>{currentProduct.id}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: "#4E6E5D" }}>Slug</p>
                <p className="font-mono text-sm" style={{ color: "#0D1821" }}>{currentProduct.slug}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: "#4E6E5D" }}>Images</p>
                <p className="font-semibold" style={{ color: "#0D1821" }}>{currentProduct.images?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
