'use client'

import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px]">Repository</h1>

      <p>
        This page outlines recommended configuration settings for IssueOps
        repositories. For instructions on how to create a repository, see the{' '}
        <Link
          href="https://docs.github.com/en/get-started/quickstart/create-a-repo"
          className="text-blue-500 hover:underline">
          GitHub documentation
        </Link>
        .
      </p>

      <h1 className="text-4xl font-bold">Visibility</h1>

      <p>
        IssueOps works best when your repository is accessible to users who need
        to submit requests. Depending on if the repository is owned by an
        organization or a user account, you can set the visibility to one of the
        following:
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell>Visibility</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Organization</TableCell>
              <TableCell>
                <code style={{ color: 'black' }}>public</code> or{' '}
                <code style={{ color: 'black' }}>internal</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>
                <code style={{ color: 'black' }}>public</code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <p>
        Alternatively, if you only want to allow specific users to submit
        requests, you can set the visibility to <code>private</code> and add
        those users as{' '}
        <Link
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository"
          className="text-blue-500 hover:underline">
          collaborators
        </Link>
        .
      </p>

      <h1 className="text-4xl font-bold">Permissions</h1>

      <p>
        Users only need <code>read</code> access to open issues! Unless there is
        a specific reason to do otherwise, you should only ever need to grant{' '}
        <code>read</code> access.
      </p>

      <p>
        The primary reason to grant <code>write</code> access is if your
        IssueOps flow uses pull requests instead of issues, but only if you want
        users to create pull requests from branches in the <i>same</i>{' '}
        repository. As an alternative, you can allow forking of your repository
        and users can create pull requests from their forked repository instead.
      </p>

      <h1 className="text-4xl font-bold">Branch protection</h1>

      <p>
        <Link
          href="https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches"
          className="text-blue-500 hover:underline">
          Branch protection rules
        </Link>{' '}
        are a good idea regardless of what your repository is being used for!
        You should always protect your default branch (usually <code>main</code>
        ) and any other branches that you want to prevent accidental changes to.
      </p>

      <p>
        For an IssueOps repository, you should create a branch protection rule
        for <code>main</code> that enables the following:
      </p>

      <ul className="list-disc list-inside">
        <li>Require a pull request before merging</li>
        <li>
          Require status checks to pass before merging (add any continuous
          integration or testing workflows that you use)
        </li>
        <li>Require branches to be up to date before merging</li>
        <li>
          Require review from Code Owners (if your repository has a{' '}
          <code>CODEOWNERS</code> file)
        </li>
      </ul>

      <h1 className="text-4xl font-bold">GitHub Actions</h1>

      <h1 className="text-3xl font-bold">Fork pull request workflows</h1>

      <p>
        If your IssueOps workflow uses pull requests instead of issues, you must
        be careful about the configuration of GitHub Actions and what
        permissions are allowed for fork pull requests. The following settings
        can be enabled for fork pull requests, with a description of the risks
        involved.
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Setting</TableCell>
              <TableCell>Risk</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Run workflows from fork pull requests</TableCell>
              <TableCell>
                Forks will have read permissions to your repository
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Send write tokens to workflows from fork pull requests
              </TableCell>
              <TableCell>
                Forks will have <b>write</b> permissions to your repository
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Send secrets and variables to workflows from fork pull requests
              </TableCell>
              <TableCell>
                Forks will have access to your secrets and variables
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Require approval for fork pull request workflows
              </TableCell>
              <TableCell>
                Forks will not be able to run workflows until they are approved
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <p>
        As you can guess, the safest option is to not allow fork pull requests
        to run workflows at all. However, this may not be practical for your
        workflow. Here are some recommended settings:
      </p>

      <Tabs defaultValue="token-do" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="token-do">Do</TabsTrigger>
          <TabsTrigger value="token-dont">Don&apos;t</TabsTrigger>
        </TabsList>
        <TabsContent value="token-do">
          <Card>
            <CardHeader>
              <CardDescription>
                Document required permissions for contributors to run the
                workflows themselves
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="token-dont">
          <Card>
            <CardHeader>
              <CardDescription>
                Send write tokens to fork pull requests
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="secrets-do" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="secrets-do">Do</TabsTrigger>
          <TabsTrigger value="secrets-dont">Don&apos;t</TabsTrigger>
        </TabsList>
        <TabsContent value="secrets-do">
          <Card>
            <CardHeader>
              <CardDescription>
                Document the required secrets and variables and how to generate
                them
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="secrets-dont">
          <Card>
            <CardHeader>
              <CardDescription>
                Send secrets and variables to workflows from fork pull requests
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <p>
        One alternative to consider is to &quot;wrap&quot; the creation of the
        PR into part of your IssueOps flow. If the content of the PR will follow
        a known format, you can use a GitHub Action to create the PR on behalf
        of the user. This will allow you to remove the need to allow any GitHub
        Actions access to fork pull requests.
      </p>

      <h1 className="text-3xl font-bold">Workflow permissions</h1>

      <p>
        In the repository settings, it is best to keep the base workflow
        permissions limited to{' '}
        <i>Read repository contents and packages permissions</i>. Within each
        IssueOps workflow, you can increase the permissions as needed for
        specific jobs.
      </p>

      <h1 className="text-4xl font-bold">Environments</h1>

      <p>
        If your IssueOps workflow involves deployments or interaction with
        environments, you should consider adding enviroment-specific rules to
        restrict deployments to only the <code>main</code> branch. A common
        exception to this rule is if you are running IssueOps workflows from
        pull requests, as these will be run from branches other than{' '}
        <code>main</code>.
      </p>

      <p>
        This is also a good opportunity to further restrict access to secrets
        and variables by defining them at the environment level!
      </p>

      <h1 className="text-4xl font-bold">Other considerations</h1>

      <p>
        A few common questions and answers about repository setup. Most of the
        time, the answer is &quot;it depends!&quot;, but these are some things
        to consider.
      </p>

      <h1 className="text-3xl font-bold">
        Multiple IssueOps workflows in one repository
      </h1>

      <p>
        There are some tradeoffs to consider when using one or multiple
        repositories to host different IssueOps workflows. For example, suppose
        you have the following workflows:
      </p>

      <ul className="list-disc list-inside">
        <li>Team membership requests</li>
        <li>New repository creation requests</li>
      </ul>

      <p>
        If you use a single repository, one challenge you may run into is
        ensuring that jobs for the team membership requests don&apos;t affect
        new repository requests. This is where labels are particularly helpful!
        You can use labels to scope jobs to specific requests.
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          name: Issue Opened/Edited

          on:
            issues:
              types:
                - opened
                - edited

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
    </div>
  )
}
