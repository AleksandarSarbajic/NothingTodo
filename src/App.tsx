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
      <>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <Navigate replace to={"/dashboard"} />
          </>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <>
            <MainPage />
          </>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
