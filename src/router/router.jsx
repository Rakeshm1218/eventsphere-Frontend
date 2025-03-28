import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Events from "../pages/Events";
import LoginPage from "../pages/LoginPage";
import EventDetail from "../pages/EventDetail";
import About from "../pages/About";
import ManageUsers from "../admin/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/events/:eventId",
        element: <EventDetail />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(
              `http://localhost:8080/events/${params.eventId}`
            );
            if (!response.ok) throw new Error("Event not found");
            return response.json();
          } catch (error) {
            console.error("Error fetching event:", error);
            throw error;
          }
        },
      },
      {
        path:"/manage-users",
        element: <ManageUsers />,
      }
    ],
  },
]);

export default router;
