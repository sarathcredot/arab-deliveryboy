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


interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const userRoutes: Array<RouteProps> = [
  //User Profile
  { path: "/profile", component: <UserProfile /> },

  //dashboard
  { path: "/dashboard", component: <Dashboard /> },

  //settlements
  { path: "/settlements", component: <Settlements /> },

  //orders
  { path: "/orders", component: <Orders /> },
  { path: "/orders/detail/", component: <OrderDetail /> },

  //returns
  { path: "/returns", component: <Returns /> },


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const authRoutes: Array<RouteProps> = [
  //Authentication pages
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/register", component: <Register /> },
  { path: "/recoverpw", component: <ForgetPassword /> },

];

export { userRoutes, authRoutes };
