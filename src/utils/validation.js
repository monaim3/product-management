export const validateProduct = (productData) => {
  const errors = {};

  if (!productData.name || productData.name.trim() === "") {
    errors.name = "Product name is required.";
  } else if (productData.name.length < 3) {
    errors.name = "Product name must be at least 3 characters.";
  }

  if (!productData.price && productData.price !== 0) {
    errors.price = "Price is required.";
  } else if (isNaN(productData.price)) {
    errors.price = "Price must be a valid number.";
  } else if (productData.price <= 0) {
    errors.price = "Price must be greater than zero.";
  }

  if (!productData.categoryId) {
    errors.categoryId = "Category is required.";
  }

  if (!productData.description || productData.description.trim() === "") {
    errors.description = "Description is required.";
  } else if (productData.description.length < 10) {
    errors.description = "Description must be at least 10 characters long.";
  }

  return errors;
};

export const isValidProduct = (productData) => {
  const errors = validateProduct(productData);
  return Object.keys(errors).length === 0;
};
