import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "./context/DarkModeContext";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./UI/AppLayout";

import MainPage from "./pages/MainPage";

import ProtectedRoute from "./UI/ProtectedRoute";
import TaskListPage from "./pages/TaskListPage";
import TaskPage from "./pages/TaskPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));

const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const Settings = lazy(() => import("./pages/SettingsPage"));
const Analytics = lazy(() => import("./pages/AnalyticsPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassowordPage"));
const EnterEmailPage = lazy(() => import("./pages/EnterEmailPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const AllPage = lazy(() => import("./pages/AllPage"));
const CompletedPage = lazy(() => import("./pages/CompletedPage"));

import CategoryPage from "./pages/CategoryPage";
import ErrorFallback from "./UI/ErrorFallback";
import CompletedDatePage from "./pages/CompletedDatePage";
import SpinnerFullPage from "./UI/SpinnerFullPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <Navigate replace to={"/dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <MainPage />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/allTasks",
        element: <AllPage />,
      },
      {
        path: "/completed",
        element: <CompletedPage />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/analytics/:day",
        id: "day",
        element: <CompletedDatePage />,
      },
      {
        path: "/analytics/:day/createEditTask",
        id: "tasks",
        element: <TaskPage />,
      },
      {
        path: "/:list",
        id: "list",
        element: <TaskListPage />,
      },
      {
        path: "/:list/createEditTask",
        id: "task",
        element: <TaskPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "/enterEmail",
    element: <EnterEmailPage />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "/resetPassword",
    element: <ResetPasswordPage />,
    errorElement: <ErrorFallback />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorFallback />,
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <DarkModeProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontFamily: "NotoSans, sans-serif",
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "#1E2022ff",
                  color: "#c1c2c3",
                },
              }}
            />
          </QueryClientProvider>
        </Suspense>
      </DarkModeProvider>
    </>
  );
}

export default App;
