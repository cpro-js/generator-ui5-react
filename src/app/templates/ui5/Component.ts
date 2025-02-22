import type MessageBox from "sap/m/MessageBox";
import type UI5Event from "sap/ui/base/Event";
import type { $UIComponentSettings } from "sap/ui/core/UIComponent";
import type { RenderOptions } from "virtual:@cpro-js/vite-ui5-integration-plugin/runtime";

import Core from "sap/ui/core/Core";
import EventBus from "sap/ui/core/EventBus";
import RenderManager from "sap/ui/core/RenderManager";
import HashChanger from "sap/ui/core/routing/HashChanger";
import UIComponent from "sap/ui/core/UIComponent";
import Device from "sap/ui/Device";
import { render } from "virtual:@cpro-js/vite-ui5-integration-plugin/runtime";

/**
 * @namespace <%= appId %>
 */
export default class Component extends UIComponent {
  private readonly eventBus: EventBus;
  private readonly scriptPromise: Promise<void>;
  private readonly appElementId: string;
  private destroyed: boolean = false;
  private unmountApp?: () => void;

  public static metadata = {
    manifest: "json",
  };

  /**
   * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
   */
  constructor(id?: string | $UIComponentSettings);
  constructor(id?: string, settings?: $UIComponentSettings);
  constructor(id?: string, settings?: $UIComponentSettings) {
    super(id, settings);

    this.eventBus = new EventBus();
    // load custom App code
    this.scriptPromise = this._loadScriptModule(this.resolveUri("/main.tsx"));
    this.appElementId = this.createId("custom-app");

    Core.attachThemeChanged(this._onThemeChanged, this);
    Core.attachLocalizationChanged(this._onLocalizationChanged, this);

    // set content density class for standalone apps only, launchpad set this already based on the manifest
    if (!this.isLaunchpad()) {
      const densityClass = this._getContentDensityClass();
      if (densityClass != null) {
        document.body.classList.remove("sapUiSizeCozy", "sapUiSizeCompact");
        document.body.classList.add(densityClass);
      }
    }
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  render(oRenderManager: RenderManager) {
    oRenderManager.openStart("div");
    oRenderManager.attr("id", this.appElementId);
    oRenderManager.attr("style", "height: 100%;");
    oRenderManager.openEnd();
    oRenderManager.close("div");
  }

  async onAfterRendering() {
    super.onAfterRendering();

    try {
      await this.scriptPromise;
      if (this.isDestroyed()) {
        // already destroyed while loading application --> no further actions necessary
        return;
      }

      const el = document.getElementById(this.appElementId) as HTMLElement;
      // // set text direction for web components
      const rtl = Core.getConfiguration().getRTL();
      el.dir = rtl ? "rtl" : "ltr";

      this.unmountApp = await render(el, this.getRenderOptions());
      if (this.isDestroyed()) {
        // initialization took too long --> unmount app
        this.unmountApp();
      }
    } catch (e: Error | unknown) {
      console.error(e);
      // lazy load to speed up initial page load
      sap.ui.require(["sap/m/MessageBox"], function (MsgBox: MessageBox) {
        MsgBox.error("message" in (e as Error) ? (e as Error).message : "Failed to load app");
      });
      return;
    }
  }

  public destroy() {
    this.unmountApp?.();
    this.eventBus.destroy();
    Core.detachThemeChanged(this._onThemeChanged, this);
    Core.detachLocalizationChanged(this._onLocalizationChanged, this);

    super.destroy();

    this.destroyed = true;
  }

  public getRenderOptions(): RenderOptions {
    return {
      component: this,
    };
  }

  public isLaunchpad(): boolean {
    return sap.ushell != null;
  }

  public getNavigationContext(): { semanticObject?: string; action?: string } {
    return this._parseShellHash(new HashChanger().getHash());
  }

  /**
   * Gets the parameters that were passed during initialization as startup parameters
   */
  public getStartupParameters(): Record<string, Array<string>> {
    const componentData: { startupParameters?: Record<string, Array<string>> } = this.getComponentData?.() ?? {};
    return componentData.startupParameters ?? {};
  }

  public async setRelatedApps(
    relatedApps: Array<{
      title: string;
      subtitle?: string;
      icon?: string;
      intent: string;
    }>
  ): Promise<void> {
    const service: sap.ushell.ui5service.ShellUIService = await this.getService("ShellUIService");
    service.setRelatedApps(relatedApps);
  }

  /**
   * Displays the given title in the shell header. This method should not be called if the app calling the
   * method is not currently displayed in the Fiori Launchpad.
   *
   * @param title
   */
  public async setShellTitle(title: string): Promise<void> {
    if (!this.isLaunchpad()) {
      return;
    }

    const service: sap.ushell.ui5service.ShellUIService = await this.getService("ShellUIService");
    service.setTitle(title);
  }

  public async setBackNavigation(cb: () => void): Promise<void> {
    if (!this.isLaunchpad()) {
      return;
    }
    type EnhancedShellService = sap.ushell.ui5service.ShellUIService & {
      setBackNavigation: (cb: () => void) => void;
    };

    const service: EnhancedShellService = await this.getService("ShellUIService");
    service.setBackNavigation(function () {
      cb();
    });
  }

  /**
   * Get the current locale
   * BCP-47 language list, e.g. de-DE, en-US, en
   */
  public getLocale(): string {
    const locale = Core.getConfiguration().getLanguage();
    return locale
      .split(/[_\-]/gi)
      .map((s, index) => (index === 0 ? s.toLowerCase() : s.toUpperCase()))
      .join("-");
  }

  /**
   * Get the current theme, e.g. sap_fiori_3
   */
  public getTheme(): string {
    return Core.getConfiguration().getTheme();
  }

  subscribeToThemeChanges(cb: (theme: string) => void) {
    this.eventBus.subscribe("onLocaleChanged", function (_channel, _eventId, data) {
      cb((data as { locale: string }).locale);
    });
  }

  /**
   * Get current animation mode, e.g. basic, full, minimal or none
   */
  public getAnimationMode(): "basic" | "full" | "minimal" | "none" {
    // @ts-ignore: incorrect typing & missing export of type ...
    return Core.getConfiguration().getAnimationMode();
  }

  /**
   * Pass the relative path of your AJAX call and get a fully qualified URL back which works in all environments (local development, standalone, launchpad, etc.).
   */
  public resolveUri(uri: string): string {
    return this.getManifestObject().resolveUri(uri);
  }

  /**
   * Gets the current content density class either "sapUiSizeCozy", " sapUiSizeCompact".
   * Note: Launchpad sets this classes automatically based on the manifest while standalone apps require manual configuration.
   *
   * @public
   * @return {string, undefined} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' or undefined if none found
   */
  public getCurrentContentDensityClass(): string | undefined {
    if (document.body.classList.contains("sapUiSizeCozy")) {
      return "sapUiSizeCozy";
    } else if (document.body.classList.contains("sapUiSizeCompact")) {
      return "sapUiSizeCompact";
    }
    return undefined;
  }

  /**
   * Gets the content density class to set on document.body or undefined if no action is required
   *
   * @return {string, undefined} - content density class to set or undefined if no action necessary
   */
  private _getContentDensityClass(): "sapUiSizeCozy" | "sapUiSizeCompact" | undefined {
    const bCozySupported = !!this.getManifestEntry("/sap.ui5/contentDensities/cozy");
    const bCompactSupported = !!this.getManifestEntry("/sap.ui5/contentDensities/compact");

    if (!bCozySupported && !bCompactSupported) {
      // not supported use default
      return;
    }

    const currentClass = this.getCurrentContentDensityClass();
    if (
      (currentClass === "sapUiSizeCozy" && bCozySupported) ||
      (currentClass === "sapUiSizeCompact" && bCompactSupported)
    ) {
      // class already set, do nothing
      return;
    } else if (bCompactSupported && !Device.support.touch) {
      return "sapUiSizeCompact";
    } else if (bCozySupported) {
      return "sapUiSizeCozy";
    }
    // nothing found
    return;
  }

  private _onThemeChanged(event: UI5Event<{ theme: string }>) {
    this.eventBus.publish("onThemeChanged", {
      theme: event.getParameter("theme"),
    });
  }

  private _onLocalizationChanged(event: UI5Event<{ changes: { language?: string } }>) {
    const { language } = event.getParameter("changes");
    if (language != null) {
      this.eventBus.publish("onLocaleChanged", {
        locale: language,
      });
    }
  }

  private _parseShellHash(sHash: string): { semanticObject?: string; action?: string } {
    const SPLIT_SHELL_APP_HASH = /^(?:#|)([\S\s]*?)(&\/[\S\s]*)?$/;
    const EXTRACT_SHELL_HASH = /^(([A-Za-z0-9_/]+)-([A-Za-z0-9_/-]+)(~([A-Z0-9a-z=+/]+))?)?([?]([^&]|(&[^/]))*&?)?$/;
    const splitResult = SPLIT_SHELL_APP_HASH.exec(sHash);

    if (splitResult == null || splitResult[1] === "" || !EXTRACT_SHELL_HASH.test(splitResult[1])) {
      return {
        semanticObject: undefined,
        action: undefined,
      };
    }

    const extractResult = EXTRACT_SHELL_HASH.exec(splitResult[1]);

    return {
      semanticObject: extractResult?.[2],
      action: extractResult?.[3],
    };
  }

  private _loadScriptModule(srcUrl: string): Promise<void> {
    const appId = this.getManifestEntry("/sap.app/id") as string;
    return new Promise((resolve, reject) => {
      const head = document.head || document.getElementsByTagName("head")[0];
      const allScripts = [...head.getElementsByTagName("script")];
      let script = document.createElement("script");
      script.setAttribute("data-app", appId);
      script.type = "module";
      script.src = srcUrl;
      if (allScripts.some((s) => s.src === script.src)) {
        // script was loaded earlier, let's assume it's loaded successfully
        return resolve();
      }

      script.onload = function () {
        this.onerror = this.onload = null;
        resolve();
      };
      script.onerror = function () {
        this.onerror = this.onload = null;
        reject(new Error("Failed to load " + this.src));
      };

      head.appendChild(script);
    });
  }
}
