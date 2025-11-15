import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { HomePage } from "./components/publicHomepage/HomePage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Layout from "./routes/Layout";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./routes/protectedRoutes";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

export const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success/:orderId" element={<OrderSuccess />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
