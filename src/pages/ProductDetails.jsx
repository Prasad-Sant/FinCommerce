import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/Products";
import { useCart } from "../context/useCart";

export const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => {
    return item.id === Number(productId);
  });

  if (!product) {
    return (
      <Container className="mt-4">
        <h1
          style={{
            textDecoration: "underline",
          }}
        >
          Product Not Found
        </h1>
        <Button as={Link} to="/products">
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <div>
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body className="text-center p-5">
                <h1>🛍️</h1>
                <h3>{product.name}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="fs-2">{product.name}</Card.Title>

                <Card.Text>
                  <strong>Category:</strong> {product.category}
                </Card.Text>

                <Card.Text className="fs-4">
                  <strong>Price:</strong> ₹{product.price}
                </Card.Text>

                <Card.Text>{product.description}</Card.Text>

                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>

                <Button as={Link} to="/products" variant="secondary">
                  Back to Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
