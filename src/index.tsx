/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import { HopeProvider } from "@hope-ui/solid";
import { GlobalStyles } from "@app/components/styled/GlobalStyles";

render(
  () => (
    <Router>
      <HopeProvider>
        <GlobalStyles />
        <App />
      </HopeProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
