import { Button, Card, Container } from "react-bootstrap";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/useOrder";

export const Payments = () => {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce(
    (total, items) => total + items.quantity * items.price,
    0,
  );

  const handlePayment = () => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartTotal,
      status: "Confirmed",
      date: new Date().toLocaleDateString(),
    };

    addOrder(newOrder);

    alert("Payment Successful");
    alert("Redirecting to Orders");
    clearCart();
    navigate("/orders");
  };

  return (
    <>
      <Container className="mt-4">
        <h1>
          <u>
            <b>Payments</b>
          </u>
        </h1>
        <Card className="mt-4">
          <Card.Body>
            <h4>Order Total</h4>

            <h2>₹{cartTotal}</h2>
          </Card.Body>
          <Button variant="success" onClick={handlePayment} className="mt-3">
            Pay now
          </Button>
        </Card>
      </Container>
    </>
  );
};
