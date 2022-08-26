export const environment = {
  production: true,
};

export const BaseUrl = {
  jwt_token: 'MELINA_ACCESS',
  refresh_token: 'MELINA_REFRESH',
  server: 'https://onlinevoteserver.herokuapp.com/',
  login: '',
  signup: 'accounts/api/onlinevote-create-voter/',
  list_datas: 'accounts/api/onlinevote-list-year-department-school/',
  list_department: 'vote/api/onlinevote-vote-list/',
  login_vote: 'vote/api/onlinevote-vote-login/',
  vote: 'vote/api/onlinevote-voters-create/',
  recognise: 'vote/api/onlinevote-check-face/',
};
