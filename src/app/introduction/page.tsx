'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { IssueOpenedIcon } from '@primer/octicons-react'
import { StateLabel } from '@primer/react'
import { Check, OctagonX, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px]">About IssueOps</h1>

      <p>
        In GitHub, a pull request (PR) can be interacted with in a lot of the
        same ways as an issue. For example, the{' '}
        <Link
          href="https://docs.github.com/en/free-pro-team@latest/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues"
          className="text-blue-500 hover:underline">
          List repository issues
        </Link>{' '}
        REST API will return both issues and PRs for a repository.
      </p>

      <p>
        This means that many of the features of an issue are applicable to a PR.
        However, PRs have some extra functionality that can also be used in an
        IssueOps workflow. Depending on the use-case, you might want to select
        one over the other. For example, if you want to use the review and
        approval functionality for changes to repository contents, you&apos;ll
        need to use a PR. If you want to use the{' '}
        <Link
          href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms"
          className="text-blue-500 hover:underline">
          issue forms
        </Link>{' '}
        feature, you&apos;ll need to use an issue.
      </p>

      <p>
        For more information on their structure and usage in IssueOps, see{' '}
        <Link
          href="/introduction/issues-and-prs"
          className="text-blue-500 hover:underline">
          Issues and PRs
        </Link>
        .
      </p>

      <p>
        Think of IssueOps as a{' '}
        <Link
          href="https://en.wikipedia.org/wiki/State_diagram"
          className="text-blue-500 hover:underline">
          state diagram
        </Link>{' '}
        . An issue is the <i>object</i> that changes state in response to
        specific <i>events</i>. As the object changes state, certain{' '}
        <i>actions</i> may be performed as part of the <i>transition</i>{' '}
        (provided any <i>guard</i> conditions are met). Once an <i>end state</i>{' '}
        is reached, the issue is considered complete and can be closed.
      </p>

      <h1 className="text-4xl font-bold">State Diagrams</h1>

      <p>
        The following sections contain definitions and examples of common terms
        used in state diagrams. These terms are used throughout this
        documentation.
      </p>

      <h1 className="text-3xl font-bold">Action</h1>

      <p>An atomic task that is performed when a transition is taken.</p>

      <Card>
        <CardHeader>
          <CardTitle className="items-center justify-items-center">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/92997159?v=4" />
              <AvatarFallback>@mona</AvatarFallback>
            </Avatar>
          </CardTitle>
          <CardDescription>
            @mona has invited you to collaborate
          </CardDescription>
        </CardHeader>
      </Card>

      <h1 className="text-3xl font-bold">Event</h1>

      <p>An external occurrence that triggers a state change.</p>

      <Card>
        <CardHeader>
          <CardTitle className="items-center justify-items-center">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/92997159?v=4" />
              <AvatarFallback>@mona</AvatarFallback>
            </Avatar>
          </CardTitle>
          <CardDescription>@octocat self-assigned this</CardDescription>
        </CardHeader>
      </Card>

      <h1 className="text-3xl font-bold">Guard</h1>

      <p>
        A condition that is evaluated when a trigger event occurs. A transition
        is taken only if all associated guard conditions are met.
      </p>

      <h1 className="text-3xl font-bold">State</h1>

      <p>
        A point in an object&apos;s lifecycle that satisfies certain
        condition(s).
      </p>

      <StateLabel status="issueOpened" sx={{ backgroundColor: 'green' }}>
        Open
      </StateLabel>

      <h1 className="text-3xl font-bold">Transition</h1>

      <p>
        A link between two states that, when traversed by an object, will cause
        certain action(s) to be performed.
      </p>

      <h1 className="text-4xl font-bold">IssueOps workflow</h1>

      <p>
        In general, an IssueOps workflow will follow the same basic pattern:
      </p>

      <p>
        <ol className="list-decimal list-inside">
          <li>
            A user opens an issue and provides information about a request
          </li>
          <li>
            The issue is validated to ensure it contains the required
            information
          </li>
          <li>
            (Optional) Approval is requested from an authorized user or team
          </li>
          <li>The request is processed and the issue is closed</li>
        </ol>
      </p>

      <p>Let&apos;s use a more practical example...</p>

      <h1 className="text-3xl font-bold">Example: GitHub team membership</h1>

      <p>
        <b>
          <i>User Story:</i>
        </b>{' '}
        As a developer, I should be able to request membership to various teams
        and, if approved by administrators, be granted membership.
      </p>

      <p>
        Suppose you are an admin of an organization and would like to reduce the
        overhead of managing team membership. You can use IssueOps to build an
        automated membership request and approval process.
      </p>

      <p>
        We can assume the current, manual workflow looks something like this
        when rendered as a state diagram.
      </p>

      <Alert>
        <IssueOpenedIcon className="h-4 w-4" />
        <AlertTitle>Nodes</AlertTitle>
        <AlertDescription>
          In state diagram format, nodes represent the state of an object (the
          membership request), while transitions represent actions that are
          taken as the object changes state.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Example State Diagram</CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidDiagram id="diagram">
            {dedent`
            stateDiagram-v2
            1 : Opened
            2 : Submitted
            3 : Approved
            4 : Denied
            5 : Closed
            [*] --> 1
            1 --> 2 : Submit request
            2 --> 3 : Approve request
            2 --> 4 : Deny request
            3 --> 5 : Add to team
            4 --> 5 : Notify user
            5 --> [*]
            `}
          </MermaidDiagram>
        </CardContent>
      </Card>

      <p>
        When creating an IssueOps workflow, you can use this diagram as a
        starting point to determine what events should trigger state changes,
        how to represent those events in issues, and what actions to take in
        response to state changes.
      </p>

      <h1 className="text-3xl font-bold">Event triggers</h1>

      <p>
        In the membership request workflow, there are several events that
        trigger a change in the request state:
      </p>

      <ul className="list-disc list-inside">
        <li>A user submits a request</li>
        <li>An admin approves a request</li>
        <li>An admin denies a request</li>
        <li>A user is added to a team</li>
        <li>A user is notified</li>
      </ul>

      <p>
        In GitHub, there are many ways to trigger events. For a full list, see{' '}
        <Link
          href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows"
          className="text-blue-500 hover:underline">
          Events that trigger workflows
        </Link>
        . Here, we will focus on the events that are most relevant to IssueOps.
      </p>

      <h1 className="text-2xl font-bold">Issues</h1>

      <p>
        Events related to issues seem like a good fit for <i>Issue</i>Ops!
        Issues are the entrypoint to the worflow. In particular, the issue being
        <i>opened</i>. You can think of this as someone coming to you and saying
        <i>Can you add me to this team?</i> Until this event occurs,
        there&apos;s nothing to do!
      </p>

      <p>
        However, this is not the only issue event that can be used in a
        workflow. The following table lists other{' '}
        <Link
          href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#issues"
          className="text-blue-500 hover:underline">
          issue events
        </Link>{' '}
        and example use-cases.
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Example</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>opened</code>
              </TableCell>
              <TableCell>Start a request workflow</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>edited</code>
              </TableCell>
              <TableCell>Re-validate a modified request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>deleted</code>
              </TableCell>
              <TableCell>Cancel in-flight tasks for a request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>transferred</code>
              </TableCell>
              <TableCell>
                Assign ownership of a request to a different team
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>pinned</code>
              </TableCell>
              <TableCell>Upgrade the severity/urgency of a request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>unpinned</code>
              </TableCell>
              <TableCell>Downgrade the severity/urgency of a request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>closed</code>
              </TableCell>
              <TableCell>End a request workflow</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>reopened</code>
              </TableCell>
              <TableCell>Restart a request workflow</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>assigned</code>
              </TableCell>
              <TableCell>Ping the assignee in Slack</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>unassigned</code>
              </TableCell>
              <TableCell>Ping the previous assignee in Slack</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>labeled</code>
              </TableCell>
              <TableCell>Track the current state of a request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>unlabeled</code>
              </TableCell>
              <TableCell>Track the current state of a request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>locked</code>
              </TableCell>
              <TableCell>
                See{' '}
                <Link
                  href="https://docs.github.com/en/communities/moderating-comments-and-conversations/locking-conversations"
                  className="text-blue-500 hover:underline">
                  locking conversations
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>unlocked</code>
              </TableCell>
              <TableCell>
                See{' '}
                <Link
                  href="https://docs.github.com/en/communities/moderating-comments-and-conversations/locking-conversations"
                  className="text-blue-500 hover:underline">
                  locking conversations
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>milestoned</code>
              </TableCell>
              <TableCell>
                Track requests by type to compare to team goals
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>demilestoned</code>
              </TableCell>
              <TableCell>
                Track requests by type to compare to team goals
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Alert>
        <OctagonX className="h-4 w-4" />
        <AlertTitle>Permissions</AlertTitle>
        <AlertDescription>
          Access to{' '}
          <Link
            href="https://docs.github.com/en/organizations/managing-organization-settings/allowing-people-to-delete-issues-in-your-organization"
            className="text-blue-500 hover:underline">
            delete issues
          </Link>{' '}
          should be carefully controlled. If you delete an issue, you will lose
          all of the information associated with it, including comments and
          attachments. You will also lose this request in the history of the
          repository.
        </AlertDescription>
      </Alert>

      <h1 className="text-2xl font-bold">Issue Comments</h1>

      <p>
        After an issue is opened, other events must take place that change the
        state and drive it through the workflow. In the membership request
        workflow, for example, commenting on an issue is a great way to handle
        state changes such as an administrator approving or denying the request.
      </p>

      <Alert>
        <Check className="h-4 w-4" />
        <AlertTitle>Approvals</AlertTitle>
        <AlertDescription>
          A core difference between issues and PRs is that issues do not have a
          built-in approval process. However, this can be implemented using
          issue comments. For more information, see{' '}
          <Link
            href="/workflow/approvals"
            className="text-blue-500 hover:underline">
            Approvals
          </Link>
          .
        </AlertDescription>
      </Alert>

      <p>
        Currently there are only three{' '}
        <Link
          href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#issue_comment"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">issue_comment</code>
        </Link>{' '}
        events that can trigger workflows:
      </p>

      <ul className="list-disc list-inside">
        <li>
          <code>created</code>
        </li>
        <li>
          <code>edited</code>
        </li>
        <li>
          <code>deleted</code>
        </li>
      </ul>

      <p>
        In all three cases, the <i>context</i> of the comment should be taken
        into account to determine how to transition the request state. For
        example, if only authorized administrators are allowed to approve team
        membership requests, how should an IssueOps workflow react if someone
        else comments with approval?
      </p>

      <p>
        All GitHub Actions workflow runs include important{' '}
        <Link
          href="https://docs.github.com/en/actions/learn-github-actions/contexts"
          className="text-blue-500 hover:underline">
          context information
        </Link>{' '}
        that can be accessed by your workflow. The{' '}
        <Link
          href="https://docs.github.com/en/webhooks/webhook-events-and-payloads#issue_comment"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">issue_comment</code>
        </Link>{' '}
        context can provide us with information to decide what actions to take,
        if any. In our team membership workflow, we can get the user that
        created the comment using the{' '}
        <code>github.event.comment.user.login</code> property. We can then use
        this to determine if the user is authorized to approve the request.
      </p>

      <h1 className="text-2xl font-bold">Labels</h1>

      <p>
        Labels are a great way to track the state of a request. You can think of
        these as the nodes in a state diagram, while the transitions are the
        actions that are taken as the request changes state. You can also use
        labels to classify the types of requests when your repository supports
        more than one IssueOps workflow. For example, in the membership request
        workflow, you might have the following labels:
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>team-membership-request</code>
              </TableCell>
              <TableCell>The type of request</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>submitted</code>
              </TableCell>
              <TableCell>
                Requests that have been submitted and are pending review
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <p>
        Looking at this list, you may ask{' '}
        <i>
          why there aren&apos;t labels for <code>approved</code>,{' '}
          <code>denied</code>, or <code>closed</code> states?
        </i>{' '}
        These states don&apos;t have any transitions that do not lead to the
        issue being closed. In other words, once a request is approved or
        denied, the issue will <b>always</b> reach the <code>closed</code>{' '}
        state, regardless of whether it was approved or denied. If this workflow
        had more steps, such as requiring multiple approvals, additional states
        would need to be tracked.
      </p>

      <p>
        As with <code>issue_comment</code> events, there are only three{' '}
        <Link
          href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#label"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">label</code>
        </Link>{' '}
        events available:
      </p>

      <ul className="list-disc list-inside">
        <li>
          <code>created</code>
        </li>
        <li>
          <code>edited</code>
        </li>
        <li>
          <code>deleted</code>
        </li>
      </ul>

      <p>
        These, however, refer to the actual creation and modification of the
        label itself, so they may not apply to your workflow. You will generally
        use the <code>issue {'=>'} labeled</code> event instead.
      </p>

      <Alert>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Label Permissions</AlertTitle>
        <AlertDescription>
          Anyone with access to open issues can also change labels! Labels are
          good for state tracking, but should not be used to determine if a
          request is valid! For more information, see the{' '}
          <Link
            href="/workflow/validate"
            className="text-blue-500 hover:underline">
            Validate
          </Link>{' '}
          step.
        </AlertDescription>
      </Alert>

      <h1 className="text-4xl font-bold">GitHub features</h1>

      <p>
        You can leverage other GitHub features to dramatically increase the
        value of IssueOps.
      </p>

      <h1 className="text-3xl font-bold">Secrets</h1>

      <p>
        <Link
          href="https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions"
          className="text-blue-500 hover:underline">
          Secrets
        </Link>{' '}
        let you store sensitive information at the organization, repository, or
        environment level to share with GitHub Actions workflows. You can use
        secrets to store information such as API keys, passwords, or tokens.
        Secrets are encrypted and only exposed to runners at runtime. You can
        use secrets to store information such as API keys, passwords, or tokens
        that can be used to access external resources from your workflows.
      </p>

      <h1 className="text-3xl font-bold">Projects and milestones</h1>

      <p>
        Keeping track of requests, especially when you have an approval process
        in place, is important.
        <Link
          href="https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects"
          className="text-blue-500 hover:underline">
          Projects
        </Link>{' '}
        make it easy to track requests throughout their lifecycle. You can
        automatically add issues as they are opened, and use lifecycle rules to
        keep track of the state of requests without having to manually move them
        around your project board.
      </p>

      <p>
        You can also combine this with{' '}
        <Link
          href="https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones"
          className="text-blue-500 hover:underline">
          Milestones
        </Link>{' '}
        to better organize issues and PRs. For example, if your IssueOps
        repository includes workflows for multiple types of requests, you can
        add issues for each request type to a corresponding milestone. That way
        they are automatically categorized in your project.
      </p>

      <p>
        <Link
          href="https://docs.github.com/en/issues/planning-and-tracking-with-projects/viewing-insights-from-your-project"
          className="text-blue-500 hover:underline">
          Project insights
        </Link>{' '}
        give you a visual snapshot of how requests are being processed. You can
        create custom graphs of to see when and how teams are using your
        workflows.
      </p>

      <h1 className="text-3xl font-bold">GitHub Apps</h1>

      <p>
        One of the most important things to consider when creating workflows
        that interact with the GitHub APIs is permissions. GitHub Actions
        workflows can only interact with the repository in which they run. For
        example, the default permissions do not allow GitHub Actions to manage
        team membership. If you are building a workflow that interacts with
        resources outside of the repository it is running in, you should
        consider creating an organization-level{' '}
        <Link
          href="https://docs.github.com/en/apps/overview"
          className="text-blue-500 hover:underline">
          GitHub App
        </Link>{' '}
        and installing it in your IssueOps repository. That way, you can use the
        permissions of the app to interact with other resources in your
        organization.
      </p>

      <p>
        For more information, see{' '}
        <Link
          href="/setup/github-app"
          className="text-blue-500 hover:underline">
          GitHub App
        </Link>{' '}
        in the setup documentation.
      </p>
    </div>
  )
}
