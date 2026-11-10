import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productService";

export const AdminProducts = () => {
  const [adminProducts, setAdminProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setAdminProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        setAdminProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        alert("Unable to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setEditingProductId(null);
    setShowForm(false);
  };

  // Add or update product
  const handleSaveProduct = async (event) => {
    event.preventDefault();

    if (!productName.trim() || !productPrice || !productCategory.trim()) {
      alert("Please enter all product details!");
      return;
    }

    const product = {
      name: productName.trim(),
      price: Number(productPrice),
      category: productCategory.trim(),
    };

    try {
      if (editingProductId !== null) {
        await updateProduct(editingProductId, product);
        alert("Product updated successfully!");
      } else {
        await createProduct(product);
        alert("Product added successfully!");
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.message || "Unable to save product.");
    }
  };

  // Delete product
  const handleOnDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      alert("Product deleted successfully!");
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.message || "Unable to delete product.");
    }
  };

  // Load product details into form
  const handleOnEdit = (product) => {
    setEditingProductId(product.id);
    setProductName(product.name);
    setProductCategory(product.category);
    setProductPrice(product.price);
    setShowForm(true);
  };

  return (
    <Container className="mt-4">
      <h1>Product Management</h1>

      <Button
        variant="primary"
        onClick={() => {
          if (showForm) {
            resetForm();
          } else {
            setShowForm(true);
          }
        }}
      >
        {showForm ? "Close Form" : "Add Product"}
      </Button>

      {showForm && (
        <Card className="mt-4 shadow-sm">
          <Card.Body>
            <h4>
              {editingProductId !== null ? "Edit Product" : "Add New Product"}
            </h4>

            <Form onSubmit={handleSaveProduct}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="Enter product price"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="Enter product category"
                />
              </Form.Group>

              <Button variant="success" type="submit">
                {editingProductId !== null ? "Update Product" : "Save Product"}
              </Button>

              <Button
                variant="secondary"
                className="ms-3"
                onClick={resetForm}
                type="button"
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <div className="mt-4">
        {loading ? (
          <p>Loading products...</p>
        ) : adminProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          adminProducts.map((product) => (
            <Card className="mb-4 shadow-sm" key={product.id}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{product.name}</h5>
                    <p className="mb-1">Category: {product.category}</p>
                    <p className="mb-1">Price: ₹{product.price}</p>
                  </div>

                  <div>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleOnEdit(product)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleOnDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};
