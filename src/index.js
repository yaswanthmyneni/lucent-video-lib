import {
  HistoryProvider,
  PlaylistProvider,
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
      <PlaylistProvider>
        <HistoryProvider>
          <WatchLaterProvider>
            <VideoListingProvider>
              <App />
            </VideoListingProvider>
          </WatchLaterProvider>
        </HistoryProvider>
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
