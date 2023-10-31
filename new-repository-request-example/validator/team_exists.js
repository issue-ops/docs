/**
 * Example custom validator script: checks if a team exists
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
    await octokit.rest.teams.getByName({
      org: process.env.ORGANIZATION ?? '',
      team_slug: field
    })

    core.info(`Team '${field}' exists`)
    return 'success'
  } catch (error) {
    if (error.status === 404) {
      core.error(`Team '${field}' does not exist`)
      return `Team '${field}' does not exist`
    }
  }
}
