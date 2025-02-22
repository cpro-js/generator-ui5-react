# <%= appTitle %>

## Getting Started

This app is based on React.js and uses Vite as build tool.
It has been scaffolded by Yeoman and [generator-ui5-react](https://www.npmjs.com/package/generator-ui5-react).

If you've freshly generated this app, then follow the instructions to [Setup the OData Service](#setup-odata-service).
If you've freshly cloned this app, then follow the instructions for the [Initial Setup](#initial-setup).

### Development

Start the development server either with a mocked OData service or running against the real OData service:

- `npm run start-mock`
- `npm run start`

Point your browser to the address shown in the terminal output when the server has started, e.g.:
http://localhost:5173. This will fire up your React app directly.

To check out the Fiori Launchpad integration
point the browser to `flpSandbox.html`, e.g. http://localhost:5173/flpSandbox.html.
This will load the sandbox environment of the launchpad, call the `ui5/Component.ts`
which in turn will load the React app.

Changing any source or config file will hot reload the changes instantly.
You will also see any lint and typescript errors in the console.

### Testing

[Vitest](https://vitest.dev/) is used as testing framework.

`npm run test`

### Building

Before deploying the app it is build in production mode.
All your code is transpiled from TypeScript to EcmaScript, bundled into a
couple of filed and optimized for the best performance.

The command here is `npm run build`, which is automatically called before deploying.
So you probably won't need to use the command directly.

The result of the build process is stored in folder `/dist`.

### Running the Build Version

Vite comes with a preview option in order to test the production version:

- `npm run preview-mock`
- `npm run preview`

This will first bundle the code as you would when deploying for production.
Then it starts a local server running the bundled code.

Changing any file won't reload the changes.

### Deployment

The app is deployed with the help of [ui5-nwabap-deployer-cli](https://www.npmjs.com/package/ui5-nwabap-deployer-cli).
The central configuration file is `.ui5deployrc` in the root folder.

`npm run deploy`

This command will automatically build the app beforehand and then deploy it to the target SAP system.
The credentials are taken from `.env.local`.

If you encounter `401` as response status, then your credentials are wrong.
The deployment fails sometimes with an inconceivable error message, just repeat the command then
for a second time.

## Setup

When developing with VSCode install the following REST client: `httpyac` ([docs](https://httpyac.github.io/guide/)).
This one works a tad better than the regular REST client in regard to environment variables.

### Initial Setup

These instructions are only needed after initial cloning of the repository:

- `npm install`
- `npm run gen-odata`

Create the file `.env.local` and copy the following contents into it:

```
# SAP user credentials
SAP_USERNAME=
SAP_PASSWORD=
```

Then set your username and password for the system.

Create the file `http/http-client.private.env.json` and copy the following contents into it:

```
{
  "dev": {
    "auth": "TODO"
  }
}
```

Replace the "TODO" with your basic auth credentials. You can use this generator, which works offline, to generate
the basic auth credentials: [Blitter.se](https://www.blitter.se/utils/basic-authentication-header-generator/).

### Setup OData Service

Maintain connection details to your OData service in `.env`. This file should be
committed and serves for all developers (.gitignore is already configured appropriately).

Your personal credentials for authentication go into `.env.local` as well as any
individual settings like connecting to a different system. This file should not
be committed (.gitignore is already configured appropriately).

Having done that run `npm run gen-odata`.
It will download the metadata file to `src/localService/main-service.xml` and
generate the OData client.

## Features & Configuration

### Launchpad Integration

This app comes with a seamless Fiori Launchpad integration.

As has been laid out in the [Getting Started](#Development) section, the app can be started in the
context of the Fiori launchpad sandbox. Just point the browser to the special
entry point `flpSandbox.html`, e.g. http://localhost:5173/flpSandbox.html.

You find the correlating file in the `ui5` folder: `ui5/flpSandbox.html`.
Here you can configure the contents of the shown tile.

The integration goes even further by allowing interaction between
your React app and the shellbar. See file `src/main.tsx` for how this
can look like.

### Proxy Server

When developing we use a proxy to simulate that requests for our frontend stuff
(served by a local node.js server) and web service / OData calls (served by a SAP system)
origin from the same server.
This prevents [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) problems.

As has been mentioned in the setup section, the connection details to your OData service are maintained
in `.env` and `.env.local`.

### HTTP Tests

You should then test that you can reach this OData service and test the calls
you're going to execute. For this purpose you can make use of http-scripts, which
you find under folder `http`.

You need the `httpyac` plugin for VSCode or the `HTTP Client` for IntelliJ.

### Generated OData Client

This app generates an OData client with the help of [odata2ts](https://odata2ts.github.io/).

Generate the type-safe and domain-savvy OData client by `npm run gen-odata`.
Files will be generated under `src-generated/odata-service`.

Configure the OData client generation in `odata2ts.config.ts`.
Initialization of the generated OData client is configured in `src/config/odata.config.ts`.

### Mock Service

This app bundles SAP's [mock server](https://github.com/SAP/open-ux-odata/tree/main/packages/fe-mockserver-core)
which is used to mock your OData service.

The mock server requires the metadata file `src/localService/odata-service.xml` and some
mock data:

1. With the help of the http scripts, call the `EntitySets` of your OData service
2. Store the JSON response (without any wrapping of `d` or `results`) as json files under `src/localService/main-service`
3. Start the mock server via `npm run start-mock`

The mock server is configured via `mockserver.config.ts`.

## Overview of Configuration Files

If you've correctly filled out the questionnaire of the generator, then you're good to go.
However, if you ever want to configure things differently here is an overview of
all relevant configuration files as well as files which use the
information from the questionnaire.

| Folder              | File                           | Configurations                                                                                 |
| ------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `/`                 | `.env`                         | proxy settings for all devs                                                                    |
| `/`                 | `.env.local`                   | personal proxy settings: provide credentials & overrides                                       |
| `/`                 | `.ui5deployrc`                 | central deployment configuration                                                               |
| `/`                 | `app.config.js`                | static app settings, like main odata path, default language and related apps                   |
| `/`                 | `mockserver.config.ts`         | configuration of SAP's mock server                                                             |
| `/`                 | `odata2ts.config.ts`           | configure generation process of OData client                                                   |
| `/`                 | `vite.config.ts`               | configuration of Vite, i.e. the build tool                                                     |
| `/src`              | `index.html`                   | contains the app title in the title tag                                                        |
| `/src/config`       | `di.config.ts`                 | central dependency injection configuration                                                     |
| `/src/config`       | `i18n.config.ts`               | I18n settings                                                                                  |
| `/src/config`       | `odata.config.ts`              | initializes the generated OData client(s)                                                      |
| `/src/localService` | `odata-service.xml`            | the metadata file of your OData service (needs to be downloaded)                               |
| `/ui5`              | `Component.ts`                 | contains the appId as namespace for the component (build breaks if this is configured wrong)   |
| `/ui5`              | `flpSandbox.html`              | contains the appId & the launchpad configuration for local development                         |
| `/ui5`              | `manifest.json`                | contains the appId & appTitle and specifies the UI5 version to use                             |
| `/ui5`              | `standalone.html`              | contains the appId                                                                             |
| `/http`             | `main-service.http`            | Test file for requests against your main OData service                                         |
| `/http`             | `http-client.env.json`         | Public configuration for HTTP test scripts; first and foremost host and path to OData services |
| `/http`             | `http-client.private.env.json` | Private configuration for HTTP test scripts; basic auth credentials                            |
