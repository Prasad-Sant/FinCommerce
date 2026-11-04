import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/productService";
import { useCart } from "../context/useCart";

export const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  // Store the selected product received from the backend
  const [product, setProduct] = useState(null);

  // Track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the selected product whenever productId changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Request status:", err.response?.status);
        console.error("Response data:", err.response?.data);
        setError("Unable to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Display a loading message while waiting for the backend
  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading product details...</p>
      </Container>
    );
  }

  // Display an error if the request fails or the product doesn't exist
  if (error || !product) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">{error || "Product not found."}</Alert>

        <Button as={Link} to="/" variant="secondary">
          Back to Home
        </Button>
      </Container>
    );
  }

  // Display the selected product
  return (
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
                <strong>Price:</strong> ₹
                {Number(product.price).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Card.Text>

              {product.description && (
                <Card.Text>{product.description}</Card.Text>
              )}

              <Button
                variant="primary"
                className="me-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>

              <Button as={Link} to="/" variant="secondary">
                Back to Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
