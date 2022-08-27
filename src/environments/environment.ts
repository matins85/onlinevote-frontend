// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const BaseUrl = {
  jwt_token: 'MELINA_ACCESS',
  refresh_token: 'MELINA_REFRESH',
  server: 'http://127.0.0.1:3000/',
  login: '',
  signup: 'accounts/api/onlinevote-create-voter/',
  list_datas: 'accounts/api/onlinevote-list-year-department-school/',
  list_department: 'vote/api/onlinevote-vote-list/',
  login_vote: 'vote/api/onlinevote-vote-login/',
  vote: 'vote/api/onlinevote-voters-create/',
  recognise: 'vote/api/onlinevote-check-face/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
