import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="display-1">404</h1>

      <h2>Page Not Found</h2>

      <p className="text-muted">
        Sorry, the page you are looking for does not exist.
      </p>

      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Container>
  );
};
