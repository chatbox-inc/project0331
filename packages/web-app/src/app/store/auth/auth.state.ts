import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { OctkitService } from '@service/octkit.service';
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
  constructor(private octkit: OctkitService) {}

  @Action(AuthAction.login)
  async login(ctx: StateContext<AuthStateModel>, action: AuthAction.login) {
    const result = await this.octkit.auth(action.token).viewer();

    console.log(result);
    ctx.setState({
      token: action.token,
      profile: result.viewer as AuthProfileStateModel,
    });
  }
}
