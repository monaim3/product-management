"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductAsync, updateProductAsync } from "@/store/slices/productsSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Save, Loader2, Image as ImageIcon, DollarSign, Tag, FileText, ArrowLeft } from "lucide-react";

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
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
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
    <div className="min-h-screen" style={{ backgroundColor: '#EFF1F3' }}>
      <div className="sticky top-0 z-10 shadow-lg" style={{ backgroundColor: '#0D1821' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/products')}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: 'rgba(239, 241, 243, 0.1)', color: '#EFF1F3' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 241, 243, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 241, 243, 0.1)'}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#EFF1F3' }}>
                {initialData ? 'Edit Product' : 'Create New Product'}
              </h1>
              <p className="text-sm" style={{ color: '#EFF1F3', opacity: 0.8 }}>
                {initialData ? 'Update your product information' : 'Add a new product to your inventory'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rounded-2xl shadow-xl p-6 sm:p-8" style={{ backgroundColor: '#ffffff' }}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: '#0D1821' }}>
                <Tag className="w-4 h-4" style={{ color: '#4E6E5D' }} />
                Product Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Enter product name"
                className="w-full px-4 py-3 rounded-lg outline-none transition-all text-base"
                style={{
                  backgroundColor: '#EFF1F3',
                  border: formErrors.name ? '2px solid #A44A3F' : '2px solid #4E6E5D',
                  color: '#0D1821'
                }}
                onFocus={(e) => {
                  if (!formErrors.name) {
                    e.target.style.borderColor = '#AD8A64';
                    e.target.style.boxShadow = '0 0 0 3px rgba(173, 138, 100, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!formErrors.name) {
                    e.target.style.borderColor = '#4E6E5D';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {formErrors.name && (
                <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#A44A3F' }}>
                  <span>⚠</span> {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: '#0D1821' }}>
                <DollarSign className="w-4 h-4" style={{ color: '#4E6E5D' }} />
                Price *
              </label>
              <div className="relative">
                <span 
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg"
                  style={{ color: '#AD8A64' }}
                >
                  $
                </span>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={onChange}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all text-base"
                  style={{
                    backgroundColor: '#EFF1F3',
                    border: formErrors.price ? '2px solid #A44A3F' : '2px solid #4E6E5D',
                    color: '#0D1821'
                  }}
                  onFocus={(e) => {
                    if (!formErrors.price) {
                      e.target.style.borderColor = '#AD8A64';
                      e.target.style.boxShadow = '0 0 0 3px rgba(173, 138, 100, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!formErrors.price) {
                      e.target.style.borderColor = '#4E6E5D';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>
              {formErrors.price && (
                <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#A44A3F' }}>
                  <span>⚠</span> {formErrors.price}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: '#0D1821' }}>
                <FileText className="w-4 h-4" style={{ color: '#4E6E5D' }} />
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Enter product description"
                rows={5}
                className="w-full px-4 py-3 rounded-lg outline-none transition-all text-base resize-none"
                style={{
                  backgroundColor: '#EFF1F3',
                  border: formErrors.description ? '2px solid #A44A3F' : '2px solid #4E6E5D',
                  color: '#0D1821'
                }}
                onFocus={(e) => {
                  if (!formErrors.description) {
                    e.target.style.borderColor = '#AD8A64';
                    e.target.style.boxShadow = '0 0 0 3px rgba(173, 138, 100, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!formErrors.description) {
                    e.target.style.borderColor = '#4E6E5D';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {formErrors.description && (
                <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#A44A3F' }}>
                  <span>⚠</span> {formErrors.description}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: '#0D1821' }}>
                <ImageIcon className="w-4 h-4" style={{ color: '#4E6E5D' }} />
                Image URL *
              </label>
              <input
                name="images"
                type="url"
                value={form.images}
                onChange={onChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-lg outline-none transition-all text-base"
                style={{
                  backgroundColor: '#EFF1F3',
                  border: formErrors.images ? '2px solid #A44A3F' : '2px solid #4E6E5D',
                  color: '#0D1821'
                }}
                onFocus={(e) => {
                  if (!formErrors.images) {
                    e.target.style.borderColor = '#AD8A64';
                    e.target.style.boxShadow = '0 0 0 3px rgba(173, 138, 100, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!formErrors.images) {
                    e.target.style.borderColor = '#4E6E5D';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {formErrors.images && (
                <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#A44A3F' }}>
                  <span>⚠</span> {formErrors.images}
                </p>
              )}
              {form.images && !formErrors.images && (
                <div className="mt-3 rounded-lg overflow-hidden" style={{ border: '2px solid #4E6E5D' }}>
                  <img 
                    src={form.images} 
                    alt="Preview" 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: '#0D1821' }}>
                <Tag className="w-4 h-4" style={{ color: '#4E6E5D' }} />
                Category ID *
              </label>
              <input
                name="categoryId"
                value={form.categoryId}
                onChange={onChange}
                placeholder="Enter category ID"
                className="w-full px-4 py-3 rounded-lg outline-none transition-all text-base"
                style={{
                  backgroundColor: '#EFF1F3',
                  border: formErrors.categoryId ? '2px solid #A44A3F' : '2px solid #4E6E5D',
                  color: '#0D1821'
                }}
                onFocus={(e) => {
                  if (!formErrors.categoryId) {
                    e.target.style.borderColor = '#AD8A64';
                    e.target.style.boxShadow = '0 0 0 3px rgba(173, 138, 100, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!formErrors.categoryId) {
                    e.target.style.borderColor = '#4E6E5D';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {formErrors.categoryId && (
                <p className="mt-2 text-sm flex items-center gap-1" style={{ color: '#A44A3F' }}>
                  <span>⚠</span> {formErrors.categoryId}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className=" flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                style={{
                  backgroundColor: loading ? '#4E6E5D' : '#4E6E5D',
                  color: '#EFF1F3',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#AD8A64';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#4E6E5D';
                  }
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {initialData ? 'Update Product' : 'Create Product'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/products')}
                disabled={loading}
                className=" sm:flex-initial px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: '#EFF1F3',
                  color: '#4E6E5D',
                  border: '2px solid #4E6E5D'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#4E6E5D';
                    e.target.style.color = '#EFF1F3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#EFF1F3';
                    e.target.style.color = '#4E6E5D';
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}