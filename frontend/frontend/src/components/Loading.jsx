import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
      <p className="mt-2">Loading...</p>
    </div>
  );
};
