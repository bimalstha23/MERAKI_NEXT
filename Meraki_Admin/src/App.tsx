import "./App.css";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./Routes/public/PublicRoutes";
// import { privateRoutes } from "./Routes/private/PrivateRoutes";


function App() {
  


  const router = createBrowserRouter(publicRoutes);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
