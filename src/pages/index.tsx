import { createBrowserRouter } from "react-router";
import ProblemPage from "./problem";
import NotFoundPage from "./notFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProblemPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
