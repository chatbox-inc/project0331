import { IssueState } from 'src/generated/graphql';

export interface BoardItemStateModel {
  type: string;
  name: string;
  number: number;
  setting?: {
    iteration: string;
    sumup: string[];
  };
  projectNext: {
    __typename?: 'ProjectNext';
    id: string;
    title?: string | null;
    url: any;
    fields: {
      __typename?: 'ProjectNextFieldConnection';
      nodes?: Array<{
        __typename?: 'ProjectNextField';
        name: string;
        settings?: string | null;
      } | null> | null;
    };
    items: {
      __typename?: 'ProjectNextItemConnection';
      nodes?: Array<{
        __typename?: 'ProjectNextItem';
        id: string;
        fieldValues: {
          __typename?: 'ProjectNextItemFieldValueConnection';
          nodes?: Array<{
            __typename?: 'ProjectNextItemFieldValue';
            value?: string | null;
            projectField: {
              __typename?: 'ProjectNextField';
              name: string;
              settings?: string | null;
            };
          } | null> | null;
        };
        content?:
          | { __typename?: 'DraftIssue' }
          | {
              __typename?: 'Issue';
              id: string;
              title: string;
              closed: boolean;
              state: IssueState;
              assignees: {
                __typename?: 'UserConnection';
                nodes?: Array<{
                  __typename?: 'User';
                  avatarUrl: any;
                  login: string;
                  name?: string | null;
                } | null> | null;
              };
            }
          | { __typename?: 'PullRequest' }
          | null;
      } | null> | null;
    };
  };
}

export interface BoardsStateModel {
  boards: BoardItemStateModel[];
}
