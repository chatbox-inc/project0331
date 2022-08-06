import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { GitHubGraphQLService } from '@service/github-graphql.service';
import { AuthStateModel } from '@store/auth/auth.interface';
import { AuthAction } from './auth.action';

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
    const whoAmIResult = (await this.githubClient.auth(action.token).whoAmI())
      .data.viewer;
    // console.log({ whoAmIResult });

    ctx.setState({
      token: action.token,
      profile: whoAmIResult,
    });
  }
}
