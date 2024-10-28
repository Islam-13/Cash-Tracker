import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const queryClinet = new QueryClient();
  return (
    <QueryClientProvider client={queryClinet}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/data"
              element={
                <ProtectedRoutes>
                  <Suspense fallback={<Loader />}>
                    <Data />
                  </Suspense>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                </ProtectedRoutes>
              }
            />
          </Route>

          <Route
            path="signin"
            element={
              <ProtectedAuthRoutes>
                <Suspense fallback={<Loader />}>
                  <SignIn />
                </Suspense>
              </ProtectedAuthRoutes>
            }
          />
          <Route
            path="signup"
            element={
              <ProtectedAuthRoutes>
                <Suspense fallback={<Loader />}>
                  <Signup />
                </Suspense>
              </ProtectedAuthRoutes>
            }
          />
          <Route
            path="forget-password"
            element={
              <ProtectedAuthRoutes>
                <Suspense fallback={<Loader />}>
                  <ForgetPassword />
                </Suspense>
              </ProtectedAuthRoutes>
            }
          />
          <Route
            path="forget-password/update-password"
            element={
              <ProtectedAuthRoutes>
                <Suspense fallback={<Loader />}>
                  <UpdatePassword />
                </Suspense>
              </ProtectedAuthRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
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
