import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext.tsx";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Verify from "./pages/Verify.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/detail",
      element: <Detail />,
    },
    {
      path: "/verify/email",
      element: <Verify />,
    },
  ]);
  return (
    <AuthProvider>  
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
