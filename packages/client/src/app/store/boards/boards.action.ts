
export namespace BoardsAction {
  export class addOrgProject {
    static readonly type = '[Boards] addOrg';
    constructor(
      public org: string,
      public number: number
    ) {}
  }

  export class updateOrgProjectSetting {
    static readonly type = '[Boards] update org project setting';
    constructor(
      public org: string,
      public number: number,
      public setting: any
    ) {}
  }
}
