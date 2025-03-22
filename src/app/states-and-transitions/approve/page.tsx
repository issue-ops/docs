'use client'

import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">Approve</h1>

      <span>
        In the <code>Approved</code> state, we know that the issue has been
        approved and we can begin processing it. This is one of the first states
        in the workflow where we can perform an <i>unguarded transition</i>.
      </span>

      <span>
        In our repository workflow, a request is transitioned to the{' '}
        <code>Approved</code> state when an authorized user comments on the
        request with <code>.approve</code>. However, immediately after reaching
        this state, we know we can create the repository and close the issue
        (moving it to the <code>Closed</code> state). This is called an{' '}
        <i>unguarded transition</i> because there is no condition that must be
        met before the transition occurs.
      </span>

      <span>
        The actual implementation of this transition is up to you! There are a
        few recommendations to keep in mind:
      </span>

      <ul className="list-disc list-inside">
        <li>
          Communication to users is always helpful! Consider leaving a comment
          on the issue to let the user know that their request has been approved
          and what is going to happen next. Or, comment on the issue with a
          summary of the changes that have taken place.
        </li>
        <li>
          Even after an issue is closed, users can interact with it. If you want
          to prevent this, you can{' '}
          <Link
            href="https://docs.github.com/en/communities/moderating-comments-and-conversations/locking-conversations"
            className="text-blue-500 hover:underline">
            lock the issue
          </Link>
          .
        </li>
        <li>
          Labels are a great way to organize issues. Consider adding a label to
          the issue to indicate that it has been approved.
        </li>
        <li>
          When closing an issue, choosing an appropriate reason is useful for
          future reporting. For denied requests, closing an issue as{' '}
          <code>not_planned</code> may be misleading. Consider{' '}
          <code>completed</code> instead.
        </li>
      </ul>

      <h1 className="text-4xl font-bold text-center">New repository request</h1>

      <span>
        When a new repository request is approved, we need to do the following:
      </span>

      <ol className="list-decimal list-inside">
        <li>Create the repository</li>
        <li>Comment on the issue</li>
        <li>Close the issue</li>
      </ol>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          # This job is responsible for handling approved requests.
          approve:
            name: Approve Request
            runs-on: ubuntu-latest

            # Only run after validation has completed.
            needs: validate

            steps:
              - name: Approve Command
                id: approve
                uses: github/command@vX.X.X
                with:
                  allowed_contexts: issue
                  allowlist: octo-org/approvers
                  allowlist_pat: \${{ secrets.MY_TOKEN }}
                  command: .approve

              # Create the repository.
              - if: \${{ steps.approve.outputs.continue == 'true' }}
                name: Create Repository
                id: create
                uses: actions/github-script@vX.X.X
                with:
                  github-token: \${{ secrets.MY_TOKEN }}
                  script: |
                    const request = JSON.parse('\${{ needs.validate.outputs.request }}')
                    await github.rest.repos.createInOrg({
                      org: '\${{ github.repository_owner }}',
                      name: request.name,
                    })

              # Comment on the issue to let the user know their request was denied.
              - if: \${{ steps.approve.outputs.continue == 'true' }}
                name: Post Comment
                id: comment
                uses: peter-evans/create-or-update-comment@vX.X.X
                with:
                  issue-number: \${{ github.event.issue.number }}
                  body:
                    ':tada: This request has been approved! Your repository has been
                    created.'

              # Close the issue.
              - if: \${{ steps.approve.outputs.continue == 'true' }}
                name: Close Issue
                id: close
                run: gh issue close \${{ github.event.issue.number }} --reason completed
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-4xl font-bold text-center">Next steps</h1>

      <span>Your IssueOps workflow is officially complete!</span>
    </div>
  )
}
