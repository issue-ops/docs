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
import { Ban, CircleAlert, InfoIcon, Lock, Shield } from 'lucide-react'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">GitHub App</h1>

      <span>
        If your IssueOps workflow requires access to anything outside of the
        repository it is running in, you will need to provide it with a token.
        This token is used to authenticate with the GitHub API and should be
        scoped to the minimum permissions needed to do the job. Tokens can be
        provided two ways:
      </span>

      <ul className="list-disc list-inside">
        <li>
          <Link
            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
            className="text-blue-500 hover:underline">
            Personal access tokens (PAT)
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation"
            className="text-blue-500 hover:underline">
            GitHub App installation tokens
          </Link>
        </li>
      </ul>

      <span>
        Since PATs are scoped to a single user, they are not recommended for use
        in IssueOps workflows. GitHub Apps are a better choice because they can
        be scoped to a repository or organization to provide access to the APIs
        you need.
      </span>

      <Alert>
        <Ban className="h-4 w-4" />
        <AlertTitle>Enterprise Tokens</AlertTitle>
        <AlertDescription>
          GitHub Apps cannot currently be created at the enterprise level for
          access to administrative APIs. If you need access to these APIs, you
          will need to use a PAT. In these cases, creating a &quot;machine
          user&quot; account is recommended over a personal account.
        </AlertDescription>
      </Alert>

      <h1 className="text-4xl font-bold">Ownership</h1>

      <span>
        When creating a GitHub App, you have the option to specify your personal
        account or an organization as the owner. Choosing an organization as the
        owner allows you to grant access to multiple repositories in the
        organization and simplifies permissions management.
      </span>

      <h1 className="text-4xl font-bold">Setup</h1>

      <h1 className="text-3xl font-bold">Create a GitHub App</h1>

      <span>
        For instructions on how to create a GitHub App, see{' '}
        <Link
          href="https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps"
          className="text-blue-500 hover:underline">
          Creating GitHub Apps
        </Link>
        .
      </span>

      <span>
        The following settings are a good starting point for IssueOps workflows:
      </span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Setting</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>
                A clear name that describes its purpose and permissions
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>
                A description of what the app does and what it can access
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Homepage URL</TableCell>
              <TableCell>
                The URL to the repository with your IssueOps code
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Webhook</TableCell>
              <TableCell>Disable webhooks</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Permissions</TableCell>
              <TableCell>
                Select the <b>minimum</b> permissions needed for your workflow
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="text-3xl font-bold">Create a private key</h1>

      <span>
        For instructions on how to create a private key, see{' '}
        <Link
          href="https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps"
          className="text-blue-500 hover:underline">
          Managing private keys for GitHub Apps
        </Link>
        .
      </span>

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertTitle>Key Storage</AlertTitle>
        <AlertDescription>
          Make sure to save the private key in a secure location!
        </AlertDescription>
      </Alert>

      <h1 className="text-3xl font-bold">Create GitHub Actions secrets</h1>

      <span>
        After creating your GitHub App, you will need to create secrets that
        your IssueOps workflows can use to authenticate with the GitHub API. You
        can create these at the organization, repository, or environment level
        depending on your needs.
      </span>

      <span>
        You will need to create the following secrets. Make sure to note the
        names you give them as you will need to reference them in your
        workflows.
      </span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>App ID</TableCell>
              <TableCell>The ID of your GitHub App</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Private Key</TableCell>
              <TableCell>The private key you created</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>App ID</AlertTitle>
        <AlertDescription>
          The GitHub App ID is not a sensitive value and can be stored as a
          variable instead of a secret. It can be found on the settings page for
          your GitHub App.
        </AlertDescription>
      </Alert>

      <span>
        For instructions on how to create secrets, see the following links:
      </span>

      <ul className="list-disc list-inside">
        <li>
          <Link
            href="https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions/creating-secrets-for-a-repository"
            className="text-blue-500 hover:underline">
            Creating secrets for a repository
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions/creating-secrets-for-an-environment"
            className="text-blue-500 hover:underline">
            Creating secrets for an environment
          </Link>
        </li>
        <li>
          <Link
            href="https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions/creating-secrets-for-an-organization"
            className="text-blue-500 hover:underline">
            Creating secrets for an organization
          </Link>
        </li>
      </ul>

      <h1 className="text-4xl font-bold">Usage</h1>

      <h1 className="text-3xl font-bold">Update the workflow permissions</h1>

      <span>
        In any workflow that needs to authenticate as a GitHub App, the
        following permissions <b>must</b> be specified at the workflow or job
        level.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        permissions:
          contents: read
          id-token: write
        `}
      </SyntaxHighlighter>

      <h1 className="text-3xl font-bold">
        Generate the installation access token
      </h1>

      <span>
        There are various examples and open source actions available to create
        installation access tokens for GitHub Actions workflows. In this
        documentation, we will use the{' '}
        <Link
          href="https://github.com/actions/create-github-app-token"
          className="text-blue-500 hover:underline">
          <code>actions/create-github-app-token</code>
        </Link>{' '}
        action.
      </span>

      <span>
        Within any workflow job that needs to authenticate as your GitHub App,
        you will need to include the following step.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        steps:
          - uses: actions/create-github-app-token@vX.X.X
            id: token
            with:
              app_id: \${{ secrets.MY_GITHUB_APP_ID }}
              private_key: \${{ secrets.MY_GITHUB_APP_PEM }}
              owner: \${{ github.repository_owner }}
        `}
      </SyntaxHighlighter>

      <span>Make sure to update the following:</span>

      <ul className="list-disc list-inside">
        <li>
          Set the version (<code>vX.X.X</code>) of the action to the latest
          published version.
        </li>
        <li>
          Update the secret names to match the ones you created previously.
        </li>
      </ul>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Owner</AlertTitle>
        <AlertDescription>
          In the previous example, the <code>owner</code> property is set to the
          owner of the repository where this workflow is defined. If your GitHub
          App is installed under another owner, you will need to specify that
          instead.
        </AlertDescription>
      </Alert>

      <h1 className="text-3xl font-bold">Use the token in your workflow</h1>

      <span>
        Now that the token is being generated, you can reference it in your
        workflows as an output from the token generation step! This can be
        referenced as <code>{`\${{ steps.<step-id>.outputs.token }}`}</code>{' '}
        (e.g. <code>{`\${{ steps.token.outputs.token }}`}</code>).
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        steps:
          - uses: actions/github-script@vX.X.X
            id: create-org-project
            with:
              github-token: \${{ steps.token.outputs.token }}
              script: |
                await github.rest.projects.createForOrg({
                  org: 'octo-org',
                  name: 'My awesome project'
                })
        `}
      </SyntaxHighlighter>

      <Alert>
        <CircleAlert className="h-4 w-4" />
        <AlertTitle>Token Usage</AlertTitle>
        <AlertDescription>
          Make sure to check which steps in your workflow will need to use the
          GitHub App token versus the workflow token. For example, if you add
          the <code>issues: write</code> permission to your workflow, you do not
          need to use the GitHub App token to update issues in the <i>same</i>{' '}
          repository as your workflows. However, you will need to use the GitHub
          App token to update issues in <i>other</i> repositories!
        </AlertDescription>
      </Alert>

      <h1 className="text-4xl font-bold">Example</h1>

      <span>
        The following can be used as a starting point for your own workflows.
        Make sure to update secret names and action versions.
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        name: Example Workflow

        # This workflow runs any time an issue is opened or edited.
        on:
          issues:
            types:
              - opened
              - edited

        jobs:
          example-job:
            name: Example Job
            runs-on: ubuntu-latest

            permissions:
              contents: read
              id-token: write

            steps:
              # Get the GitHub App installation access token.
              - uses: actions/create-github-app-token@vX.X.X
                id: token
                with:
                  app_id: \${{ secrets.MY_GITHUB_APP_ID }}
                  private_key: \${{ secrets.MY_GITHUB_APP_PEM }}
                  owner: \${{ github.repository_owner }}

              - run: echo "Add your custom steps here!"
        `}
      </SyntaxHighlighter>
    </div>
  )
}
