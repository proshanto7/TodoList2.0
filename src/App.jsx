import Home from "./pages/Home";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SingUp from "./accounts/SingUp";
import SingIn from "./accounts/SingIn";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/singin",
      element: <SingIn/>,
    },
    {
      path: "/singup",
      element: <SingUp />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
