'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">
        Branch Deployments
      </h1>

      <span>
        One interesting topic to include when talking about IssueOps is branch
        deployments. At a high-level, branch deployments let you run and control
        deployments from your PRs.
      </span>

      <span>
        If you don&apos;t already know what they are, the easiest way to explain
        them is to compare them to the traditional merge deploy model. In the
        merge deploy model:
      </span>

      <ol className="list-decimal list-inside">
        <li>A developer creates a feature branch and commits changes.</li>
        <li>The developer opens a PR to get feedback from others.</li>
        <li>
          Once approved, the PR is merged and a deployment starts from the
          <code>main</code> branch.
        </li>
      </ol>

      <span>
        This works fine, but if there are bugs in the PR, you have to either
        merge in fixes or revert the commits and redeploy. In the branch deploy
        model, changes are deployed from the feature branch and validated before
        being merged into the <code>main</code> branch. This ensures that
        whatever is in <code>main</code> can be deployed at any time. If there
        is a problem with the deployment from the feature branch, you can simply
        redeploy <code>main</code> as-is.
      </span>

      <span>
        For a detailed description of the branch-deploy model, see{' '}
        <Link
          href="https://github.com/github/branch-deploy"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">
            github/branch-deploy
          </code>
        </Link>
        .
      </span>
    </div>
  )
}
