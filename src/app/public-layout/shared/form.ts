export interface forgetPassword {
  email: string;
}

export interface login {
  email: string;
  password: string;
}

export interface login_vote {
  mat_no: string;
}

export interface signup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms: string;
}

export interface Review {
  title: string;
  review: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface stateLogo {
  id: any;
  name: any;
  code: any;
}

export interface lgaLogo {
  id: any;
  name: any;
  code: any;
}

export let OPTIONS = [
  {
    id: '',
    name: '',
    code: '',
  },
];

export let STATE = [
  {
    id: '',
    name: '',
    code: '',
  },
];

export let LGA = [
  {
    id: '',
    name: '',
    code: '',
  },
];

