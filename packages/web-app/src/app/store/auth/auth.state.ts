import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { GitHubGraphQLService } from '@service/github-graphql.service';
import { AuthAction } from './auth.action';

export interface AuthProfileStateModel {
  login: string;
  avatarUrl: string;
  name: string;
}

export interface AuthStateModel {
  token: string | null;
  profile?: AuthProfileStateModel;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private readonly githubClient: GitHubGraphQLService) {}

  @Action(AuthAction.login)
  async login(ctx: StateContext<AuthStateModel>, action: AuthAction.login) {
    const whoAmIResult = await this.githubClient.auth(action.token).whoAmI();
    console.log({ whoAmIResult });

    ctx.setState({
      token: action.token,
      profile: whoAmIResult.data.viewer as AuthProfileStateModel,
    });
  }
}
