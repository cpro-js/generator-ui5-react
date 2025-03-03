/// <reference types="vitest" />
import { createCommonConfig } from "@cpro-js/vite-ui5-common-config";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { createMockServerConfig } from "./mockserver.config";
import manifest from "./ui5/manifest.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // load server settings via env vars, also .local , but don't reassign process.env to allow server reload (see https://github.com/vitejs/vite/issues/17689)
  // .env files for vite's app-build/runtime are loaded separately by vite for prefix APP_
  const env = { ...process.env, ...loadEnv(mode, __dirname, "") };

  const proxyConfig = {
    url: env.BASE_URL + env.PROXY_PATH,
    username: env.SAP_USERNAME,
    password: env.SAP_PASSWORD,
    queryParams: {
      "sap-client": env.SAP_CLIENT,
    },
  };

  // infos from manifest
  const appId = manifest["sap.app"].id;
  const ui5Version = manifest["sap.ui5"]?.dependencies?.minUI5Version ?? "";

  return mergeConfig(
    createCommonConfig({
      appId,
      ui5Version,
      mockServerConfig: mode === "mock" ? createMockServerConfig(env) : undefined,
      proxy: proxyConfig,
    }),
    {
      envPrefix: "APP_",
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern-compiler",
            quietDeps: true,
          },
        },
      },
      test: {
        // see https://vitest.dev/config/#configuration
      },
    }
  );
});
