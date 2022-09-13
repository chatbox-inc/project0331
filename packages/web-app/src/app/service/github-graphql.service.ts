import { Injectable } from '@angular/core';
import { NormalizedCacheObject, InMemoryCache } from '@apollo/client/cache';
import { ApolloClient, HttpLink } from '@apollo/client/core';
import {
  WhoAmIQuery,
  GetProjectsQuery,
  GetProjectsDocument,
  WhoAmIDocument,
  GetProjectsQueryVariables,
  GetProjectIssuesQuery,
  GetProjectIssuesQueryVariables,
  GetProjectIssuesDocument,
} from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class GitHubGraphQLService {
  private _client: ApolloClient<NormalizedCacheObject> | null = null;

  get client(): ApolloClient<NormalizedCacheObject> {
    if (!this._client) {
      throw new Error('invalid procedure');
    }
    return this._client;
  }

  #getApolloClient(token: string): ApolloClient<NormalizedCacheObject> {
    if (!token) {
      throw new Error(
        'You need to provide a Github personal access token as `GITHUB_TOKEN` env variable. See README for more info.',
      );
    }

    return new ApolloClient({
      link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
          authorization: `token ${token}`,
        },
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  }

  auth(token: string) {
    this._client = this.#getApolloClient(token);
    return this;
  }

  async whoAmI() {
    return await this.client.query<WhoAmIQuery>({
      query: WhoAmIDocument,
    });
  }

  async projectByOrgs(login: string, number: number) {
    return await this.client.query<GetProjectsQuery, GetProjectsQueryVariables>(
      {
        query: GetProjectsDocument,
        variables: {
          login,
          number,
        },
      },
    );
  }

  async getProjectIssues(login: string, number: number) {
    const result = await this.client.query<
      GetProjectIssuesQuery,
      GetProjectIssuesQueryVariables
    >({
      query: GetProjectIssuesDocument,
      variables: {
        login,
        number,
      },
    });
    if (!result.data.organization) return;
    if (!result.data?.organization?.projectNext?.__typename) return;
    if (!result.data.organization.projectNext.items) return;
    result.data.organization.projectNext.items;
  }
}
