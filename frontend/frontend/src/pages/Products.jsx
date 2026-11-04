import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

import { ProductCard } from "../components/ProductCard";
import { getAllProducts } from "../api/productService";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Products</h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p className="mt-2">Loading products...</p>
        </div>
      )}

      {!loading && error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && products.length === 0 && (
        <Alert variant="info">No products are available right now.</Alert>
      )}

      {!loading && !error && products.length > 0 && (
        <Row className="g-4">
          {products.map((product) => (
            <Col xs={12} sm={6} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
