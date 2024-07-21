import { Octokit, App } from 'octokit'

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
// const {
//     data: { login },
// } = await octokit.rest.users.getAuthenticated();
// console.log("Hello, %s", login);

// const data = await octokit.request('GET /rate_limit');

// const data = await octokit.request('POST /repos/wuwb/dotfiles/git/blobs', {
//     owner: 'octocat',
//     repo: 'hello-world',
//     content: 'content'
// })

// export async function getGithubOrganization(org: string) {
const octokit = new Octokit({
  auth: `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`,
})

const data = await octokit.request(`GET /orgs/alibaba`)
console.log('data: ', data)
// return data;
// }

// getGithubOrganization('alibaba')

// /users/{username}/orgs 获取一个用户的组织

// /orgs/{org}/members 获取组织的成员
