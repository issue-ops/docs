/**
 * Example custom validator script: checks if topics are valid
 *
 * @param {string | string[] | {label: string; required: boolean }} field The input field.
 * @returns {Promise<string>} An error message or `'success'`
 */
module.exports = async (field) => {
  if (typeof field !== 'string') return 'Field type is invalid'

  const topics = field.split(/[\r\n]+/)

  if (topics.length > 20)
    return `There are ${request.topics.length} topics (max: 20)`

  const invalidTopics = []
  for (const topic of topics) {
    if (
      topic !== topic.toLowerCase() ||
      topic.length > 50 ||
      !topic.match(/^[a-z0-9-]+$/)
    )
      invalidTopics.push(topic)
  }

  if (invalidTopics.length > 0)
    return `The following topics are invalid: ${JSON.stringify(invalidTopics)}`
}
