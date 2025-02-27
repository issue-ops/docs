'use client'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
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

      <br />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Example</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/casa-vega/issue-ops"
                  className="text-blue-500 hover:underline">
                  GitHub Issue Operations via Actions
                </Link>
              </TableCell>
              <TableCell>
                A self-service approach for managing github components/settings
                across multiple instances of GitHub and GitHub Enterprise.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link
                  href="https://github.com/stochastical/abstractnonsense"
                  className="text-blue-500 hover:underline">
                  Create Blog Posts from Issues
                </Link>
              </TableCell>
              <TableCell>
                Build and deploy blog posts from issue forms.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
