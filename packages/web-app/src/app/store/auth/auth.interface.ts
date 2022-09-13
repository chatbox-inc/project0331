export interface AuthProfileStateModel {
  __typename?: 'User' | undefined;
  login: string;
  name?: string | null | undefined;
  avatarUrl: string;
}

export interface AuthStateModel {
  token: string | null;
  profile?: AuthProfileStateModel;
}
