import { FC } from "react";

import "./HomePage.scss";

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <iframe
        src="/classic"
        title="Classic Editor Example"
        className="home-page__example-iframe"
      />
      <iframe
        src="/multi-root-via-hook"
        title="Multi Root Editor Via Hook Example"
        className="home-page__example-iframe"
      />
      <iframe
        src="/multi-root-via-manual-initialization"
        title="Multi Root Editor Via Manual Initialization Example"
        className="home-page__example-iframe"
      />
    </div>
  );
};
