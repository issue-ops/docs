'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">Examples</h1>

      <span>
        Here you can find examples of IssueOps workflows and repos from the
        developer community. If you have an example you&apos;d like to share,
        please open a PR to add it to this page!
      </span>

      <ul className="list-disc list-inside">
        <li>
          <Link
            href="https://github.com/casa-vega/issue-ops"
            className="text-blue-500 hover:underline">
            GitHub Issue Operations via Actions
          </Link>
          : A self-service approach for managing github components/settings
          across multiple instances of GitHub and GitHub Enterprise.
        </li>
      </ul>

      <ul className="list-disc list-inside">
        <li>
          <Link
            href="https://github.com/stochastical/abstractnonsense"
            className="text-blue-500 hover:underline">
            Create Blog Posts from Issues
          </Link>
        </li>
      </ul>
    </div>
  )
}
