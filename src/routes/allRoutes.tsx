import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard";

//Authentication pages
import Login from "src/pages/Authentication/Login";
import Logout from "src/pages/Authentication/Logout";
import Register from "src/pages/Authentication/Register";
import ForgetPassword from "src/pages/Authentication/ForgetPassword";
import UserProfile from "src/pages/Authentication/user-profile";
import Settlements from "src/pages/Settlements";
import Orders from "src/pages/Orders";
import Returns from "src/pages/Returns";
import OrderDetail from "src/pages/Orders/OrderDetail";
import OrderHistory from "src/pages/Orders/OrderHistory";
import ReturnHistory from "src/pages/Returns/ReturnHistory";
import Greeting from "src/pages/Authentication/Greeting";
import useWindowWidth from "src/hooks/useWindowWidth";
import ReturnDetail from "src/pages/Returns/ReturnDetail";

interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const RedirectToHome = () => {
  const token = localStorage.getItem("agent_token");
  const width = useWindowWidth();
  console.log(width);

  if (width <= 680) {
    // On mobile, show the Greeting page
    return token ? <Navigate to="/dashboard" /> : <Greeting />;
  } else {
    // On desktop, directly navigate to /dashboard if authenticated
    return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
  }
};

const userRoutes: Array<RouteProps> = [
  //User Profile
  { path: "/profile", component: <UserProfile /> },

  //dashboard
  { path: "/dashboard", component: <Dashboard /> },

  //settlements
  { path: "/settlements", component: <Settlements /> },

  //orders
  { path: "/orders", component: <Orders /> },
  { path: "/orders/detail/:id", component: <OrderDetail /> },
  { path: "/order-history", component: <OrderHistory /> },

  //returns
  { path: "/returns", component: <Returns /> },
  { path: "/returns/detail/:id", component: <ReturnDetail /> },
  { path: "/return-history", component: <ReturnHistory /> },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <RedirectToHome /> },
];

const authRoutes: Array<RouteProps> = [
  //Authentication pages
  { path: "/login", component: <Login /> },
  { path: "/greeting", component: <Greeting /> },
  { path: "/logout", component: <Logout /> },
  { path: "/register", component: <Register /> },
  { path: "/recoverpw", component: <ForgetPassword /> },
];

export { userRoutes, authRoutes };
