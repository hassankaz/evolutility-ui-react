import React, { useEffect } from "react";
import DemosList from "../../components/views/comfort/ModelLinks";

import "./Demos.scss";

const Demos = () => {
  useEffect(() => {
    document.title = "Evolutility Demos";
    window.scrollTo(0, 0);
  });

  return (
    <div className="evo-demos">
      <h1>Evolutility Demos</h1>

      <p>These are a few sample apps built with Evolutility.</p>

      <DemosList />

      <p>
        <br />
        These sample applications are not anything you haven't seen before. The
        interesting thing is that{" "}
        <b>these demo apps are built with models rather than code</b>... and you
        can easily make more apps simply by making new{" "}
        <a
          className="extlink"
          href="https://github.com/evoluteur/evolutility-models#evolutility-models--"
          target="models"
          rel="noopener noreferrer"
        >
          models
        </a>
        .
      </p>

      <p>
        These demos uses the{" "}
        <a
          href="https://graphql.org/"
          target="gql"
          rel="noopener noreferrer"
          className="extlink"
        >
          GraphQL APIs
        </a>
        {" of "}
        <a
          href="https://hasura.io"
          target="ha"
          rel="noopener noreferrer"
          className="extlink"
        >
          Hasura
        </a>{" "}
        on{" "}
        <a
          href="https://heroku.com/"
          target="he"
          rel="noopener noreferrer"
          className="extlink"
        >
          Heroku
        </a>
        .
      </p>
    </div>
  );
};

export default Demos;
