import type { ReactNode } from "react";
import { createContext, use } from "react";

import type { Services } from "./services";

const ServicesContext = createContext<Services | null>(null);

export function ApiProvider(props: {
  services: Services;
  children: ReactNode;
}) {
  return (
    <ServicesContext value={props.services}>{props.children}</ServicesContext>
  );
}

export const useServices = (): Services => {
  const services = use(ServicesContext);
  if (!services) throw new Error("useServices must be used within ApiProvider");
  return services;
};
