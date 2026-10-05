import { Card, Col, Container, Row } from "react-bootstrap";
import { useOrder } from "../context/useOrder";

export const AdminDashboard = () => {
  const { orders, totalRevenue } = useOrder();
  return (
    <Container className="mt-4">
      <h1>Admin Dashboard</h1>

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
