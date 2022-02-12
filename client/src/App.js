import React from "react";
import { Router, Switch as Routes, Route } from "react-router-dom";
import history from "./history";

import Meniu from "./components/Meniu";
import Tabel from "./components/Tabel";
import Article from "./components/Article";
import Formular from "./components/Formular";
import Reference from "./components/Reference";

import "./App.scss";

const App = () => {
  return (
    <>
      <Router history={history}>
        <Routes>
          <Route exact path="/">
            <Meniu />
          </Route>
          <Route exact path="/articles">
            <Tabel type="articles" />
          </Route>
          <Route exact path="/articles/:id">
            <Article />
          </Route>
          <Route path="/articles/form">
            <Formular type="articles" />
          </Route>
          <Route exact path="/references">
            <Tabel type="references" />
          </Route>
          <Route exact path="/references/:id">
            <Reference />
          </Route>
          <Route path="/references/form">
            <Formular type="references" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
