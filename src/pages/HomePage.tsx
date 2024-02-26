import { FC } from "react";

import "./HomePage.scss";
import { routesConfiguration } from "../routesConfiguration";

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <iframe
        src={routesConfiguration.classic.relativeUrl}
        title="Classic Editor Example"
        className="home-page__example-iframe"
      />
      <iframe
        src={routesConfiguration.multiRootViaHook.relativeUrl}
        title="Multi Root Editor Via Hook Example"
        className="home-page__example-iframe"
      />
      <iframe
        src={routesConfiguration.multiRootViaManualInitialization.relativeUrl}
        title="Multi Root Editor Via Manual Initialization Example"
        className="home-page__example-iframe"
      />
    </div>
  );
};
