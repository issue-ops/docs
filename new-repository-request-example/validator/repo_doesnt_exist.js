/**
 * Example custom validator script: checks if a repository doesn't exist
 *
 * @param {string | string[] | {label: string; required: boolean }} field The input field.
 * @returns {Promise<string>} An error message or `'success'`
 */
module.exports = async (field) => {
  if (typeof field !== 'string') return 'Field type is invalid'

  const { getOctokit } = require('@actions/github')
  const core = require('@actions/core')
  const octokit = getOctokit(core.getInput('github-token', { required: true }))

  try {
    // This should throw a 404 error
    await octokit.rest.repos.get({
      org: '<org-name>',
      repo: field
    })

    core.error(`Repository '${field}' already exists`)
    return `Repository '${field}' already exists`
  } catch (error) {
    if (error.status === 404) {
      core.info(`Repository '${field}' does not exist`)
      return 'success'
    }
  }
}
