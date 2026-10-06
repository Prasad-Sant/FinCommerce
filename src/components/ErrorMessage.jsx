import { Alert } from "react-bootstrap";

export const ErrorMessage = ({ message }) => {
  return (
    <Alert variant="danger" className="mt-4">
      {message}
    </Alert>
  );
};
