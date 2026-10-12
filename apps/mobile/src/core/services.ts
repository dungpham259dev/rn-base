import {
  createApiClient,
  createQueryClient,
  createServices,
} from "@rnbase/api";
import {
  configureStorage,
  getAccessToken,
  useSessionStore,
} from "@rnbase/store";

import { env } from "./env";
import { secureStorage } from "./storage";

void configureStorage(secureStorage);

export const queryClient = createQueryClient();

export const services = createServices(
  createApiClient({
    baseUrl: env.apiUrl,
    getToken: getAccessToken,
    onUnauthorized: () => {
      useSessionStore.getState().signOut();
      queryClient.clear();
    },
  }),
);
