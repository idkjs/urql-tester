import React from "react";
import { render } from "react-dom";
import { Client, Provider } from "urql";

import Movies from "./movies";

/*
-------------
GraphQL Server Available Here:
https://launchpad.graphql.com/jvnqnnxpp
-------------
*/

require("./index.css");

const client = new Client({
  url: "https://jvnqnnxpp.lp.gql.zone/graphql"
});

const App = () => (
  <Provider client={client}>
    <Movies />
  </Provider>
);

render(<App />, document.getElementById("root"));
