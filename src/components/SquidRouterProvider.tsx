import React, { createContext, useContext, useEffect, useState } from "react";
import { Squid } from "@0xsquid/sdk";

const SquidRouterContext = createContext<Squid | null>(null);

export const SquidRouterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sdk, setSdk] = useState<Squid>();

  useEffect(() => {
    const initializeSdk = async () => {
      const instance = new Squid({
        baseUrl: "https://apiplus.squidrouter.com",
        integratorId: process.env.NEXT_PUBLIC_SQUID_INTEGRATORID as string,
      });
      await instance.init();
      console.log("Initialized Squid SDK");
      setSdk(instance);
    };
    initializeSdk();
  }, []);

  return (
    <SquidRouterContext.Provider value={sdk as Squid}>
      {children}
    </SquidRouterContext.Provider>
  );
};

export const useSquidRouter = () => {
  const context = useContext(SquidRouterContext);
  return context;
};
