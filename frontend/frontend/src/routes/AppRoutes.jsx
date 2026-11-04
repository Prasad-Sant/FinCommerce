import { Route, Routes } from "react-router-dom";
import { Home } from "./../pages/Home";
import { Products } from "./../pages/Products";
import { Cart } from "./../pages/Cart";
import { Login } from "./../pages/Login";
import { ProductDetails } from "../pages/ProductDetails";
import { Checkout } from "../pages/Checkout";
import { Payments } from "../pages/Payments";
import { Orders } from "../pages/Orders";
import { AdminLayout } from "./../components/AdminLayout";
import { AdminDashboard } from "./../pages/AdminDashboard";
import { AdminProducts } from "./../pages/AdminProducts";
import { AdminUsers } from "./../pages/AdminUsers";
import { AdminOrders } from "./../pages/AdminOrders";
import { NotFound } from "./../pages/NotFound";
import { AccessDenied } from "./../pages/AccessDenied";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/products" element={<Products></Products>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/products/:productId"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        <Route path="/payment" element={<Payments />}></Route>
        <Route path="/orders" element={<Orders></Orders>}></Route>
        <Route path="/admin" element={<AdminLayout></AdminLayout>}>
          <Route index element={<AdminDashboard></AdminDashboard>}></Route>
          <Route
            path="products"
            element={<AdminProducts></AdminProducts>}
          ></Route>
          <Route path="orders" element={<AdminOrders></AdminOrders>}></Route>
          <Route path="users" element={<AdminUsers></AdminUsers>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </>
  );
};
