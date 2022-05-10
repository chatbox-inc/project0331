import { inject, Injectable } from '@angular/core';

import { Octokit } from 'octokit';
import { get_org_project_gql, viewer_gql } from './octkit.graphql';

type ProjectByOrgsArgs = {
  login: string;
  number: number;
  endCursor?: string;
};

/**
 * https://github.com/octokit/octokit.js/#graphql-api-queries
 */
@Injectable({
  providedIn: 'root',
})
export class OctkitService {
  private _octokit: Octokit | null = null;

  get octokit(): Octokit {
    if (!this._octokit) {
      throw new Error('invalid proceedure');
    }
    return this._octokit;
  }

  public auth(token: string) {
    this._octokit = new Octokit({ auth: token });
    return this;
  }

  async viewer(): Promise<any> {
    console.log({ viewer_gql });
    const result = await this.octokit.graphql(viewer_gql);
    return result;
  }

  async projectByOrgs({
    login,
    number,
    endCursor,
  }: ProjectByOrgsArgs): Promise<any> {
    console.log({ get_org_project_gql, login, number });
    const args = { ...{ login, number }, ...(endCursor ? { endCursor } : '') };
    console.log({ args });
    const result = await this.octokit.graphql(get_org_project_gql, args);
    return result;
  }
}
