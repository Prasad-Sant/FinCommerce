import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            <strong>Category: </strong>
            {product.category}
          </Card.Text>
          <Card.Text>
            <strong>Price: ₹</strong>
            {product.price}
          </Card.Text>
          <Button as={Link} to={`/products/${product.id}`}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
