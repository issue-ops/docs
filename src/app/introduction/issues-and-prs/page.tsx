'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { MarkGithubIcon, TagIcon } from '@primer/octicons-react'
import { Avatar, Timeline } from '@primer/react'
import { Info } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'
import { z } from 'zod'

const formSchema = z.object({
  teamName: z.string(),
  title: z.string()
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">
        Issues and PRs
      </h1>

      <span>
        This page provides an overview of the different components that make up
        issues and PRs, and includes information about how each component can be
        used throughout an IssueOps workflow.
      </span>

      <h1 className="text-4xl font-bold text-center">Issues</h1>

      <h1 className="text-3xl font-bold text-center">Issue permissions</h1>

      <span>Any user with read access to a repository can open an issue.</span>

      <h1 className="text-3xl font-bold text-center">Issue structure</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Title of an issue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Body</TableCell>
              <TableCell>Main content of an issue entered by a user</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Assignees</TableCell>
              <TableCell>User(s) responsible for resolving an issue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Labels</TableCell>
              <TableCell>Short tags that can be applied to issues</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Milestones</TableCell>
              <TableCell>Groups for issues and PRs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Relations</TableCell>
              <TableCell>
                Other issues and PRs that are related to this issue
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Development</TableCell>
              <TableCell>Branches or PRs linked to the issue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Projects</TableCell>
              <TableCell>Projects that are tracking the issue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Participants</TableCell>
              <TableCell>Users who have interacted with the issue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Timeline</TableCell>
              <TableCell>Events that have occurred on the issue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Comments</TableCell>
              <TableCell>
                Comments and replies that have been added to the issue
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reactions</TableCell>
              <TableCell>
                Emoji reactions added to the issue and its comments
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="text-3xl font-bold text-center">
        Issue templates vs. issue forms
      </h1>

      <span>
        Currently, GitHub supports both{' '}
        <Link
          href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository"
          className="text-blue-500 hover:underline">
          issue templates
        </Link>{' '}
        and{' '}
        <Link
          href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms"
          className="text-blue-500 hover:underline">
          issue forms
        </Link>
        . When creating IssueOps workflows, the initial issue body is where you
        will get a lot of the information you need to process the issue.
        Depending on your use-case, issue <i>templates</i> may not result in the
        desired format, since they allow users to overwrite or replace the
        entire contents of the issue body during creation. Issue <i>forms</i>{' '}
        require specific input formats and result in a more consistent output.
      </span>

      <h1 className="text-3xl font-bold text-center">Title</h1>

      <span>
        The title of an issue is a short, concise description of the reason the
        issue has been opened, such as a particular bug or piece of feedback.
        Typically, the title is the first thing a user will enter when they open
        an issue (or they may update it based on the initial title provided by
        the issue form).
      </span>

      <span>
        When creating an issue forms, the title can be used as a way to identify
        the type of issue. For example, you can use a title like{' '}
        <code>[Request] Team Membership: TEAM_NAME</code> to indicate that the
        issue is a request to be added to a team. However, since this field can
        be modified by users, it should not be used as a way to validate the
        issue.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          title: '[Request] Team Membership: TEAM_NAME'
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-3xl font-bold text-center">Body</h1>

      <span>
        The body of an issue is where your workflow will get most of the
        information it needs to process the issue. When creating an issue form,
        you can use the body to provide instructions to the user, and to collect
        information from them. For example, you can use a markdown field to
        provide instructions, and then use an input field to collect the name of
        the team they would like to join.
      </span>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Markdown</AlertTitle>
        <AlertDescription>
          Any <code>markdown</code>-type fields in an issue form will not be
          included in the issue body after it has been submitted by the user.
        </AlertDescription>
      </Alert>

      <span>
        For information about the different types of fields that can be used,
        see{' '}
        <Link
          href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms"
          className="text-blue-500 hover:underline">
          Syntax for issue forms
        </Link>
        .
      </span>

      <h1 className="text-3xl font-bold text-center">Assignees</h1>

      <span>
        Assignees are users who are responsible for resolving an issue. If your
        workflow involves a review process, you can use assignees to indicate
        who is responsible for reviewing the issue. You can also use assignees
        to indicate who is responsible for processing the issue when manual
        tasks are involved.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          assignees:
            - octocat
            - mona
          `}
        </SyntaxHighlighter>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Issue vs. PR Assignees</AlertTitle>
        <AlertDescription>
          Issues do not support team assignees, but PRs do!
        </AlertDescription>
      </Alert>

      <h1 className="text-3xl font-bold text-center">Labels</h1>

      <span>
        Labels are a great way to control the flow of an issue through the
        state(s) you&apos;ve defined. Any time a issue is commented on or
        updated, you can use labels to tell where in the flow it is currently,
        and where it needs to go next.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          labels:
            - issueops:team-membership-request
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-3xl font-bold text-center">Milestones</h1>

      <span>
        If you have certain timelines or deadlines associated with your
        workflow, you can use milestones to track them. Milestones are groups of
        issues and pull requests that are tracked together. They can be used to
        track:
      </span>

      <ul className="list-disc list-inside">
        <li>Due date</li>
        <li>Completion percentage</li>
        <li>Open and closed issues and pull requests</li>
      </ul>

      <span>
        An issue cannot be added automatically to a milestone using issue forms,
        but you can use GitHub Actions to add it to a milestone after it has
        been created. See{' '}
        <Link
          href="/reference/actions"
          className="text-blue-500 hover:underline">
          IssueOps Actions
        </Link>{' '}
        in the reference for more information.
      </span>

      <h1 className="text-3xl font-bold text-center">Relations</h1>

      <span>
        When creating or commenting on issues, you can reference related issues
        by using the <code>#</code> symbol followed by the issue number. For
        example, if you want to reference issue 1 in another issue in the same
        repository, you would type <code>#1</code>.
      </span>

      <span>
        Relations may be useful when your workflow involves multiple issues. For
        example, if you have a workflow that involves interaction with another
        team, you can use relations to track the status of the other team&apos;s
        issue.
      </span>

      <h1 className="text-3xl font-bold text-center">Development</h1>

      <span>
        The development section of an issue is where you can track the branches
        and pull requests that are associated with the issue. This can be useful
        if your workflow involves creating branches or pull requests for the
        user. For example, if you would like to create an IssueOps workflow for
        users to create new repositories and you use an infrastructure as code
        service such as Terraform, you may want to create a PR on the
        user&apos;s behalf that includes the new repository definition. That
        way, developers don&apos;t have to learn Terraform to get new
        infrastructure, and operations teams can ensure all infrastructure is
        created following their requirements.
      </span>

      <h1 className="text-3xl font-bold text-center">Projects</h1>

      <span>
        GitHub Projects are dual-purpose when it comes to IssueOps. They can be
        used to both track and change the state of an issue. This is especially
        the case when your workflow involves manual steps that must be performed
        by a human.
      </span>

      <span>
        As a non-technical example, suppose you&apos;re planning Thanksgiving
        dinner with your extended family. Everyone in the family is supposed to
        suggest three dishes, prepare them, and bring them on Thanksgiving day.
      </span>

      <span>
        You can open issues for each dish that needs to be prepared using an
        issue form, and automatically assign them to your meal project.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          projects:
            - octo-repo/1
          `}
        </SyntaxHighlighter>
      </div>

      <span>
        Within your project, you can specify columns for the state of each dish
        (e.g. <code>New</code>, <code>Ingredients purchased</code>,{' '}
        <code>Ready to cook</code>, and <code>Cooked</code>).
      </span>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Manual Interaction</AlertTitle>
        <AlertDescription>
          Unfortunately, @mona can&apos;t cook (maybe one day!), so you&apos;ll
          need to manually move the issues through the columns as they are
          assigned and prepared. However, you can use the project to track the
          state of each dish, and to communicate that state to the rest of the
          family!
        </AlertDescription>
      </Alert>

      <h1 className="text-3xl font-bold text-center">Projects</h1>

      <span>
        Participants are users who have interacted with an issue. This includes
        the user who opened the issue as well as users who have commented on or
        been assigned to the issue. You can use participants to track who has
        interacted with an issue, and to communicate with them if needed.
      </span>

      <h1 className="text-3xl font-bold text-center">Timeline</h1>

      <span>
        The timeline is a list of all of the events that have occurred on an
        issue, starting from when it was first opened. Each timeline event
        includes a timestamp, the origin of the event, and other useful
        information.
      </span>

      <span>
        The timeline is especially useful to verify information about an issue.
        For example, if you have a workflow that requires validation of the
        issue body, you can (and should!) use labels to mark the issue as
        validated. However, what happens if a malicious user adds the label
        manually? You can use the timeline to compare when the issue body was
        last updated to when the validated label was added. If the label was
        added before the issue body was updated, you can determine that the
        label was added manually and re-run your validation logic.
      </span>

      <Card>
        <CardContent>
          <br />
          <Timeline>
            <Timeline.Item>
              <Timeline.Badge>
                <Avatar src="https://avatars.githubusercontent.com/u/5089146?v=4" />
              </Timeline.Badge>
              <Timeline.Body>
                <div className="flex items-center">
                  ncalteen added&nbsp;
                  <TagIcon size={16} />
                  &nbsp;<code>issueops:team-request</code>&nbsp;1 hour ago
                </div>
              </Timeline.Body>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Badge>
                <MarkGithubIcon size={16} />
              </Timeline.Badge>
              <Timeline.Body>
                <div className="flex items-center">
                  github-actions added&nbsp;
                  <TagIcon size={16} />
                  &nbsp;<code>issueops:validated</code>&nbsp; 1 hour ago
                </div>
              </Timeline.Body>
            </Timeline.Item>
          </Timeline>
        </CardContent>
      </Card>

      <h1 className="text-3xl font-bold text-center">Comments</h1>

      <span>
        Other than the issue body, comments are how a user will drive your
        IssueOps flow. You should define keywords that your workflow looks for
        to trigger certain actions. Suppose you have a workflow where a user can
        create a new repository. After the issue has been validated, the user
        can comment on the issue with a keyword such as <code>.submit</code> to
        trigger the creation of their repo.
      </span>

      <span>
        You can also use them to communicate information back to the user. For
        example, if the issue body contains invalid or incorrect information,
        you can reply to the issue stating what needs to be corrected. For
        example, in the screenshot, you can see that a comment was added to the
        issue because the request was missing information.
      </span>

      <h1 className="text-3xl font-bold text-center">Reactions</h1>

      <span>
        Though they don&apos;t convey as much information as a comment, adding
        reactions to issues and comments are a nice way to let the user know
        that their input has been received and is being processed. If needed,
        you can follow up with a comment when processing is complete.
      </span>

      <h1 className="text-3xl font-bold text-center">Example issue form</h1>

      <h1 className="text-2xl font-bold text-center">Issue form template</h1>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          name: Team Membership Request
          description: Submit a request to be added to a GitHub Team
          title: '[Request] Team Membership: TEAM_NAME'
          labels:
            - issueops:team-membership-request
          assignees:
            - octocat
            - mona
          projects:
            - octo-repo/1

          body:
            - type: markdown
              attributes:
                value:
                  Welcome to GitHub! Please fill out the information below to request to
                  be added to a GitHub Team. Once submitted, your request will be reviewed
                  by the admin team. Once approved, you will be added automatically!
            - type: input
              id: name
              attributes:
                label: Team name
                description: The name of the team you would like to join.
                placeholder: octoteam
              validations:
                required: true
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-2xl font-bold text-center">Rendered output</h1>

      <Card className="max-w-[800px] p-4">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              className="space-y-8"
              style={{ width: '100%' }}>
              <FormField
                control={form.control}
                name="title"
                render={() => (
                  <FormItem>
                    <FormLabel>Add a title</FormLabel>
                    <FormControl>
                      <Input value="[Request] New Repository" />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />
              <span>
                Welcome to GitHub! Please fill out the information below to
                request to be added to a GitHub Team. Once submitted, your
                request will be reviewed by the admin team. Once approved, you
                will be added automatically!
              </span>
              <br />
              <br />
              <FormField
                control={form.control}
                name="teamName"
                render={() => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="octoteam" />
                    </FormControl>
                    <FormDescription>
                      The name of the team you would like to join.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <h1 className="text-4xl font-bold text-center">Pull requests</h1>

      <span>
        Pull requests add extra features and metadata on top of issues. Many
        GitHub APIs support interacting with both at the same time! These
        additional features, along with examples of how to use them in IssueOps
        workflows, are listed in the following sections.
      </span>

      <h1 className="text-3xl font-bold text-center">
        Pull request permissions
      </h1>

      <span>
        In order to create a pull request, the required permissions will differ
        based on the location of the branch you wish to merge.
      </span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Same repository (branch)</TableCell>
              <TableCell>Write access</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Different repository (fork)</TableCell>
              <TableCell>Read access</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="text-3xl font-bold text-center">Reviews and approvals</h1>

      <span>
        Unlike issues, PRs support reviews and approvals out of the box. When
        changes are ready to be merged, you can assign individuals or teams as
        reviewers.{' '}
        <Link
          href="https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches"
          className="text-blue-500 hover:underline">
          Branch protection
        </Link>{' '}
        can also be used to enforce required reviewers and other checks before a
        PR can be merged.
      </span>

      <span>
        When your IssueOps workflow includes changes to the contents of a
        repository, using PRs instead of issues is a great option to enforce
        specific approval settings without having to include additional
        workflows for tracking approvals as comments.
      </span>

      <h1 className="text-3xl font-bold text-center">Status checks</h1>

      <span>
        Status checks run any time a PR is created or updated. These can range
        from code quality checks to security scans and more. You can use status
        checks to ensure that the changes in a PR meet your organization&apos;s
        standards before they are merged.
      </span>

      <span>
        In an IssueOps workflow, there are two ways you can use status checks:
        to validate the contents of the PR, and to validate the contents of the
        issue.
      </span>

      <span>
        Validation is a <b>critical</b> aspect to consider when designing your
        workflow. If your workflow is best suited for PRs, status checks can be
        used to run your validation workflow any time the PR is updated.
        Combined with branch protection rules specifying required status checks,
        you can ensure that validation rules pass before a PR can change states.
      </span>

      <h1 className="text-3xl font-bold text-center">
        Deployments and Environments
      </h1>

      <span>
        When a GitHub Actions workflow runs that specifies an environment, a
        deployment is created. Deployments track the successful/failed status of
        a workflow run, and link it to the targeted environment.
      </span>

      <span>
        A great example of an IssueOps workflow that uses PRs, deployments, and
        environments is the branch deploy model. A detailed explanation can be
        found in the{' '}
        <Link
          href="/reference/branch-deployments"
          className="text-blue-500 hover:underline">
          reference
        </Link>
        .
      </span>
    </div>
  )
}
