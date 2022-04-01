
export namespace AuthAction {
  export class login {
    static readonly type = '[Auth] login';
    constructor(public token: string) {}
  }
}
