'use client'

import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">
        Workflow Security
      </h1>

      <span>
        The IssueOps model makes heavy use of the <code>issue</code> and{' '}
        <code>issue_comment</code> triggers in GitHub Actions workflows.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          on:
            issue_comment:
              types:
                - created
          `}
        </SyntaxHighlighter>
      </div>

      <span>
        These triggers will only act on workflow files in the <i>default</i>{' '}
        branch of your repository. This means that pull requests cannot
        introduce changes to your IssueOps workflows that would be run as part
        of that PR (e.g. creating a workflow that dumps secrets to the logs).
        Any changes to the workflow files can be protected with branch
        protection rules to ensure only verified changes make it into your
        default branch.
      </span>

      <h1 className="text-4xl font-bold text-center">Workflow permissions</h1>

      <span>
        To further harden your workflow files, you should always restrict them
        to the base permissions needed to run. For information about the
        available permissions, see{' '}
        <Link
          href="https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs"
          className="text-blue-500 hover:underline">
          Assigning permissions to jobs
        </Link>
        .
      </span>

      <span>
        Permissions can be assigned for the entire workflow, as well as for
        individual jobs. If one job needs additional permissions, make sure to
        scope them to that job only.
      </span>
    </div>
  )
}
