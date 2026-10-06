import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useOrder } from "../context/useOrder";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const { orders, totalRevenue } = useOrder();
  console.log("Admin Dashboard orders:", orders);
  console.log("Admin Dashboard revenue:", totalRevenue);
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
              <Card.Text className="fs-2">5</Card.Text>
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
              <Card.Text className="fs-2">5000</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Revenue:</Card.Title>
              <Card.Text className="fs-2">₹{totalRevenue}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
