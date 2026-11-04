import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { ProductCard } from "../components/ProductCard";
import { getAllProducts } from "../api/productService";

export const Home = () => {
  // 1. Store the products received from the backend
  const [products, setProducts] = useState([]);

  // 2. Track whether products are still loading
  const [loading, setLoading] = useState(true);

  // 3. Store an error message if the API request fails
  const [error, setError] = useState("");

  // 4. Fetch products when the Home component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // Call our Spring Boot backend through Axios
        const data = await getAllProducts();

        // Save the products in React state
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);

        setError("Unable to load products. Please try again.");
      } finally {
        // Stop showing the loading indicator
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 5. Display the Home page
  return (
    <Container className="py-4">
      {/* Page heading */}
      <div className="text-center mb-4">
        <h1>Welcome to FinCommerce</h1>
        <p className="text-muted">
          Discover products and shop with confidence.
        </p>
      </div>

      {/* Show this while waiting for the backend */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading products...</span>
          </Spinner>

          <p className="mt-2">Loading products...</p>
        </div>
      )}

      {/* Show this if the API request fails */}
      {!loading && error && <Alert variant="danger">{error}</Alert>}

      {/* Show this if the backend returns an empty list */}
      {!loading && !error && products.length === 0 && (
        <Alert variant="info">No products are available right now.</Alert>
      )}

      {/* Show product cards when products are available */}
      {!loading && !error && products.length > 0 && (
        <>
          <h2 className="mb-4">Our Products</h2>

          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};
