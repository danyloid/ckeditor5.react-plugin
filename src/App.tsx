import { FC } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { MultiRootEditorViaHookExample } from "./pages/MultiRootEditorViaHookExample";
import { ClassicEditorExample } from "./pages/ClassicEditorExample";
import { MultiRootEditorViaManualInitializationExample } from "./pages/MultiRootEditorViaManualInitializationExample";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/classic",
    element: <ClassicEditorExample />,
  },
  {
    path: "/multi-root-via-hook",
    element: <MultiRootEditorViaHookExample />,
  },
  {
    path: "/multi-root-via-manual-initialization",
    element: <MultiRootEditorViaManualInitializationExample />,
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
