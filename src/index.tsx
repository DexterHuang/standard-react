import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AppLayout } from "./StandardComponents/AppLayout/AppLayout";
import "./global.css";

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
