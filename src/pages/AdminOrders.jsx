import { Card, Container, Form } from "react-bootstrap";
import { useOrder } from "../context/useOrder";

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrder();

  return (
    <Container className="mt-4">
      <h1>Admin Orders</h1>

      {orders.length === 0 ? (
        <Card className="mt-4">
          <Card.Body>
            <h4>No orders found</h4>
            <p>There are currently no customer orders.</p>
          </Card.Body>
        </Card>
      ) : (
        orders.map((order) => (
          <Card className="mt-4 shadow-sm" key={order.id}>
            <Card.Body>
              <h4>Order #{order.id}</h4>

              <p>
                <b>Status:</b> {order.status}
              </p>
              <Form.Select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="mt-3"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>

              <p>
                <b>Date:</b> {order.date}
              </p>

              <hr />

              <h5>Items</h5>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>₹{item.quantity * item.price}</span>
                </div>
              ))}

              <hr />

              <h4 className="text-end">Total: ₹{order.total}</h4>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};
