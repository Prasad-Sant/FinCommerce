import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
export const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <BootstrapNavbar bg="dark" variant="dark" expand="lg">
        <Container>
          <BootstrapNavbar.Brand as={NavLink} to="/">
            FinCommerce
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="main-navbar" />

          <BootstrapNavbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cart">
                Cart({cartCount})
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin">
                Admin
              </Nav.Link>
              <Nav.Link as={NavLink} to="/orders">
                Orders
              </Nav.Link>
            </Nav>

            <Nav>
              {user ? (
                <>
                  <Nav.Link disabled>{user.email}</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};
