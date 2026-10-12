import "i18next";

import type vi from "./locales/vi.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: { translation: typeof vi };
  }
}
