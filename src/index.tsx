import { render } from "react-dom";

import "show-keys";
import App from "./App";

window.SHOW_KEYS_SKIP_INPUTS = true;

const rootElement = document.getElementById("root");
render(<App />, rootElement);
