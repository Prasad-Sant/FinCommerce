import { Button, Card, Container } from "react-bootstrap";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, calculateTotal } =
    useCart();

  console.log(cartItems);
  return (
    <Container>
      <h1
        style={{
          textDecoration: "underline",
        }}
        className="my-4"
      >
        Shopping Cart
      </h1>

      {cartItems == 0 ? (
        <div>
          <Card className="mt-3 p-4">
            <Card.Title>Empty Cart </Card.Title>
            <Card.Body>Please add some products to the cart</Card.Body>
          </Card>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <h4>{item.name}</h4>
                <h6 className="mt-4">Price : ₹{item.price}</h6>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <h6 className="">Quantity : </h6>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item.id, +1)}
                  >
                    +
                  </button>
                </div>

                <Button
                  className="mt-2"
                  block
                  variant="primary"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
          <hr />

          <Card className="px-3 py-3 mb-5">
            <Card.Title className="">Total</Card.Title>
            <Card.Text className="">
              Total Amount :{" "}
              <b>
                <u>₹{calculateTotal}</u>
              </b>
              <div>
                <Button
                  variant="primary"
                  as={Link}
                  to="/checkout"
                  className="mt-2"
                >
                  Proceed to checkout
                </Button>
              </div>
            </Card.Text>
          </Card>
        </div>
      )}
    </Container>
  );
};
