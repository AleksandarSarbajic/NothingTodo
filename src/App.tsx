import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./UI/AppLayout";
import MainPage from "./pages/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./UI/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUpPage";
import TaskListPage from "./pages/TaskListPage";
import TaskPage from "./pages/TaskPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import AllPage from "./pages/AllPage";
import CompletedPage from "./pages/CompletedPage";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import EnterEmailPage from "./pages/EnterEmailPage";
import ResetPassowordPage from "./pages/ResetPassowordPage";
import ErrorFallback from "./UI/ErrorFallback";
import { DarkModeProvider } from "./context/DarkModeContext";
import AnalyticsPage from "./pages/AnalyticsPage";
import CompletedDatePage from "./pages/CompletedDatePage";

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
        element: <SettingsPage />,
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
        element: <AnalyticsPage />,
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
    element: <ResetPassowordPage />,
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
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
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
      </DarkModeProvider>
    </>
  );
}

export default App;
