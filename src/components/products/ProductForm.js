"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductAsync, updateProductAsync } from "@/store/slices/productsSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProductForm({ initialData, onSuccess }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    images: initialData?.images?.[0] || "", 
    categoryId: initialData?.category?.id || "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.price) errors.price = "Price is required";
    else if (isNaN(form.price) || Number(form.price) <= 0)
      errors.price = "Price must be a positive number";
    if (!form.description) errors.description = "Description is required";
    if (!form.images) errors.images = "Image URL is required";
    if (!form.categoryId) errors.categoryId = "Category is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = {
      name: form.name,
      description: form.description,
      images: [form.images], 
      price: Number(form.price),
      categoryId: form.categoryId,
    };

    try {
      if (initialData) {
        await dispatch(updateProductAsync({ id: initialData.id, updatedData: payload })).unwrap();
        toast.success("Product updated successfully!");
        router.push("/products");
      } else {
        await dispatch(createProductAsync(payload)).unwrap();
        toast.success("Product created successfully!");
        router.push("/products");
        setForm({
          name: "",
          price: "",
          description: "",
          images: "",
          categoryId: "",
        });
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-2xl mx-auto">
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          className="mt-1 w-full p-2 border rounded"
        />
        {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium">Price *</label>
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          className="mt-1 w-full p-2 border rounded"
        />
        {formErrors.price && <p className="text-red-500">{formErrors.price}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          className="mt-1 w-full p-2 border rounded"
        />
        {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium">Image URL *</label>
        <input
          name="images"
          value={form.images}
          onChange={onChange}
          placeholder="https://example.com/image.jpg"
          className="mt-1 w-full p-2 border rounded"
        />
        {formErrors.images && <p className="text-red-500">{formErrors.images}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Category ID *</label>
        <input
          name="categoryId"
          value={form.categoryId}
          onChange={onChange}
          className="mt-1 w-full p-2 border rounded"
        />
        {formErrors.categoryId && <p className="text-red-500">{formErrors.categoryId}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading
          ? "Submitting..."
          : initialData
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  </div>
  );
}
