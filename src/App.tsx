import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext.tsx";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Verify from "./pages/Verify.tsx";
import Post from "./pages/Post.tsx";
import ProctedRoute from "./pages/Authlayout.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/detail",
      element: (
        <ProctedRoute>
          <Detail />
        </ProctedRoute>
      ),
    },
    {
      path: "/verify/email",
      element: <Verify />,
    },
    {
      path: "/post",
      element: (
        <ProctedRoute>
          <Post />
        </ProctedRoute>
      ),
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
