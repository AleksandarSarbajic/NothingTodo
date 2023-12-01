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
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
