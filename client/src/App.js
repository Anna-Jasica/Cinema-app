import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Reservation from "./components/Reservation";

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100%" }} className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/reservation" component={Reservation} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
