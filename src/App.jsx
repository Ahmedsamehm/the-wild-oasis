import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import LayOut from "./UI/LayOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./UI/ProtectedLayout";
import Loading from "./UI/Loading";

// Lazy-loaded components
const DashBoard = lazy(() => import("./Pages/DashBoard"));
const Cabins = lazy(() => import("./Pages/Cabins"));
const Bookings = lazy(() => import("./Pages/bookings"));
const Login = lazy(() => import("./Pages/Login"));
const Users = lazy(() => import("./Pages/Users"));
const Setting = lazy(() => import("./Pages/Setting"));
const CheckIn = lazy(() => import("./Pages/CheckIn"));
const BookingDetails = lazy(() => import("./Pages/BookingDetails"));

const queryClient = new QueryClient();
function App() {
  const Router = createHashRouter([
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
          element: (
            <Suspense fallback={<Loading />}>
              <DashBoard />
            </Suspense>
          ),
        },
        {
          path: "Cabins",
          element: (
            <Suspense fallback={<Loading />}>
              <Cabins />
            </Suspense>
          ),
        },
        {
          path: "Booking",
          element: (
            <Suspense fallback={<Loading />}>
              <Bookings />
            </Suspense>
          ),
        },
        {
          path: "Users",
          element: (
            <Suspense fallback={<Loading />}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "Setting",
          element: (
            <Suspense fallback={<Loading />}>
              <Setting />
            </Suspense>
          ),
        },
        {
          path: `BookingDetails/:idBooking`,
          element: (
            <Suspense fallback={<Loading />}>
              <BookingDetails />
            </Suspense>
          ),
        },
        {
          path: `CheckIn/:idBooking`,
          element: (
            <Suspense fallback={<Loading />}>
              <CheckIn />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "login",
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
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
