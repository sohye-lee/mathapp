export interface Session {
  user: {
    token: string;
    id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    level?: number;
    email?: string;
    avatar?: string;
  };
  strategy: string;
}
export interface User {
  token: string;
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  level?: number;
  avatar?: string;
  email?: string;
}

export interface JWT {
  user: {
    token: string;
    id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    level?: number;
    email?: string;
    avatar?: string;
  };
  token: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
}

export interface Play {
  // step?: number;
  level: number;
  question: number;
  answer: number | null;
  correct: boolean | null;
}
