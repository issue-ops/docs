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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">IssueOps Actions</h1>

      <span>
        This page contains a list of useful actions for IssueOps workflows. If
        you know of any, feel free to submit a PR to add it to the list!
      </span>

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
                  <code style={{ color: 'black' }}>actions/add-to-project</code>
                </Link>
              </TableCell>
              <TableCell>Add issues to project boards</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/actions/create-github-app-token"
                  className="text-blue-500 hover:underline">
                  <code style={{ color: 'black' }}>
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
                  <code style={{ color: 'black' }}>issue-ops/labeler</code>
                </Link>
              </TableCell>
              <TableCell>Bulk add/remove labels</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/parser"
                  className="text-blue-500 hover:underline">
                  <code style={{ color: 'black' }}>issue-ops/parser</code>
                </Link>
              </TableCell>
              <TableCell>Parse an issue into JSON</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/releaser"
                  className="text-blue-500 hover:underline">
                  <code style={{ color: 'black' }}>issue-ops/releaser</code>
                </Link>
              </TableCell>
              <TableCell>Automatically create releases</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/semver"
                  className="text-blue-500 hover:underline">
                  <code style={{ color: 'black' }}>issue-ops/semver</code>
                </Link>
              </TableCell>
              <TableCell>Automatically handle version tags</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/issue-ops/validator"
                  className="text-blue-500 hover:underline">
                  <code style={{ color: 'black' }}>issue-ops/validator</code>
                </Link>
              </TableCell>
              <TableCell>Validate issues against custom rules</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/github/command"
                  className="text-blue-500 hover:underline">
                  <code style={{ color: 'black' }}>github/command</code>
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
