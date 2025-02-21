'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { CircleCheckBig, Info } from 'lucide-react'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">Comment Workflow</h1>

      <span>
        After the issue has been opened and any initial processing has been run,
        the comment workflow becomes the main driver of the rest of the process.
        This workflow is triggered by users commenting on issues and will do any
        further processing throughout the lifecycle of the issue.
      </span>

      <h1 className="text-4xl font-bold">Event triggers</h1>

      <span>
        The comment workflow should, at minimum, be triggered by creation of new
        comments. The trigger also supports editing and deleting comments, which
        may be useful for your use-case.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        on:
          issue_comment:
            types:
              - created
        `}
      </SyntaxHighlighter>

      <span>
        The flexibility with the <code>issue_comment</code> trigger lies in the
        comments themselves. You can take a limitless number of actions based on
        user input! Be careful to not make your workflow <i>too</i> complex.
        Otherwise, parsing comments becomes particularly challenging.
      </span>

      <Alert>
        <AlertDescription>
          <div className="content-center flex justify-center">
            <i>With great power comes great responsibility!</i>
          </div>
        </AlertDescription>
      </Alert>

      <span>
        The <code>issue_comment</code> trigger may seem misleading. This trigger
        applies to comments on both issues and PRs. If you want to trigger
        workflows on comments that are part of a PR <b>review</b>, use the{' '}
        <code>pull_request_comment</code> trigger instead.
      </span>

      <h1 className="text-4xl font-bold">Commands</h1>

      <span>
        Good IssueOps workflows make use of <i>commands</i> to trigger actions.
        These commands are typically prefixed with a symbol, such as{' '}
        <code>.</code> or <code>/</code>, and are descriptive of the action that
        will be taken when the command is processed. In general, any workflow
        that involves processing comments should start by looking for a specific
        command being run.
      </span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Keyword</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>.submit</code>
              </TableCell>
              <TableCell>Submit a request for approval</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>.approve</code>
              </TableCell>
              <TableCell>Approve a request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>.deny</code>
              </TableCell>
              <TableCell>Deny a request</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <span>
        The examples you will see throughout this documentation make heavy use
        of the{' '}
        <Link
          href="https://github.com/github/command"
          className="text-blue-500 hover:underline">
          <code>github/command</code>
        </Link>{' '}
        action. This action makes it easy to define your actions, who can run
        them, and what happens when they are run.
      </span>

      <span>
        The following code block shows a basic implementation of this action as
        part of a IssueOps workflow to lint a pull request. In this example, the{' '}
        <code>Lint Command</code> step will run any time a user comments with{' '}
        <code>.lint</code> on a PR.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        name: IssueOps Linter

        on:
          issue_comment:
            types:
              - created

        jobs:
          lint:
            name: Lint Codebase
            runs-on: ubuntu-latest

            # Only run on PR comments, not issue comments
            if: \${{ github.event.pull_request }}

            # Minimum required permissions for the \`github/command\` action
            permissions:
              pull-requests: write
              issues: write
              checks: read

            steps:
              - name: Lint Command
                id: command
                uses: github/command@vX.X.X
                with:
                  command: .lint

              - if: \${{ steps.command.outputs.continue == 'true' }}
                name: Checkout
                id: checkout
                uses: actions/checkout@vX.X.X

              - if: \${{ steps.command.outputs.continue == 'true' }}
                name: Run Linter
                id: run-linter
                run: npm run lint
        `}
      </SyntaxHighlighter>

      <span>
        As you can see, the <code>Checkout</code> and <code>Run Linter</code>{' '}
        steps only proceed if the <code>Lint Command</code> step&apos;s{' '}
        <code>continue</code> output is <code>&apos;true&apos;</code>. The{' '}
        <code>github/command</code> action provides the <code>continue</code>{' '}
        output to act as a gate for the rest of the workflow.
      </span>

      <span>
        The high-level flow of the <code>github/command</code> action is:
      </span>

      <ol className="list-decimal list-inside">
        <li>
          Check the comment body for the command keyword (<code>.lint</code>)
        </li>
        <li>Add a reaction to the comment to indicate it was received</li>
        <li>
          Confirm the command is allowed to run
          <ul className="list-disc list-inside pl-5">
            <li>The user is authorized to run the command</li>
            <li>Required checks have passed</li>
            <li>Required reviews have been submitted</li>
          </ul>
        </li>
        <li>Collect any arguments passed to the command</li>
      </ol>

      <h1 className="text-4xl font-bold">Workflow steps</h1>

      <span>
        Most comment workflows can be broken down into the following steps.
        Depending on your workflow, some of these may not be required.
      </span>

      <ol className="list-decimal list-inside">
        <li>Parse and validate the command and input(s)</li>
        <li>Parse and validate the issue body</li>
        <li>Check the current state</li>
        <li>Check the user&apos;s permissions</li>
        <li>Process the command</li>
        <li>Update the issue state</li>
        <li>Provide feedback to the user</li>
      </ol>

      <h1 className="text-3xl font-bold">
        Parse and validate the command and input(s)
      </h1>

      <span>
        Depending on your workflow, you may need users to be able to provide
        additional inputs in their comments. For example, you may want to allow
        users to specify a specific branch to lint, or a specific file to run
        tests on. Input arguments can also be passed into the comment body as
        part of a command.
      </span>

      <span>
        The <code>github/command</code> action can be extended to support input
        parameters. Parameters must be added after the separator specified by
        the <code>param_separator</code> argument (default: <code>|</code>).
        Suppose you want to also allow users to provide a branch name to run
        linting on. Users would enter a comment like this:
      </span>

      <SyntaxHighlighter language="plain" style={vscDarkPlus}>
        {dedent`
        .lint | main
        `}
      </SyntaxHighlighter>

      <span>
        Within your workflow, you would need to parse the parameter value and
        use it to checkout the correct branch:
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        name: IssueOps Linter

        on:
          issue_comment:
            types:
              - created

        jobs:
          lint:
            name: Lint Codebase
            runs-on: ubuntu-latest

            # Only run on PR comments, not issue comments
            if: \${{ github.event.pull_request }}

            # Minimum required permissions for the \`github/command\` action
            permissions:
              pull-requests: write
              issues: write
              checks: read

            steps:
              - name: Lint Command
                id: command
                uses: github/command@vX.X.X
                with:
                  command: .lint
                  param_separator: '|' # This is the default value

              - if: \${{ steps.command.outputs.continue == 'true' }}
                name: Checkout
                id: checkout
                uses: actions/checkout@vX.X.X
                with:
                  ref: \${{ steps.command.outputs.params }}

              - if: \${{ steps.command.outputs.continue == 'true' }}
                name: Run Linter
                id: run-linter
                run: npm run lint
        `}
      </SyntaxHighlighter>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Multiple Parameters</AlertTitle>
        <AlertDescription>
          The <code>params</code> output is a string, not an array or object. If
          you need to pass multiple parameters, you will need to include
          additional logic for parsing the string.
        </AlertDescription>
      </Alert>

      <h1 className="text-3xl font-bold">Parse and validate the issue body</h1>

      <Card>
        <CardContent>
          <br />
          <ul className="list-inside">
            <li className="flex items-center">
              <CircleCheckBig className="h-8 w-8" />
              <span>&nbsp;&nbsp;Validate Early</span>
            </li>
            <li className="flex items-center">
              <CircleCheckBig className="h-8 w-8" />
              <span>&nbsp;&nbsp;Validate Often</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <span>
        Any time you interact with an issue, make sure to validate the body!
        Users can edit the issue body at any time, so it&apos;s important to
        make sure you&apos;re working with the latest information. The{' '}
        <Link
          href="https://github.com/issue-ops/parser"
          className="text-blue-500 hover:underline">
          <code>issue-ops/parser</code>
        </Link>{' '}
        and{' '}
        <Link
          href="https://github.com/issue-ops/validator"
          className="text-blue-500 hover:underline">
          <code>issue-ops/validator</code>
        </Link>{' '}
        actions can take care of this for you. All you need to do is make sure
        they are included in your comment processing workflows.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        steps:
          - name: Parse Issue Body
            id: parse
            uses: issue-ops/parser@vX.X.X
            with:
              body: \${{ github.event.issue.body }}
              issue-form-template: my-issue-form.yml

          - name: Validate Issue Body
            id: validate
            uses: issue-ops/validator@vX.X.X
            with:
              issue-form-template: my-issue-form.yml
              issue-number: \${{ github.event.issue.number }}
              parsed-issue-body: \${{ steps.parse.outputs.json }}
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">Check the current state</h1>

      <span>
        As an issue is processed, it will move through a series of{' '}
        <Link
          href="/states-and-transitions"
          className="text-blue-500 hover:underline">
          states
        </Link>
        . The current state of an issue can be tracked via labels.
      </span>

      <span>
        For example, suppose you have a workflow that requires users to submit
        their request after is has been validated and confirmed. You could use
        the following logic to check if the issue has already been submitted.
        That way, the processing that would transition the issue from
        <code>validated</code> to <code>submitted</code> state does not run
        again.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        # This will only run if the request has already been submitted.
        if: contains(github.event.issue.labels.*.name, 'issueops:submitted') == true

        steps:
          - name: Post Comment
            id: comment
            uses: peter-evans/create-or-update-comment@vX.X.X
            with:
              issue-number: \${{ github.event.issue.number }}
              body: |
                ':clock1: It looks like this issue has already been submitted. Sit tight!'
        `}
      </SyntaxHighlighter>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Label Changes</AlertTitle>
        <AlertDescription>
          Labels can be edited at any time! You want to consider checking if the
          state indicated by the issue labels matches the expected state of the
          issue.
        </AlertDescription>
      </Alert>

      <h1 className="text-3xl font-bold">Check the user&apos;s permissions</h1>

      <span>
        By default, any user with read access to a repository can open issues
        and add comments. If your IssueOps workflow involves certain authorized
        users being able to perform actions (e.g. approving or denying
        requests), this can be a problem! Instead, you should use the
        <code>allowlist</code> option in the <code>github/command</code> action
        to restrict who has the ability to run certain commands.
      </span>

      <span>
        For example, suppose you want to only allow certain administrators to
        approve requests for new repositories. The following step would only
        allow @octocat and @mona to run the <code>.approve</code> command. Any
        other users who comment on the issue with <code>.approve</code> will not
        be able to push the request through to the next state.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - name: Approve Command
          id: approve
          uses: github/command@vX.X.X
          with:
            command: .approve
            allowlist: octocat,mona
        `}
      </SyntaxHighlighter>

      <span>
        If you want to use teams to control access, you will also need to
        provide a token with <code>read:org</code> scope for the{' '}
        <code>allowlist_pat</code> property. For information on creating a
        GitHub App and using it to generate a token in a GitHub Actions
        workflow, see{' '}
        <Link
          href="/setup/github-app"
          className="text-blue-500 hover:underline">
          GitHub App setup
        </Link>
        .
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - uses: actions/create-github-app-token@vX.X.X
          id: token
          with:
            app_id: \${{ secrets.MY_GITHUB_APP_ID }}
            private_key: \${{ secrets.MY_GITHUB_APP_PEM }}
            owner: \${{ github.repository_owner }}

        - name: Approve Command
          id: approve
          uses: github/command@vX.X.X
          with:
            command: .approve
            allowlist: octo-org/admin-team
            allowlist_pat: \${{ steps.token.outputs.token }}
        `}
      </SyntaxHighlighter>

      <span>
        Alternatively, you can restrict access to specific roles in your
        IssueOps repository using the <code>permissions</code> property. By
        default, anyone with write, maintain, or administrator access to the
        repository can run commands.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - name: Approve Command
          id: approve
          uses: github/command@vX.X.X
          with:
            command: .approve
            permissions: admin,maintain # Restrict users with write access
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">Process the command</h1>

      <span>
        This is where the magic happens! You can use any series of actions to
        process your request. For example, the{' '}
        <Link
          href="https://github.com/actions/github-script"
          className="text-blue-500 hover:underline">
          <code>actions/github-script</code>
        </Link>{' '}
        action is a great choice for interacting with GitHub APIs.
      </span>

      <span>
        Make sure to gate these steps using the <code>continue</code> output
        from the
        <code>github/command</code> action!
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - if: \${{ steps.command.outputs.continue == 'true' }}
          name: Add User to Team
          id: add-user
          uses: actions/github-script@vX.X.X
          with:
            token: \${{ steps.token.outputs.token }}
            script: |
              const request = JSON.parse('\${{ steps.parse.outputs.json }}')

              await github.rest.teams.addOrUpdateMembershipForUserInOrg({
                org: context.repo.owner,
                team_slug: request.team_name,
                username: '\${{ github.event.issue.user.login }}',
                role: 'member'
              })
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">Update the issue state</h1>

      <span>
        Once any processing has been completed, the issue can be transitioned to
        the next state. This is done by adding or removing labels from the
        issue.
      </span>

      <span>
        For example, suppose you have a workflow that requires users to submit
        their request after is has been validated and confirmed. You can use the{' '}
        <Link
          href="https://github.com/issue-ops/labeler"
          className="text-blue-500 hover:underline">
          <code>issue-ops/labeler</code>
        </Link>{' '}
        action to transition the issue from <code>validated</code> to{' '}
        <code>submitted</code> state.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - if: \${{ steps.command.outputs.continue == 'true' }}
          name: Set Submitted State
          id: set-submitted
          uses: issue-ops/labeler@vX.X.X
          with:
            action: add
            issue_number: \${{ github.event.issue.number }}
            labels: |
              issueops:submitted
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">Provide feedback to the user</h1>

      <span>
        Any time processing is done on an issue, its helpful to let users know:
      </span>

      <ol className="list-decimal list-inside">
        <li>The command has been received</li>
        <li>The command is being processed</li>
        <li>The outcome of the processing</li>
      </ol>

      <span>
        The <code>github/command</code> action takes care of the first part for
        you. It will automatically add a reaction to any comments that contain a
        command.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - uses: github/command@vX.X.X
          id: command
          with:
            command: .lint
            reaction: eyes
        `}
      </SyntaxHighlighter>

      <span>Any of the following reactions can be added:</span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Value</TableCell>
              <TableCell>Emoji</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>+1</code>
              </TableCell>
              <TableCell>:+1:</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>-1</code>
              </TableCell>
              <TableCell>:-1:</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>laugh</code>
              </TableCell>
              <TableCell>:smile:</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>confused</code>
              </TableCell>
              <TableCell>:confused:</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>heart</code>
              </TableCell>
              <TableCell>:heart:</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>hooray</code>
              </TableCell>
              <TableCell>:tada:</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>rocket</code>
              </TableCell>
              <TableCell>:rocket:</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>eyes</code>
              </TableCell>
              <TableCell>:eyes:</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <span>
        After the command has been received, adding comments to the issue to
        indicate work is being done is a great way to keep users informed. Once
        processing is complete, a comment can be added to the issue to indicate
        the outcome.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        - if: \${{ steps.command.outputs.continue == 'true' }}
          name: Add Complete Comment
          id: comment-complete
          uses: peter-evans/create-or-update-comment@vX.X.X
          with:
            issue-number: \${{ github.event.issue.number }}
            body: |
              Your request has been processed! Here are the details of the request:

              - **Team:** \${{ steps.parse.outputs.json.team_name }}
              - **Role:** \`member\`
        `}
      </SyntaxHighlighter>
    </div>
  )
}
