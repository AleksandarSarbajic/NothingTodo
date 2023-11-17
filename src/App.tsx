import { RouterProvider, createBrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./UI/AppLayout";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AppLayout />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <MainPage />
          </>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
