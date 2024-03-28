import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/home/Home";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import ProtectedAuthRoutes from "./ui/ProtectedAuthRoutes";
import Loader from "./ui/Loader";

const Data = lazy(() => import("./pages/data/Data"));
const SignIn = lazy(() => import("./pages/signin/SignIn"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const UpdatePassword = lazy(
  () => import("./pages/forgetPassword/UpdatePassword"),
);
const ForgetPassword = lazy(
  () => import("./pages/forgetPassword/ForgetPassword"),
);

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "signup",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "signin",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "forget-password",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <ForgetPassword />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "forget-password/update-password",
        element: (
          <ProtectedAuthRoutes>
            <Suspense fallback={<Loader />}>
              <UpdatePassword />
            </Suspense>
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/data",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Data />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  const queryClinet = new QueryClient();
  return (
    <QueryClientProvider client={queryClinet}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        gutter={10}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
