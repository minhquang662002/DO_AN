import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { GlobalContextProvider } from "./components/context/GlobalContext";
import { PeerContextProvider } from "./components/context/PeerContext";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/app/store";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <GlobalContextProvider>
          <PeerContextProvider>
            <App />
          </PeerContextProvider>
        </GlobalContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);
