import { FC } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { MultiRootEditorViaHookExample } from "./pages/MultiRootEditorViaHookExample";
import { ClassicEditorExample } from "./pages/ClassicEditorExample";
import { MultiRootEditorViaManualInitializationExample } from "./pages/MultiRootEditorViaManualInitializationExample";
import { HomePage } from "./pages/HomePage";
import { routesConfiguration } from "./routesConfiguration";

const router = createBrowserRouter(
  [
    {
      path: routesConfiguration.index.path,
      element: <HomePage />,
    },
    {
      path: routesConfiguration.classic.path,
      element: <ClassicEditorExample />,
    },
    {
      path: routesConfiguration.multiRootViaHook.path,
      element: <MultiRootEditorViaHookExample />,
    },
    {
      path: routesConfiguration.multiRootViaManualInitialization.path,
      element: <MultiRootEditorViaManualInitializationExample />,
    },
  ],
  {
    basename: routesConfiguration.baseUrl,
  }
);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
