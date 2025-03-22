'use client'

import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">Deny</h1>

      <span>
        In the <code>Denied</code> state, we know that the issue has been denied
        and there is no further action to take. This is one of the first states
        in the workflow where we can perform an <i>unguarded transition</i>.
      </span>

      <span>
        In our repository workflow, a request is transitioned to the{' '}
        <code>Denied</code>
        state when an authorized user comments on the request with{' '}
        <code>.deny</code>. However, immediately after reaching this state, we
        want to close the issue (moving it to the <code>Closed</code> state).
        This is called an <i>unguarded transition</i> because there is no
        condition that must be met before the transition occurs.
      </span>

      <span>
        The actual implementation of this transition is up to you! There are a
        few recommendations to keep in mind:
      </span>

      <ul className="list-disc list-inside">
        <li>
          Communication to users is always helpful! Consider leaving a comment
          on the issue to let the user know that their request has been denied
          and what steps, if any, they can take next.
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
          the issue to indicate that it has been denied.
        </li>
        <li>
          When closing an issue, choosing an appropriate reason is useful for
          future reporting. For denied requests, closing an issue as{' '}
          <code>completed</code> may be misleading. Consider{' '}
          <code>not_planned</code> instead.
        </li>
      </ul>

      <h1 className="text-4xl font-bold text-center">New repository request</h1>

      <span>
        When a new repository request is denied, we want to close the issue and
        leave a comment for the user. We should also add an appropriate label so
        we know the request was closed as denied.
      </span>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          # This job is responsible for handling denied requests.
          deny:
            name: Deny Request
            runs-on: ubuntu-latest

            # Only run after validation has completed.
            needs: validate

            steps:
              - name: Deny Command
                id: deny
                uses: github/command@vX.X.X
                with:
                  allowed_contexts: issue
                  allowlist: octo-org/approvers
                  allowlist_pat: \${{ secrets.MY_TOKEN }}
                  command: .deny

              # Comment on the issue to let the user know their request was denied.
              - if: \${{ steps.deny.outputs.continue == 'true' }}
                name: Post Comment
                id: comment
                uses: peter-evans/create-or-update-comment@vX.X.X
                with:
                  issue-number: \${{ github.event.issue.number }}
                  body:
                    ':no_entry_sign: This request has been denied! This issue will be
                    closed shortly.'

              # Close the issue.
              - if: \${{ steps.deny.outputs.continue == 'true' }}
                name: Close Issue
                id: close
                run: gh issue close \${{ github.event.issue.number }} --reason not_planned
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-4xl font-bold text-center">Next steps</h1>

      <span>Your IssueOps workflow is officially complete!</span>
    </div>
  )
}
