import { Card, Container } from "react-bootstrap";
import { useCart } from "../context/useCart";

export const Orders = () => {
  const { calculateTotal } = useCart();

  return (
    <Container className="mt-4">
      <h1>My Orders</h1>

      <Card className="mt-4">
        <Card.Body>
          <h4>Order 1001</h4>

          <p>Status: Confirmed</p>

          <p>Total: ₹{calculateTotal}</p>

          <p>Your order has been successfully placed.</p>
        </Card.Body>
      </Card>
    </Container>
  );
};
