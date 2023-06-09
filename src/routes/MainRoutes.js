import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminPage from "../pages/AdminPage";
import ProductsPage from "../pages/ProductsPage";
import { useSelector } from "react-redux";
import { ADMIN } from "../helpers/consts";
import ProductDetails from "../components/Products/ProductDetails";
import ContactPage from "../pages/ContactPage";
import AboutUs from "../components/AboutUs/AboutUs";

const MainRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  const PUBLIC_ROUTES = [
    { link: "/", element: <HomePage />, id: 1 },
    { link: "/login", element: <LoginPage />, id: 2 },
    { link: "/register", element: <RegisterPage />, id: 3 },
    { link: "/products", element: <ProductsPage />, id: 4 },
    { link: "/details/:id", element: <ProductDetails />, id: 5 },
    { link: "/contact", element: <ContactPage />, id: 6 },
    { link: "/aboutus", element: <AboutUs />, id: 7 },

    { link: "*", element: <NotFoundPage />, id: 8 },
  ];

  const PRIVATE_ROUTES = [{ link: "/admin", element: <AdminPage />, id: 1 }];

  return (
    <>
      <Routes>
        {PUBLIC_ROUTES.map((item) => (
          <Route path={item.link} element={item.element} key={item.id} />
        ))}
        {user &&
          PRIVATE_ROUTES.map((item) => (
            <Route
              path={item.link}
              key={item.id}
              element={
                user === ADMIN ? item.element : <Navigate replace to="*" />
              }
            />
          ))}
      </Routes>
    </>
  );
};

export default MainRoutes;
