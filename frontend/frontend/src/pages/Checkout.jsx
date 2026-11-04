import { Button, Card, Container } from "react-bootstrap";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

export const Checkout = () => {
  const { cartItems } = useCart();

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  if (cartItems.length === 0) {
    return (
      <Container className="mt-4">
        <Card className="p-4">
          <Card.Body>
            <h3>Your Cart is Empty</h3>
            <h6>Please add something into your cart</h6>
            <Button as={Link} to="/products" className="mt-3">
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h1>
          <b>
            <u>Checkout</u>
          </b>
        </h1>
        <Card className="mt-4">
          <Card.Body>
            <h3>Order Summary</h3>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-3"
              >
                <span>
                  {item.name}×{item.quantity}
                </span>
                <span>₹{formatPrice(item.quantity * item.price)}</span>
              </div>
            ))}
            <hr />
            <div>
              <h4
                style={{
                  textAlign: "end",
                }}
              >
                Total Amount :{" "}
                <b>
                  <u>₹{formatPrice(cartTotal)}</u>
                </b>
              </h4>
            </div>
            <div>
              <Button variant="primary" as={Link} to="/payment">
                Proceed to payment
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
