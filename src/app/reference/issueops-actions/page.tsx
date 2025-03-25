'use client'

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

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px]">IssueOps Actions</h1>

      <p>
        This page contains a list of useful actions for IssueOps workflows. If
        you know of any, feel free to submit a PR to add it to the list!
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/actions/add-to-project"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    actions/add-to-project
                  </code>
                </Link>
              </TableCell>
              <TableCell>Add issues to project boards</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/actions/create-github-app-token"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    actions/create-github-app-token
                  </code>
                </Link>
              </TableCell>
              <TableCell>
                Create installation access tokens for GitHub Apps
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/labeler"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    issue-ops/labeler
                  </code>
                </Link>
              </TableCell>
              <TableCell>Bulk add/remove labels</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/parser"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    issue-ops/parser
                  </code>
                </Link>
              </TableCell>
              <TableCell>Parse an issue into JSON</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/releaser"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    issue-ops/releaser
                  </code>
                </Link>
              </TableCell>
              <TableCell>Automatically create releases</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/semver"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    issue-ops/semver
                  </code>
                </Link>
              </TableCell>
              <TableCell>Automatically handle version tags</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/validator"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    issue-ops/validator
                  </code>
                </Link>
              </TableCell>
              <TableCell>Validate issues against custom rules</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/github/command"
                  className="text-blue-500 hover:underline">
                  <code className="text-blue-500 hover:underline">
                    github/command
                  </code>
                </Link>
              </TableCell>
              <TableCell>IssueOps commands for GitHub Actions</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
