// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCRSGVN9aTcRXR_8y_V7xT4bRU3O8MLay8",
    authDomain: "clinica-giffard.firebaseapp.com",
    projectId: "clinica-giffard",
    storageBucket: "clinica-giffard.appspot.com",
    messagingSenderId: "196880322291",
    appId: "1:196880322291:web:f0015e1441f33af0793186"
  },
  recaptcha: {
    siteKey: '6Lfn1j0gAAAAAD0ZTcIhAnL5xbVVf_aQ4whgf6nz',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
