/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import { Router } from "@solidjs/router";
import { HopeProvider } from "@hope-ui/solid";

render(
  () => (
    <Router>
      <HopeProvider>
        <App />
      </HopeProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
