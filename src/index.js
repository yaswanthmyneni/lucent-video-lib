import {
  HistoryProvider,
  VideoListingProvider,
  WatchLaterProvider,
} from "context";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HistoryProvider>
        <WatchLaterProvider>
          <VideoListingProvider>
            <App />
          </VideoListingProvider>
        </WatchLaterProvider>
      </HistoryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
