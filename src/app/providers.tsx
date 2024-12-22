"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { fallback, http, unstable_connector } from "wagmi";
import {
  arbitrum,
  base,
  celo,
  optimism,
  mainnet,
  bsc,
  polygon,
  avalanche,
  scroll,
  linea,
  mantle,
  blast,
  immutableZkEvm,
  fraxtal,
  moonbeam,
  fantom,
  filecoin,
  kava,
} from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { SquidRouterProvider } from "../components/SquidRouterProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const wagmiConfig = createConfig({
    chains: [
      optimism,
      base,
      celo,
      arbitrum,
      mainnet,
      bsc,
      polygon,
      avalanche,
      linea,
      scroll,
      mantle,
      blast,
      immutableZkEvm,
      fraxtal,
      moonbeam,
      fantom,
      filecoin,
      kava,
    ],
    transports: {
      [optimism.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [arbitrum.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [celo.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [base.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [mainnet.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [bsc.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [polygon.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [avalanche.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [linea.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [scroll.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [mantle.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [blast.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [immutableZkEvm.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [fraxtal.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [moonbeam.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [fantom.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [filecoin.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
      [kava.id]: fallback([
        unstable_connector(injected),
        unstable_connector(walletConnect),
        http(),
      ]),
    },
  });
  return (
    <PrivyProvider
      appId="cm4qzfzmc02fltw2fjx7n4201"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#AF3BC9",
          logo: "/android-chrome-512x512.png",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: "all",
          },
        },
        supportedChains: [
          optimism,
          base,
          celo,
          arbitrum,
          mainnet,
          bsc,
          polygon,
          avalanche,
          linea,
          scroll,
          mantle,
          blast,
          immutableZkEvm,
          fraxtal,
          moonbeam,
          fantom,
          filecoin,
          kava,
        ],
      }}
    >
      <SmartWalletsProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
            <SquidRouterProvider>{children}</SquidRouterProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </SmartWalletsProvider>
    </PrivyProvider>
  );
}
