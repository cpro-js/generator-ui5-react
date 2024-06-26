import { I18nService } from "@cpro-js/react-core";
import { FetchClient } from "@odata2ts/http-client-fetch";
import { MainODataService } from "../../src-generated/odata-service/MainODataService";

/**
 * CONFIG: Path to the main OData service
 */
const MAIN_SERVICE_PATH = "<%= odataServicePath %>";

/**
 * Helper function to bundle logic around creating the OData client
 * @param i18nService
 */
export function createODataClient(i18nService: I18nService) {
  // initialize ODataService
  const odataClient = new FetchClient(
    {
      headers: {
        // Needed to override language from browser by default.
        // Also needed for some requests to look up language specific data.
        "Accept-Language": i18nService.getTranslationLocale(),
      },
    },
    // enable automatic CSRF protection handling
    {
      useCsrfProtection: true,
      csrfTokenFetchUrl: MAIN_SERVICE_PATH + "/",
    }
  );

  return new MainODataService(odataClient, MAIN_SERVICE_PATH);
}
