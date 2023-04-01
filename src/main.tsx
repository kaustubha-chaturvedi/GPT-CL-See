import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import {
  arbitrum,
  arbitrumGoerli,
  polygon,
  polygonMumbai,
  optimism,
  optimismGoerli,
} from "wagmi/chains";

const defaultL2Chains = [
  arbitrum,
  arbitrumGoerli,
  polygon,
  polygonMumbai,
  optimism,
  optimismGoerli,
];

import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import "./index.css";

const { provider, webSocketProvider } = configureChains(defaultL2Chains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </BrowserRouter>
);
