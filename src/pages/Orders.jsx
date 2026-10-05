import { Card, Container } from "react-bootstrap";
import { useOrder } from "../context/useOrder";

export const Orders = () => {
  const { orders } = useOrder();

  return (
    <Container className="mt-4">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <Card className="mt-4">
          <Card.Body>
            <h3>No Orders</h3>
            <p>No orders placed yet.</p>
          </Card.Body>
        </Card>
      ) : (
        orders.map((order) => (
          <Card className="mt-4 " key={order.id}>
            <Card.Body>
              <h4>
                Order number : <b>#{order.id}</b>
              </h4>
              <h4>
                Order status : <b>{order.status}</b>
              </h4>
              <h4>
                Date of order : <b>{order.date}</b>
              </h4>
              <hr />
              <h4>
                <b>Items include:</b>
              </h4>

              {/* For Each Item */}
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-4"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.quantity * item.price}</span>
                </div>
              ))}
              <hr />
              <h4 className="text-end">
                Total :{" "}
                <b>
                  <u>₹{order.total}</u>
                </b>
              </h4>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};
