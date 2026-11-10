import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productService";
import { getAllOrders } from "../api/orderService";

export const AdminOrders = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        setTotalProducts(products.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    getAllOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0,
  );

  return (
    <Container className="mt-4">
      <h1>Admin Dashboard</h1>

      <div className="d-flex gap-2">
        <Button variant="primary" as={Link} to="/admin/orders">
          View ordered items
        </Button>

        <Button variant="primary" as={Link} to="/admin/users">
          View users
        </Button>
      </div>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Products:</Card.Title>
              <Card.Text className="fs-2">{totalProducts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Orders:</Card.Title>
              <Card.Text className="fs-2">{orders.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Users:</Card.Title>
              <Card.Text className="fs-5 text-muted">Not available</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Order Value:</Card.Title>
              <Card.Text className="fs-2">₹{totalRevenue.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
