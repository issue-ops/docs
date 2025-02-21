'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Check, KeyRound, User } from 'lucide-react'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">Validate</h1>

      <span>
        Once an issue has been parsed, it can be validated against any rules
        that you require. When used in public repositories, issue form templates
        do enforce some{' '}
        <Link
          href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema#keys"
          className="text-blue-500 hover:underline">
          validation rules
        </Link>{' '}
        such as required fields, selection options, and more. However, you may
        have additional needs that apply to your specific use case. For example,
        if you are creating an IssueOps workflow for users to request membership
        to GitHub teams, the issue form template is not able to validate if a
        value provided by a user is in fact a team in your organization.e. When
        used in public repositories, issue form templates do enforce some
      </span>

      <span>
        The{' '}
        <Link
          href="https://github.com/issue-ops/validator"
          className="text-blue-500 hover:underline">
          <code>issue-ops/validator</code>
        </Link>{' '}
        action takes the parsed output of the issue body and validates it
        against the issue form template and any custom rules you define.
      </span>

      <Alert>
        <User className="h-4 w-4" />
        <AlertTitle>User Edits</AlertTitle>
        <AlertDescription>
          After a request is initially validated, there is nothing stopping a
          user from editing the issue and submitting it with invalid inputs. You
          should run your validation logic any time the following events occur:
          <br />
          <br />
          <ul className="list-disc pl-5">
            <li>The issue is opened</li>
            <li>The issue body is edited</li>
            <li>The issue is reopened after being closed</li>
            <li>The request is submitted for provisioning/creation</li>
          </ul>
        </AlertDescription>
      </Alert>

      <h1 className="text-4xl font-bold">Basic validation</h1>

      <span>
        The most basic validation compares each input field to the rules
        specified in your issue form template and, if any are violated, comments
        with an error message.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - name: Validate Issue
          id: validate
          uses: issue-ops/validator@vX.X.X
          with:
            issue-form-template: example-request.yml
            parsed-issue-body: \${{ steps.parse.outputs.json }}
        `}
      </SyntaxHighlighter>

      <span>
        For example, if you have an input field for users to select the
        visibility of their new repository, you can specify that the field is
        required and only one of a list of options can be chosen.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - type: dropdown
          id: visibility
          attributes:
            label: Repository Visibility
            description: The visibility of the repository.
            multiple: false
            options:
              - private
              - public
          validations:
            required: true
        `}
      </SyntaxHighlighter>

      <span>
        When run against an issue submitted with this template, the validator
        will comment on the issue with an error message if any of the following
        occur:
      </span>

      <ul className="list-disc list-inside">
        <li>The field is empty</li>
        <li>The field is missing from the issue body</li>
        <li>
          An option other than <code>private</code> or <code>public</code> is
          present
        </li>
      </ul>

      <h1 className="text-4xl font-bold">Custom validation</h1>

      <span>
        For each form field, you can also specify custom validation logic. This
        is done using several files in your repository:
      </span>

      <ul className="list-disc list-inside">
        <li>
          The validator configuration file (
          <code>.github/validator/config.yml</code>)
        </li>
        <li>
          One or more validator scripts (
          <code>.github/validator/&lt;script-name&gt;.js</code>)
        </li>
      </ul>

      <h1 className="text-3xl font-bold">Configuration file</h1>

      <span>
        This file defines the mapping of validator scripts to form fields. For
        example, if your issue form has input fields named{' '}
        <code>Read Team</code> and <code>Write Team</code>, you can specify a
        validator script (<code>check_team_exists.js</code>) to run against
        those fields.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        validators:
          - field: read_team
            script: check_team_exists
          - field: write_team
            script: check_team_exists
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">Validator scripts</h1>

      <Alert>
        <KeyRound className="h-4 w-4" />
        <AlertTitle>GitHub Token</AlertTitle>
        <AlertDescription>
          If you want to run custom validators that access GitHub APIs, you will
          need to provide a value for the <code>github-token</code> input. This
          is a good scenario for GitHub App authentication!
        </AlertDescription>
      </Alert>

      <span>
        Validator scripts are run on the associated fields in the configuration
        file. The script must specify a default export of a function with the
        following behavior:
      </span>

      <ul className="list-disc list-inside">
        <li>Accept inputs of the following types:</li>
        <ul className="list-disc list-inside pl-5">
          <li>
            Input and Textarea: <code>string</code>
          </li>
          <li>
            Dropdown: <code>string[]</code>
          </li>
          <li>
            Checkboxes: <code>{`{ label: string; required: boolean }`}</code>
          </li>
        </ul>
        <li>
          Return <code>&apos;success&apos;</code> for successful validation
        </li>
        <li>
          Return an error message (<code>string</code>) for unsuccessful
          validation
        </li>
      </ul>

      <span>
        The following is an example of a validator script that checks if a team
        exists. This can also be found in the{' '}
        <Link
          href="https://github.com/issue-ops/validator/blob/main/.github/validator/team.js"
          className="text-blue-500 hover:underline">
          <code>issue-ops/validator</code>
        </Link>{' '}
        repository.
      </span>

      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers>
        {dedent`
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

            core.info(\`Team '\${field}' exists\`)
            return 'success'
          } catch (error) {
            if (error.status === 404) {
              core.error(\`Team '\${field}' does not exist\`)
              return \`Team '\${field}' does not exist\`
            }
          }
        }
        `}
      </SyntaxHighlighter>

      <h1 className="text-4xl font-bold">New repository request</h1>

      <span>
        Recall from the issue form template that the new repository request
        expects the following inputs:
      </span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Input</TableCell>
              <TableCell>Required</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Repository Name</TableCell>
              <TableCell>
                <Check />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Visibility</TableCell>
              <TableCell>
                <Check />
              </TableCell>
              <TableCell>
                <code style={{ color: 'black' }}>private</code>,{' '}
                <code style={{ color: 'black' }}>public</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Read Team</TableCell>
              <TableCell>
                <Check />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Write Team</TableCell>
              <TableCell>
                <Check />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Auto Init</TableCell>
              <TableCell>
                <Check />
              </TableCell>
              <TableCell>
                <code style={{ color: 'black' }}>true</code>,{' '}
                <code style={{ color: 'black' }}>false</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Topics</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <span>
        Since the <i>Visibility</i> and <i>Auto Init</i> inputs must be one of
        several predefined values, they can be handled by basic validation. The
        other fields, however, must meet additional requirements:
      </span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Requirement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Repository Name</TableCell>
              <TableCell>Must not be an existing repository</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Read Team</TableCell>
              <TableCell>Must be a team in the organization</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Write Team</TableCell>
              <TableCell>Must be a team in the organization</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Topics</TableCell>
              <TableCell>
                Must be a list of 20 or fewer
                <br />
                Must be lowercase
                <br />
                Must be 50 or fewer characters
                <br />
                Must contain only letters, numbers, and hyphens
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="text-3xl font-bold">Create a configuration file</h1>

      <span>
        In order to configure custom validation, first create a configuration
        file in the repository.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        # File Path: .github/validator/config.yml

        validators:
          - field: repository_name
            script: repo_doesnt_exist
          - field: read_team
            script: team_exists
          - field: write_team
            script: team_exists
          - field: topics
            script: topics_valid
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">Create validator scripts</h1>

      <span>
        The following scripts can be used to validate the new repository
        request.
      </span>

      <span>
        First, create a script to check if a repository already exists.
      </span>

      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers>
        {dedent`
        // File Path: .github/validator/repo_doesnt_exist.js

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

            core.error(\`Repository '\${field}' already exists\`)
            return \`Repository '\${field}' already exists\`
          } catch (error) {
            if (error.status === 404) {
              core.info(\`Repository '\${field}' does not exist\`)
              return 'success'
            }
          }
        }
        `}
      </SyntaxHighlighter>

      <span>Next, create a script to check if a team exists.</span>

      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers>
        {dedent`
        // File Path: .github/validator/team_exists.js

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

            core.info(\`Team '\${field}' exists\`)
            return 'success'
          } catch (error) {
            if (error.status === 404) {
              core.error(\`Team '\${field}' does not exist\`)
              return \`Team '\${field}' does not exist\`
            }
          }
        }
        `}
      </SyntaxHighlighter>

      <span>Finally, create a script to check if the topics are valid.</span>

      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers>
        {dedent`
        // File Path: .github/validator/topics_valid.js

        module.exports = async (field) => {
          if (typeof field !== 'string') return 'Field type is invalid'

          const topics = field.split(/[\\r\\n]+/)

          if (topics.length > 20)
            return \`There are \${request.topics.length} topics (max: 20)\`

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
            return \`The following topics are invalid: \${JSON.stringify(invalidTopics)}\`
        }
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">Update the workflow</h1>

      <span>
        Now that issue validation has been configured, you can add it as a step
        to your workflow. Additional updates are noted with comments.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        name: Issue Opened/Edited/Reopened

        on:
          issues:
            types:
              - opened
              - edited
              - reopened

        jobs:
          new-repository-request:
            name: New Repository Request
            runs-on: ubuntu-latest

            if: contains(github.event.issue.labels.*.name, 'issueops:new-repository')

            # Since the validation step involves adding comments to issues, you will
            # need to give it write permissions. If you are using a GitHub App to call
            # other GitHub APIs, you will also need to add the appropriate permissions.
            permissions:
              contents: read
              id-token: write
              issues: write

            steps:
              # Always remove the validated/submitted labels first! This ensures that
              # the validation logic runs any time the issue body is edited. It also
              # ensures the issue must be re-submitted after editing.
              - name: Remove Labels
                id: remove-label
                uses: issue-ops/labeler@vX.X.X
                with:
                  action: remove
                  issue_number: \${{ github.event.issue.number }}
                  labels: |
                    issueops:validated
                    issueops:submitted

              # If your validation script checks things beyond the scope of the
              # repository it is running in, you will need to create a GitHub App and
              # generate an installation access token in your workflow.
              - name: Get App Token
                id: token
                uses: actions/create-github-app-token@vX.X.X
                with:
                  app_id: \${{ secrets.MY_GITHUB_APP_ID }}
                  private_key: \${{ secrets.MY_GITHUB_APP_PEM }}
                  owner: \${{ github.repository_owner }}

              - name: Checkout
                id: checkout
                uses: actions/checkout@vX.X.X

              # Install Node.js so the workflow can add npm packages that are used by
              # the custom validator scripts (e.g. '@octokit/rest').
              - name: Setup Node.js
                id: setup-node
                uses: actions/setup-node@vX.X.X
                with:
                  node-version-file: .node-version
                  cache: npm

              # Install NPM packages needed by the validator scripts.
              - name: Install Packages
                id: npm
                run: npm ci

              - name: Parse Issue
                id: parse
                uses: issue-ops/parser@vX.X.X
                with:
                  body: \${{ github.event.issue.body }}
                  issue-form-template: new-repository-request.yml

              # Add a step to validate the issue.
              - name: Validate Issue
                id: validate
                uses: issue-ops/validator@vX.X.X
                with:
                  issue-form-template: new-repository-request.yml
                  github-token: \${{ steps.token.outputs.token }}
                  parsed-issue-body: \${{ steps.parse.outputs.json }}

              # Add a label to mark the request as validated.
              - if: \${{ steps.validate.outputs.result == 'success' }}
                name: Add Validated Label
                id: add-label
                uses: issue-ops/labeler@vX.X.X
                with:
                  action: add
                  issue_number: \${{ github.event.issue.number }}
                  labels: |
                    issueops:validated
        `}
      </SyntaxHighlighter>

      <h1 className="text-4xl font-bold">Next steps</h1>

      <span>
        Congratulations! Your request has been successfully transitioned to the{' '}
        <code>Validated</code> state. Next, we&apos;re going to submit the
        request for approval.
      </span>

      <Link
        href="/states-and-transitions/submit"
        className="text-blue-500 hover:underline">
        Continue to the next section
      </Link>
    </div>
  )
}
