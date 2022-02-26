import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./App";
import { RelayData } from "../common/types";

declare function getData(callback: (data: RelayData) => void): void;

getData((data) => {
  ReactDOM.render(
    <App {...data} />,
    document.getElementById("root")
  );
});
