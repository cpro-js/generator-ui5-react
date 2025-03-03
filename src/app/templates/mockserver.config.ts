import { resolve } from "path";

import { MockserverConfiguration } from "@sap-ux/fe-mockserver-core";
import FileSystemLoader from "@sap-ux/fe-mockserver-core/dist/plugins/fileSystemLoader";

// @ts-ignore
class CustomFileLoader extends FileSystemLoader.default {
  exists(filePath: string): Promise<boolean> {
    return super.exists(filePath.replace(/\.js$/i, ".cjs"));
  }

  loadJS(filePath: string) {
    return super.loadJS(filePath.replace(/\.js$/i, ".cjs"));
  }
}

export const createMockServerConfig = (env: Record<string, string>): MockserverConfiguration => ({
  // @ts-ignore
  fileLoader: CustomFileLoader,
  services: [
    {
      urlPath: env.APP_MAIN_SERVICE_PATH,
      metadataPath: resolve(__dirname, "src/localService/main-service.xml"),
      mockdataPath: resolve(__dirname, "src/localService/main-service"),
      watch: true,
    },
  ],
});
