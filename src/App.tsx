import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
} from "./pages";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import Login from "./pages/authentication/Login";
import Profile from "./pages/authentication/Profile";
import Signup from "./pages/authentication/Signup";
import UpdateProfile from "./pages/authentication/UpdateProfile";
import { Navbar, Sidebar, Footer } from "./components";
import { useUserContext } from "./context/user_context";

function App() {
  const { isAuthenticated } = useUserContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeRoute>
              <Home />
            </HomeRoute>
          }
        />
        <Route
          path="/about"
          element={
            <HomeRoute>
              <About />
            </HomeRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <HomeRoute>
              <Cart />
            </HomeRoute>
          }
        />
        <Route
          path="/products"
          element={
            <HomeRoute>
              <Products />
            </HomeRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <HomeRoute>
              <SingleProduct />
            </HomeRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <HomeRoute>
              <Checkout />
            </HomeRoute>
          }
        />
        <Route
          path="*"
          element={
            <HomeRoute>
              <Error />
            </HomeRoute>
          }
        />
        {/* Profile */}
        <Route
          path="/user"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-profile"
          element={
            isAuthenticated() ? <UpdateProfile /> : <Navigate to="/login" />
          }
        />
        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomeRoute({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
}
// function PrivateRoute({ children }: PropsWithChildren) {
//   const { isAuthenticated } = useUserContext();
//   return isAuthenticated() ? children : <Navigate to="/login" />;
// }

export default App;
