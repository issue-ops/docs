'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { KeyRound } from 'lucide-react'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px]">Submit</h1>

      <p>
        Once your issue has been parsed and validated, it&apos;s ready for
        processing! At this point, _processing_ can mean a lot of things and is
        entirely dependent on your use case. For example, if you&apos;re using
        IssueOps to access administrative functions, you may require a human to
        review and approve the issue. Or, if you&apos;re using IssueOps to track
        PTO requests, you may not need any additional approvals and can simply
        mark the issue as processed.
      </p>

      <p>
        This page walks through the process of submitting a request after it has
        been validated. In particular, it covers requesting approval from
        authorized users or teams.
      </p>

      <p>
        <i>
          Wouldn&apos;t opening the issue count as the act of submitting it?
        </i>
      </p>

      <p>
        Absolutely! However, the act of opening an issue may not be the best
        indicator that an issue is in the <code>Submitted</code> state in your
        workflow. What if you need to do additional processing on the validated
        request which requires confirmation from the user?
      </p>

      <p>
        Using the new repository request as an example, your organization may
        want to enforce certain naming conventions for repositories, such as
        prefixing the name with the user&apos;s department. In this case, when a
        user opens a request and asks for a repository named{' '}
        <code>pto-requests</code>, you could have them confirm that the
        generated name of <code>hr-pto-requests</code> is acceptable before
        submitting the request for further processing.
      </p>

      <h1 className="text-4xl font-bold">Command actions</h1>

      <p>
        This is where the{' '}
        <Link
          href="https://github.com/github/command"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">github/command</code>
        </Link>{' '}
        action comes into play. This action allows you to specify the <i>who</i>
        ,<i>what</i>, <i>when</i>, and <i>where</i> of activities that can be
        performed on an issue. For example, if you request approval for a new
        repository, the <code>github/command</code> action ensures that any user
        cannot approve the request. Instead, only users or teams you specify
        can.
      </p>

      <Alert>
        <KeyRound className="h-4 w-4" />
        <AlertTitle>Token Permissions</AlertTitle>
        <AlertDescription>
          As with other actions that call GitHub APIs, if you want to include
          GitHub teams in the <code>allowlist</code> feature, you must provide a
          valid token in the <code>allowlist_pat</code> input. This can be a
          token generated from a GitHub App!
        </AlertDescription>
      </Alert>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          steps:
            - name: Approve Command
              id: approve
              uses: github/command@vX.X.X
              with:
                allowed_contexts: issue
                allowlist: octo-org/approvers
                allowlist_pat: \${{ secrets.MY_TOKEN }}
                command: .approve
          `}
        </SyntaxHighlighter>
      </div>

      <p>
        This step acts as the gate for any further processing of the issue. The{' '}
        <code>continue</code> output can be used to conditionally invoke further
        steps. For example, if the <code>continue</code> output is{' '}
        <code>&apos;true&apos;</code>, the user who commented on the issue with{' '}
        <code>.approve</code> was indeed authorized to approve the request.
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          steps:
            - name: Approve Command
              id: approve
              uses: github/command@vX.X.X
              with:
                allowed_contexts: issue
                allowlist: octo-org/approvers
                allowlist_pat: \${{ secrets.MY_TOKEN }}
                command: .approve

            ##############################################
            # This is a great time to re-run validation! #
            ##############################################

            - if: \${{ steps.approve.outputs.continue == 'true' }}
              run: echo "This request is approved!"
          `}
        </SyntaxHighlighter>
      </div>

      <p>
        With any approval workflow, you should also consider what happens when a
        request is explicitly denied This is easy to implement as a separate{' '}
        <code>github/command</code> step that looks for the <code>.deny</code>{' '}
        command. As with the approval command, if the user who commented on the
        issue is authorized to deny requests, the <code>continue</code> output
        would be <code>&apos;true&apos;</code>.
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          steps:
            - name: Approve Command
              id: approve
              uses: github/command@vX.X.X
              with:
                allowed_contexts: issue
                allowlist: octo-org/approvers
                allowlist_pat: \${{ secrets.MY_TOKEN }}
                command: .approve

            - name: Deny Command
              id: deny
              uses: github/command@vX.X.X
              with:
                allowed_contexts: issue
                allowlist: octo-org/approvers
                allowlist_pat: \${{ secrets.MY_TOKEN }}
                command: .deny

            - if: \${{ steps.approve.outputs.continue == 'true' }}
              run: echo "This request is approved :)"

            - if: \${{ steps.deny.outputs.continue == 'true' }}
              run: echo "This request is denied :("
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-4xl font-bold">New repository request</h1>

      <p>
        Up until this point, everything has been handled as part of the issue
        creation workflow. Now that the issue has been validated, any further
        processing is done via comments, labels, reactions, and so on.
      </p>

      <h1 className="text-3xl font-bold">Create the comment workflow file</h1>

      <p>
        The first step is to create a workflow file that will be triggered when
        a user comments on an issue. This workflow file will be responsible for
        parsing the comment and determining the following:
      </p>

      <ul className="list-disc list-inside">
        <li>
          The comment is on an issue that is part of our IssueOps workflow
        </li>
        <li>The comment is a command word</li>
        <li>The user is authorized to call that command</li>
      </ul>

      <p>
        In this example, we will set up two different jobs that will run when
        the request is approved or denied.
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          name: Issue Comment

          # This workflow runs any time a comment is added to an issue. The comment body
          # is read and used to determine what action to take.
          on:
            issue_comment:
              types:
                - created

          jobs:
            # This job handles the case where a user comments with \`.approve\`.
            approve:
              name: Approve Request
              runs-on: ubuntu-latest

              steps:
                - name: Approve Command
                  id: approve
                  uses: github/command@vX.X.X
                  with:
                    allowed_contexts: issue
                    allowlist: octo-org/approvers
                    allowlist_pat: \${{ secrets.MY_TOKEN }}
                    command: .approve

                - if: \${{ steps.approve.outputs.continue == 'true' }}
                  run: echo "This request is approved!"

            # This job handles the case where a user comments with \`.deny\`.
            deny:
              name: Deny Request
              runs-on: ubuntu-latest

              steps:
                - name: Deny Command
                  id: deny
                  uses: github/command@vX.X.X
                  with:
                    allowed_contexts: issue
                    allowlist: octo-org/approvers
                    allowlist_pat: \${{ secrets.MY_TOKEN }}
                    command: .deny

                - if: \${{ steps.deny.outputs.continue == 'true' }}
                  run: echo "This request is denied!"
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-3xl font-bold">Trigger the workflow</h1>

      <p>
        In the above workflow, both the <code>approve</code> and{' '}
        <code>deny</code> jobs are triggered when a user comments on an issue or
        PR. Though the <code>github/command</code> actions will act as one gate,
        you may want to add additional conditions to ensure that the workflow is
        not run when the issue is in a state that does not require approval. For
        example, this workflow doesn&apos;t need to run if:
      </p>

      <ul className="list-disc list-inside">
        <li>The issue is not part of this IssueOps workflow</li>
        <li>
          The request is not in the <code>Submitted</code> state
        </li>
        <li>The request is already approved</li>
      </ul>

      <p>
        Workflow conditions can be used to control when the workflow jobs are
        invoked.
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          name: Issue Comment

          on:
            issue_comment:
              types:
                - created

          jobs:
            approve:
              name: Approve Request
              runs-on: ubuntu-latest

              # Only run when the following conditions are true:
              #   - The issue has the \`issueops:new-repository\` label
              #   - The issue has the \`issueops:validated\` label
              #   - The issue does not have the \`issueops:approved\` label
              #   - The issue is open
              if: |
                contains(github.event.issue.labels.*.name, 'issueops:new-repository') &&
                contains(github.event.issue.labels.*.name, 'issueops:validated') &&
                contains(github.event.issue.labels.*.name, 'issueops:approved') == false &&
                github.event.issue.state == 'open'

              steps:
                # ...

            deny:
              name: Deny Request
              runs-on: ubuntu-latest

              # Only run when the following conditions are true:
              #   - The issue has the \`issueops:new-repository\` label
              #   - The issue has the \`issueops:validated\` label
              #   - The issue does not have the \`issueops:approved\` label
              #   - The issue is open
              if: |
                contains(github.event.issue.labels.*.name, 'issueops:new-repository') &&
                contains(github.event.issue.labels.*.name, 'issueops:validated') &&
                contains(github.event.issue.labels.*.name, 'issueops:approved') == false &&
                github.event.issue.state == 'open'

              steps:
                # ...
          `}
        </SyntaxHighlighter>
      </div>

      <p>
        This seems like duplication of the same checks. Plus, we haven&apos;t
        followed our own rule: <b>Validate Early. Validate Often.</b> Instead,
        lets move this to a separate job that re-runs validation checks.
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          name: Issue Comment

          on:
            issue_comment:
              types:
                - created

          jobs:
            validate:
              name: Validate Request
              runs-on: ubuntu-latest

              # Only run when the following conditions are true:
              #   - The issue has the \`issueops:new-repository\` label
              #   - The issue has the \`issueops:validated\` label
              #   - The issue does not have the \`issueops:approved\` label
              #   - The issue is open
              if: |
                contains(github.event.issue.labels.*.name, 'issueops:new-repository') &&
                contains(github.event.issue.labels.*.name, 'issueops:validated') &&
                contains(github.event.issue.labels.*.name, 'issueops:approved') == false &&
                github.event.issue.state == 'open'

              permissions:
                contents: read
                id-token: write
                issues: write

              outputs:
                request: \${{ steps.parse.outputs.request }}

              steps:
                - name: Remove Labels
                  id: remove-label
                  uses: issue-ops/labeler@vX.X.X
                  with:
                    action: remove
                    issue_number: \${{ github.event.issue.number }}
                    labels: |
                      issueops:validated
                      issueops:submitted

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

                - name: Setup Node.js
                  id: setup-node
                  uses: actions/setup-node@vX.X.X
                  with:
                    node-version-file: .node-version
                    cache: npm

                - name: Install Packages
                  id: npm
                  run: npm ci

                - name: Parse Issue
                  id: parse
                  uses: issue-ops/parser@vX.X.X
                  with:
                    body: \${{ github.event.issue.body }}
                    issue-form-template: new-repository-request.yml

                - name: Validate Issue
                  id: validate
                  uses: issue-ops/validator@vX.X.X
                  with:
                    issue-form-template: new-repository-request.yml
                    github-token: \${{ steps.token.outputs.token }}
                    parsed-issue-body: \${{ steps.parse.outputs.json }}

                - if: \${{ steps.validate.outputs.result == 'success' }}
                  name: Add Validated Label
                  id: add-label
                  uses: issue-ops/labeler@vX.X.X
                  with:
                    action: add
                    issue_number: \${{ github.event.issue.number }}
                    labels: |
                      issueops:validated

            approve:
              name: Approve Request
              runs-on: ubuntu-latest

              # Only run after validation has completed.
              needs: validate

              steps:
                # ...

            deny:
              name: Deny Request
              runs-on: ubuntu-latest

              # Only run after validation has completed.
              needs: validate

              steps:
                # ...
          `}
        </SyntaxHighlighter>
      </div>

      <p>
        With this workflow, we know that the request has been validated before
        we handle any approval or denial. This is a good example of{' '}
        <b>Validate Early. Validate Often</b>.
      </p>

      <h1 className="text-4xl font-bold">Next steps</h1>

      <p>
        Depending on if the request is approved or denied, you may want to take
        further actions. For example, if the request is approved, you could
        create the repository, add a comment to the issue, and close it as
        completed. On the other hand, if the request is denied, you could close
        the issue as not planned.
      </p>

      <p>
        Continue to the{' '}
        <Link
          href="/states-and-transitions/approve"
          className="text-blue-500 hover:underline">
          approve
        </Link>{' '}
        or{' '}
        <Link
          href="/states-and-transitions/deny"
          className="text-blue-500 hover:underline">
          deny
        </Link>{' '}
        sections to learn more.
      </p>
    </div>
  )
}
