"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { fallback, http, unstable_connector } from "wagmi";
import { arbitrum, base, celo, optimism } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const wagmiConfig = createConfig({
    chains: [optimism, base, celo, arbitrum],
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
          logo: "https://ipfs.io/ipfs/bafkreiapytg233qo5srpcz3albobjtu2egdqqrq57tbmo4hlkfw6sxmuli",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
