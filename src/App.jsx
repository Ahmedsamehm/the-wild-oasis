import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DashBoard from "./Pages/DashBoard";
import LayOut from "./UI/LayOut";
import Cabins from "./Pages/Cabins";
import Bookings from "./Pages/bookings";
import Login from "./Pages/Login";
import Users from "./Pages/Users";
import Setting from "./Pages/Setting";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import CheckIn from "./Pages/CheckIn";
import BookingDetails from "./Pages/BookingDetails";

import ProtectedLayout from "./UI/ProtectedLayout";


const queryClient = new QueryClient();
function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedLayout>
          <LayOut />
        </ProtectedLayout>
      ),
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "Cabins",
          element: <Cabins />,
        },
        {
          path: "Booking",
          element: <Bookings />,
        },
        {
          path: "Users",
          element: <Users />,
        },

        {
          path: "Setting",
          element: <Setting />,
        },

        {
          path: `BookingDetails/:idBooking`,
          element: <BookingDetails />,
        },
        {
          path: `CheckIn/:idBooking`,
          element: <CheckIn />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <RouterProvider router={Router} />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
