import { useEffect, useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { getAllOrders } from "../api/orderService";

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch admin orders:", err);

        setError(
          "Unable to load orders. Please check the backend and try again.",
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
      <h1>Admin Orders</h1>

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
            <h4>No orders found</h4>
            <p>There are currently no customer orders.</p>
          </Card.Body>
        </Card>
      )}

      {!loading &&
        !error &&
        orders.map((order) => (
          <Card className="mt-4 shadow-sm" key={order.id}>
            <Card.Body>
              <h4>Order #{order.id}</h4>

              <p>
                <b>Status:</b> {order.status}
              </p>

              <p className="text-muted">
                Status updates will be enabled after we connect the backend
                update endpoint.
              </p>

              <p>
                <b>Date:</b> {formatDate(order.createdAt)}
              </p>

              <hr />

              <h5>Items</h5>

              {(order.items ?? []).map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="d-flex justify-content-between mb-3"
                >
                  <span>
                    {item.productName ?? "Unknown product"} × {item.quantity}
                  </span>

                  <span>
                    ₹
                    {(Number(item.unitPrice) * Number(item.quantity)).toFixed(
                      2,
                    )}
                  </span>
                </div>
              ))}

              <hr />

              <h4 className="text-end">
                Total: ₹{Number(order.totalAmount).toFixed(2)}
              </h4>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};
