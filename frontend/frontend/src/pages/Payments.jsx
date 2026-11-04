import { useState } from "react";
import { Button, Card, Container, Alert, Spinner } from "react-bootstrap";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/useOrder";
import { createOrder } from "../api/orderService";

export const Payments = () => {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const handlePayment = async () => {
    if (cartItems.length === 0 || loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderRequest = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const savedOrder = await createOrder(orderRequest);

      // Keep the existing Orders page working for now.
      // The backend remains the source of truth.
      addOrder({
        id: savedOrder.id,
        items: cartItems,
        total: savedOrder.totalAmount,
        status: savedOrder.status,
        date: savedOrder.createdAt,
      });

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Order creation failed:", err);

      setError(
        err.response?.data?.error ||
          "Unable to place your order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h1>
        <u>
          <b>Payments</b>
        </u>
      </h1>

      <Card className="mt-4">
        <Card.Body>
          <h4>Order Total</h4>
          <h2>₹{cartTotal.toFixed(2)}</h2>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          <Button
            variant="success"
            onClick={handlePayment}
            disabled={loading || cartItems.length === 0}
            className="mt-3"
          >
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
