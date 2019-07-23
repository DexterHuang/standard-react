import * as React from "react";
import { render } from "react-dom";
import { View } from "./StandardComponents/View/View";
import "./global.css";

function App() {
  return (
    <View>
      <View>hellow world</View>
    </View>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
