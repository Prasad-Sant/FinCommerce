import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const AdminNavbar = () => {
  return (
    <Nav variant="tabs" className="mt-3 mb-4 justify-content-center">
      <Nav.Link as={NavLink} to="/admin" end>
        Dashboard
      </Nav.Link>

      <Nav.Link as={NavLink} to="/admin/products">
        Products
      </Nav.Link>

      <Nav.Link as={NavLink} to="/admin/orders">
        Orders
      </Nav.Link>

      <Nav.Link as={NavLink} to="/admin/users">
        Users
      </Nav.Link>
    </Nav>
  );
};
