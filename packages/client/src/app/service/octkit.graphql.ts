/**
 * https://docs.github.com/ja/graphql/reference/queries#user
 */
export const viewer_gql = `
{
  viewer {
    login
    name
    avatarUrl
  }
}
`;

/**
 * https://docs.github.com/ja/graphql/reference/objects#organization
 */
export const get_org_project_gql = `
query getProjects($login: String!, $number: Int!, $endCursor: String) {
  organization(login: $login){
      projectNext(number: $number) {
          id
          title
          url
          fields(first: 100) {
            nodes {
              name
              settings
            }
          }
          items(last: 100, after: $endCursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              fieldValues (first:10) {
                nodes{
                  projectField{
                    name
                    settings
                  }
                  value
                }
              }
              content {
                ...on Issue{
                  id
                  title
                  closed
                  state
                  assignees (first:1){
                    nodes {
                      avatarUrl
                      login
                      name
                    }
                  }
                }
              }
            }
          }
      }
    }
}
`;

/**
 * https://docs.github.com/ja/graphql/reference/objects#organization
 */
export const get_org_project_issues_gql = `
query getProjects($login: String!, $number: Int!){
  organization(login: $login){
      projectNext(number: $number) {
          items(last: 100) {
            nodes {
              id
              fieldValues (first:10){
                nodes{
                  projectField{
                    name
                    settings
                  }
                  value
                }
              }
              content {
                ...on Issue{
                  id
                  title
                  closed
                  state
                  assignees (first:1){
                    nodes {
                      avatarUrl
                      login
                      name
                    }
                  }
                }
              }
            }
          }
      }
    }
}
`;
