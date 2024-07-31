import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import ChatPage from "./pages/chatPage/ChatPage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/home/Home.jsx";
import SignInPage from "./pages/signin/SignInPage.jsx";
import SignUpPage from "./pages/signup/SignUpPage.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chat/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
  </ClerkProvider>
  // </React.StrictMode>
);
