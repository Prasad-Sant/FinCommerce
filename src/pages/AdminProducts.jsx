import { Button, Card, Container } from "react-bootstrap";
import { products } from "../data/Products";
import { useState } from "react";

export const AdminProducts = () => {
  const [adminProducts, setAdminProducts] = useState(products);

  const handleOnDelete = (productId) =>
    setAdminProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== productId),
    );
  return (
    <Container className="mt-4">
      <h1>Product Management</h1>
      <Button variant="primary" className="mt-">
        Add Product
      </Button>

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
                  <Button variant="warning" className="me-2">
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
