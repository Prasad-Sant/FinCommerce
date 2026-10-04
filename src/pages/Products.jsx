import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/Products";

export const Products = () => {
  return (
    <>
      <Container className="mt-4">
        <h1 className="mb-4">Product</h1>
        <Row>
          {products.map((product) => (
            <Col md={3} key={product.id} className="mb-4">
              <ProductCard product={product}></ProductCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
