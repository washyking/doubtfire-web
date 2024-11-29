// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  panopto: {
    clientId: "6cd9cf5d-83dd-4177-9555-b237000906be",
    clientSecret: "FS3oBJXrb5I62NneGB2fCHhI5S3SvzJt60/YdgG+vGs=",
    apiEndpoint: "https://deakin.au.panopto.com/Panopto/api/v1",
    authUrl: "https://deakin.au.panopto.com/Panopto/oauth2/connect/authorize",
    tokenUrl: "https://deakin.au.panopto.com/Panopto/oauth2/connect/token",
    redirectUri: "http://localhost:8000", // Replace with your redirect URI if different
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
