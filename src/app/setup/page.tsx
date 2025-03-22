'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">
        Setting up IssueOps
      </h1>

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
