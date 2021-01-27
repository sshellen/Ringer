import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

const routes = (
  <BrowserRouter basename={"/ringer"}>
    <Switch>
      <Route path="/" component={App} default />
      <Route path="/app" component={App} />
    </Switch>
  </BrowserRouter>
);

export default routes;
