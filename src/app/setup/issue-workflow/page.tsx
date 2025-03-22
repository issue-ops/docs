'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">
        Issue Workflow
      </h1>

      <span>
        Once a user submits your issue form, its time for GitHub Actions to run
        the show! The issue workflow is responsible for performing any initial
        processing of the issue such as adding labels, validating the contents,
        adding comments, etc. The following sections will walk through the core
        structure of an issue workflow.
      </span>

      <h1 className="text-4xl font-bold text-center">Event triggers</h1>

      <span>
        Most of the time, this workflow will only be run when an issue is opened
        or edited, however there are some cases where you may want to run this
        workflow when an issue is reopened.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          on:
            issues:
              types:
                - opened
                - edited
                - reopened
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-4xl font-bold text-center">Jobs</h1>

      <span>
        Different request types may have different inputs. For example, a new
        repository request may have different inputs than a repository transfer
        request. If you decide to create multiple jobs to parse different types
        of requests in the same workflow, you can use labels to control which
        jobs run for which types of requests.
      </span>

      <span>
        You should also consider how you plan to handle processing of multiple
        requests in the same workflow.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          jobs:
            new-repository-request:
              name: New Repository Request
              runs-on: ubuntu-latest

              # Only run for issues with the \`issueops:new-repository\` label.
              if: contains(github.event.issue.labels.*.name, 'issueops:new-repository')

            team-membership-request:
              name: Team Membership Request
              runs-on: ubuntu-latest

              # Only run for issues with the \`issueops:team-add\` label.
              if: contains(github.event.issue.labels.*.name, 'issueops:team-add')
          `}
        </SyntaxHighlighter>
      </div>

      <span>
        Depending on the complexity of your workflow, you may want to isolate
        each type of request to separate jobs entirely, or you may want to have
        jobs that handle common tasks across multiple request types. For
        example, if you have IssueOps workflows for adding and removing users
        from a team, there&apos;s a good chance they both have the same input
        data and perform the same validation steps. In this case, you may want
        to create a job that handles the common tasks, and then have separate
        jobs for the unique tasks.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          jobs:
            team-request:
              name: Team Management Request
              runs-on: ubuntu-latest

              # Run this job for both request types
              if: |
                contains(github.event.issue.labels.*.name, 'issueops:team-add') ||
                contains(github.event.issue.labels.*.name, 'issueops:team-remove')

              outputs:
                request: \${{ steps.parse.outputs.json }}

              steps:
                - name: Parse Issue
                  id: parse
                  uses: issue-ops/parser@vX.X.X
                  with:
                    body: \${{ github.event.issue.body }}
                    issue-form-template: team-add-remove-request.yml

                - name: Validate Issue
                  id: validate
                  uses: issue-ops/validator@vX.X.X
                  with:
                    issue-form-template: team-add-remove-request.yml
                    parsed-issue-body: \${{ steps.parse.outputs.json }}

            team-add:
              name: Team Add Request
              runs-on: ubuntu-latest

              # Only run after the \`team-request\` job has completed
              needs: team-request

              # Only run for issues with the \`issueops:team-add\` label.
              if: contains(github.event.issue.labels.*.name, 'issueops:team-add')

              steps:
                - name: Add User to Team
                  id: add
                  uses: actions/github-script@vX.X.X
                  with:
                    github-token: \${{ secrets.MY_TOKEN }}
                    script: |
                      const request = JSON.parse('\${{ needs.team-request.outputs.request }}')

                      await github.rest.teams.addOrUpdateMembershipForUserInOrg({
                        org: request.org,
                        team_slug: request.team,
                        username: request.user
                      })

            team-remove:
              name: Team Remove Request
              runs-on: ubuntu-latest

              # Only run after the \`team-request\` job has completed
              needs: team-request

              # Only run for issues with the \`issueops:team-remove\` label.
              if: contains(github.event.issue.labels.*.name, 'issueops:team-remove')

              steps:
                - name: Remove User from Team
                  id: remove
                  uses: actions/github-script@vX.X.X
                  with:
                    github-token: \${{ secrets.MY_TOKEN }}
                    script: |
                      const request = JSON.parse('\${{ needs.team-request.outputs.request }}')

                      await github.rest.teams.removeMembershipForUserInOrg({
                        org: request.org,
                        team_slug: request.team,
                        username: request.user
                      })
          `}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
