export const gitlabUserDataQuery: (
  username: string,
  createAfter: string
) => string = (username: string, createdAfter: string) => {
  return `
    {
      user(username: "${username}") {
        id
        username
        name
        webUrl
        avatarUrl
        createdAt
        authoredMergeRequests(createdAfter: "${createdAfter}") {
          nodes {
            id
            iid
            webUrl
            title
            description
            state
            labels {
              nodes {
                title
              }
            }
            upvotes
            downvotes
            conflicts
            createdAt
            state
            project{
              fullPath
            }
            notes(filter: ONLY_COMMENTS) {
              nodes {
                author{
                  username
                }
                url
                id
                body
                createdAt
                position{
                  diffRefs{
                    headSha
                  }
                  filePath
                }
              }
            }
          }
        }
      }
    }  
    `;
};

export const gitlabUserExistenseQuery: (username: string) => string = (
  username: string
) => {
  return `
    {
      user(username: "${username}") {
        id
        name
      }
    }  
    `;
};
