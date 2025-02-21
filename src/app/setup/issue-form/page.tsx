'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">Issue Form</h1>

      <span>
        The first interaction point users will have with your IssueOps workflow
        is the issue itself. This is where they will provide the information
        needed to kick off the workflow. Because of this, it is important to
        make sure that the issue form template is set up to capture all the
        information you need to get started.
      </span>

      <span>
        For more information on the supported options, see{' '}
        <Link
          href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms"
          className="text-blue-500 hover:underline">
          Syntax for issue forms
        </Link>
        .
      </span>

      <h1 className="text-4xl font-bold">Top-level syntax</h1>

      <span>
        The top-level syntax of the issue form template is used to define the
        title and description that users will see when they go to create an
        issue in your repository. From a usability perspective, make sure to
        include a description and title that clearly explains what the user is
        requesting and what will happen once they submit their issue.
      </span>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Labels and Projects</AlertTitle>
        <AlertDescription>
          Make sure to label your issues and assign them to projects!
        </AlertDescription>
      </Alert>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        name: Create a new repository
        description: |
          Once opened, this issue will cause a new GitHub repository to be created in
          the \`octocat\` organization. You will be granted access as a collaborator so
          you can build something awesome!
        labels:
          - issueops:new-repository
        projects:
          - octocat/123
        body:
          # ...
        `}
      </SyntaxHighlighter>

      <h1 className="text-4xl font-bold">Body syntax</h1>

      <span>
        The <code>body</code> property is where you specify the inputs and any
        other supporting information you need to collect from the user. Its
        important to make sure to collect all the information you need to get
        started, but also to make sure that the form is not too long or
        complicated.
      </span>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Labels and Projects</AlertTitle>
        <AlertDescription>
          If there&apos;s a way you can calculate certain information, consider
          doing that instead of asking the user to provide additional inputs.
          For example, you can get the user&apos;s GitHub username from the
          issue metadata (<code>{`\${{ github.event.issue.user.login }}`}</code>
          ) instead of asking them to provide it.
        </AlertDescription>
      </Alert>

      <span>
        As you are drafting your issue form template, think about the kind of
        data you are requesting and the best format to use (both for user input
        and for automated processing later).
      </span>

      <span>
        This can be confusing, because once an issue form is submitted, all the
        inputs look the same. Suppose you have the following issue form
        template:
      </span>

      <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
        {dedent`
        name: New Repo Request
        description: Submit a request to create a new GitHub repository
        title: '[Request] New Repository'
        labels:
          - issueops:new-repository

        body:
          # Markdown type fields are not included in the submitted issue body
          - type: markdown
            attributes:
              value:
                Welcome to GitHub! Please fill out the information below to request a
                new repository. Once submitted, your request will be reviewed by the
                IssueOps team. If approved, the repository will be created and you will
                be notified via a comment on this issue.
          - type: input
            id: name
            attributes:
              label: Repository Name
              description: The name of the repository you would like to create.
              placeholder: octorepo
            validations:
              required: true
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
          - type: dropdown
            id: topics
            attributes:
              label: Repository Topics
              description: The topics to add to the repository.
              multiple: true
              options:
                - octocat
                - issueops
                - automation
            validations:
              required: true
          - type: checkboxes
            id: confirm
            attributes:
              label: Confirmation
              description: Do you confirm this request?
              options:
                - label: 'Yes'
                  required: true
                - label: 'No'
                  required: false
        `}
      </SyntaxHighlighter>

      <span>
        When the user submits the issue form, it will have the following
        Markdown format:
      </span>

      <SyntaxHighlighter
        language="markdown"
        style={vscDarkPlus}
        showLineNumbers>
        {dedent`
        ### Repository Name

        octorepo

        ### Repository Visibility

        public

        ### Repository Topics

        octocat, issueops

        ### Confirmation

        - [x] Yes
        - [ ] No
        `}
      </SyntaxHighlighter>

      <span>
        You can see that certain inputs look the same, but are actually
        different types and, depending on their values, may be processed
        differently.
      </span>
    </div>
  )
}
