import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { getAllOrders } from "../api/orderService";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllOrders();
        console.log("Orders data:", data);
        console.log("First order:", data[0]);
        console.log("First order keys:", Object.keys(data[0] ?? {}));
        console.log("First order item:", data[0]?.orderItems?.[0]);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);

        setError(
          "Unable to load your orders. Please check that the backend is running and try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString();
  };

  return (
    <Container className="mt-4">
      <h1>My Orders</h1>

      {loading && (
        <div className="mt-4 text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Loading orders...</p>
        </div>
      )}

      {!loading && error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {!loading && !error && orders.length === 0 && (
        <Card className="mt-4">
          <Card.Body>
            <h3>No Orders</h3>
            <p>No orders placed yet.</p>
          </Card.Body>
        </Card>
      )}

      {!loading &&
        !error &&
        orders.map((order) => (
          <Card className="mt-4" key={order.id}>
            <Card.Body>
              <h4>
                Order number: <b>#{order.id}</b>
              </h4>

              <h4>
                Order status: <b>{order.status}</b>
              </h4>

              <h4>
                Date of order: <b>{formatDate(order.createdAt)}</b>
              </h4>

              <hr />

              <h4>
                <b>Items included:</b>
              </h4>

              {(order.items ?? []).map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="d-flex justify-content-between mb-3"
                >
                  <span>
                    {item.product?.name ?? "Unknown product"} × {item.quantity}
                  </span>

                  <span>
                    ₹{(Number(item.unitPrice) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <hr />

              <h4 className="text-end">
                Total:{" "}
                <b>
                  <u>₹{Number(order.totalAmount).toFixed(2)}</u>
                </b>
              </h4>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};
