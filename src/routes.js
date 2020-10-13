import React from "react";
import { Redirect, NotFound} from "react-router-dom";

// Layout Types
import DashboardtLayout from "./components/dashboard_layout";

// Route Views
import ComponentsOverview from "./components/pages/components-overview/ComponentsOverview";
import BookManagement from "./components/pages/book-management/BookManagement";

import PublicLayout from "./components/public_layout";
import EmptyLayout from "./components/empty_layout";
import Login from "./components/pages/auth/Login";
import Logout from "./components/pages/auth/Logout";

import Error404 from "./components/pages/errors/Error404"

export default [
  {
    path: "/",
    exact: true,
    layout: DashboardtLayout,
    component: () => <Redirect to="/overview" />
  },
  {
    path: "/login",
    isAuth: false,
    layout: PublicLayout,
    component: Login
  },
  {
    path: "/logout",
    isAuth: false,
    layout: EmptyLayout,
    component: Logout
  },
  {
    path: "/book-management",
    layout: DashboardtLayout,
    component: BookManagement
  },
  {
    path: "/components-overview",
    layout: DashboardtLayout,
    component: ComponentsOverview
  },
  {
    path: "/not-found",
    layout: DashboardtLayout,
    component: Error404
  },
];
