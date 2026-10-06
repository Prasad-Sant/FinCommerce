import { Button, Card, Container, Form } from "react-bootstrap";
import { products } from "../data/Products";
import { useState } from "react";

export const AdminProducts = () => {
  const [adminProducts, setAdminProducts] = useState(products);

  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  const handleOnDelete = (productId) =>
    setAdminProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== productId),
    );

  const handleSaveProduct = () => {
    if (!productCategory || !productName || !productPrice) {
      alert("Please enter all the credentials!");
      return;
    }

    if (editingProductId !== null) {
      setAdminProducts(
        (previousProducts) =>
          previousProducts.map((product) =>
            product.id === editingProductId
              ? {
                  ...product,
                  name: productName,
                  price: Number(productPrice),
                  category: productCategory,
                }
              : product,
          ),
        alert("Product saved successfully"),
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        category: productCategory,
      };

      setAdminProducts((previousProducts) => [...previousProducts, newProduct]);

      setProductCategory("");
      setProductName("");
      setProductPrice("");

      alert("Product saved successfully");

      setShowForm(false);
    }
  };

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
        className="mt-"
        onClick={() => setShowForm(!showForm)}
      >
        Add Product
      </Button>
      {showForm && (
        <Card className="mt-4 shadow-sm">
          <Card.Body>
            <h4>Add New Product</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="Enter product price"
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="Enter product category"
                ></Form.Control>
              </Form.Group>

              <Button variant="success" onClick={handleSaveProduct}>
                Save Product
              </Button>
              <Button
                variant="primary"
                className="ms-3"
                onClick={() => setShowForm(false)}
              >
                Cancle
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <div className="mt-4">
        {adminProducts.map((product) => (
          <Card className="mb-4 shadow-sm" key={product.id}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{product.name}</h5>
                  <p className="mb-1">Category : {product.category}</p>
                  <p className="mb-1">Price : {product.price}</p>
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
        ))}
      </div>
    </Container>
  );
};
