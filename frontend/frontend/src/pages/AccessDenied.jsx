import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="display-1">403</h1>

      <h2>Access Denied</h2>

      <p className="text-muted">
        You do not have permission to access this page.
      </p>

      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Container>
  );
};
