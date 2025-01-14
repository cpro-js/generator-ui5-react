import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets";

import { I18nService } from "@cpro-js/react-core";
import { Container, ContainerProvider, ObservablePromise, fromPromise, observer } from "@cpro-js/react-core";
import { NotificationRenderer } from "@cpro-js/react-ui5-notification";
import { NumberContextProvider } from "@cpro-js/react-ui5-webcomponents-form";
import {
  BusyIndicator,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  ThemeProvider,
} from "@ui5/webcomponents-react";
import React, { Component } from "react";
import ModalContainer from "react-modal-promise";

import { createContainer } from "../config/di.config";
import { AppRouter } from "./AppRouter";
import { Connection } from "../component/Connection";

export interface AppProps {
  resolveUri: (path: string) => string;
  locale?: string;
}

@observer
export class App extends Component<AppProps> {
  private readonly container: ObservablePromise<Container>;

  constructor(props: AppProps) {
    super(props);
    const { resolveUri, locale } = this.props;
    this.container = fromPromise(createContainer({ resolveUri, locale }));
  }

  render() {
    return this.container.case({
      pending: () => (
        <ThemeProvider>
          <FlexBox fitContainer alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.Center}>
            <BusyIndicator active />
          </FlexBox>
        </ThemeProvider>
      ),
      fulfilled: (container: Container) => {
        const { getFormattingLocale } = container.get(I18nService);

        return (
          <ThemeProvider>
            <ContainerProvider container={container}>
              <NumberContextProvider locale={getFormattingLocale()}>
                <AppRouter />
                <Connection />
                <NotificationRenderer />
                <ModalContainer />
              </NumberContextProvider>
            </ContainerProvider>
          </ThemeProvider>
        );
      },
      rejected: (error: Error) => (
        <div>
          Error {error.message} {error.stack}
        </div>
      ),
    });
  }
}
