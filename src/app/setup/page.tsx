'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">Setting up IssueOps</h1>

      <span>
        This section will walk through the end-to-end setup process for
        configuring an IssueOps workflow. This includes setup and configuration
        of the following:
      </span>

      <ul className="list-disc list-inside">
        <li>
          <Link
            href="/setup/repository"
            className="text-blue-500 hover:underline">
            Repository
          </Link>
        </li>
        <li>
          <Link
            href="/setup/github-app"
            className="text-blue-500 hover:underline">
            GitHub App
          </Link>
        </li>
        <li>
          <Link
            href="/setup/issue-form"
            className="text-blue-500 hover:underline">
            Issue form
          </Link>
        </li>
        <li>
          <Link
            href="/setup/issue-workflow"
            className="text-blue-500 hover:underline">
            Issue workflow
          </Link>
        </li>
        <li>
          <Link
            href="/setup/comment-workflow"
            className="text-blue-500 hover:underline">
            Comment workflow
          </Link>
        </li>
      </ul>
    </div>
  )
}
