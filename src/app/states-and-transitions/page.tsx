'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram'
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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px] text-center">
        States and Transitions
      </h1>

      <span>
        As the{' '}
        <Link href="/introduction" className="text-blue-500 hover:underline">
          introduction
        </Link>{' '}
        mentioned, IssueOps can be thought of as a state diagram where an issue
        transitions through different states in response to events and
        conditions. This section of the documentation describes some common
        states, transitions. and how to implement them in your workflows.
      </span>

      <h1 className="text-4xl font-bold text-center">States</h1>

      <span>
        If an issue was a paper form, a state would be a big rubber stamp that
        tells anyone who looks at the form exactly what is going on.
      </span>

      <span>
        Tracking state can be as simple as checking what labels are applied to
        your issues. Whatever approach you want to take, remember that tracking
        state is critical to ensure that the right processing occurs at the
        right time!
      </span>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>State</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>Opened</code>
              </TableCell>
              <TableCell>
                The initial state for a new issue that has been opened.
                Typically the first state in the lifecycle of an issue.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>Parsed</code>
              </TableCell>
              <TableCell>
                The issue body has been read and converted to machine-readable
                JSON. Usually the next immediate state after{' '}
                <code style={{ color: 'black' }}>Opened</code>.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>Validated</code>
              </TableCell>
              <TableCell>
                The issue body has been deemed valid based on any custom rules.
                Usually the next immediate state after{' '}
                <code style={{ color: 'black' }}>Parsed</code>. The next
                transitions depend on the type of request and any rules that
                must be followed.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>Submitted</code>
              </TableCell>
              <TableCell>
                The issue has been submitted for processing.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>Approved</code>
              </TableCell>
              <TableCell>The issue has been approved for processing.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>Denied</code>
              </TableCell>
              <TableCell>The issue has been denied for processing.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>Closed</code>
              </TableCell>
              <TableCell>The issue has been closed!</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Card>
        <CardHeader>
          <CardTitle>Example State Diagram</CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidDiagram id="diagram1">
            {dedent`
            stateDiagram-v2
            1 : Opened
            2 : Parsed
            3 : Validated
            4 : Submitted
            5 : Approved
            6 : Denied
            7 : Closed
            [*] --> 1
            1 --> 1 : Parse failure
            1 --> 2 : Parse success
            2 --> 2 : Validate failure
            2 --> 3 : Validate success
            3 --> 4 : Submit for processing
            4 --> 5 : Approve request
            4 --> 6 : Deny request
            5 --> 7 : Process request
            6 --> 7 : Notify user
            7 --> [*]
            `}
          </MermaidDiagram>
        </CardContent>
      </Card>

      <h1 className="text-4xl font-bold text-center">Transitions</h1>

      <span>
        If an issue was a paper form, a transition would be someone taking it
        out of their inbox, stamping it <strong>APPROVED</strong>, and putting
        it in their outbox.
      </span>

      <span>
        Transitions are where actual processing on your issues occurs. A
        transition is equivalent to an event that triggers a GitHub Actions
        workflow run. That is why, as your IssueOps workflows become larger and
        more complex, tracking state is so important. Otherwise , its easy to
        end up the wrong workflows running at the wrong time!
      </span>

      <span>Since each transition is triggered by the same type of event:</span>

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
        Your workflows must track the following to determine what jobs to run:
      </span>

      <ul className="list-disc list-inside">
        <li>Issue state</li>
        <li>Issue body</li>
        <li>Comment body (command and arguments)</li>
        <li>Any other relevant information in the issue</li>
      </ul>

      <span>
        Each of the following sections describes how to implement the core
        transitions in an IssueOps workflow. Throughout each page, you will see
        an example implementation of a new repository request workflow. This
        workflow is designed to demonstrate how to apply each concept.
      </span>

      <span>
        A full example can be found in the{' '}
        <Link
          href="https://github.com/issue-ops/bear-creek-honey-farm"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">
            issue-ops/bear-creek-honey-farm
          </code>
        </Link>{' '}
        and{' '}
        <Link
          href="https://github.com/issue-ops/demo-reservation-action"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">
            issue-ops/demo-reservation-action
          </code>
        </Link>{' '}
        repositories.
      </span>

      <ul className="list-disc list-inside">
        <li>
          <Link
            href="/states-and-transitions/parse"
            className="text-blue-500 hover:underline">
            Parse
          </Link>
        </li>
        <li>
          <Link
            href="/states-and-transitions/validate"
            className="text-blue-500 hover:underline">
            Validate
          </Link>
        </li>
        <li>
          <Link
            href="/states-and-transitions/submit"
            className="text-blue-500 hover:underline">
            Submit
          </Link>
        </li>
        <li>
          <Link
            href="/states-and-transitions/approve"
            className="text-blue-500 hover:underline">
            Approve
          </Link>
        </li>
        <li>
          <Link
            href="/states-and-transitions/deny"
            className="text-blue-500 hover:underline">
            Deny
          </Link>
        </li>
      </ul>

      <h1 className="text-4xl font-bold text-center">FAQ</h1>

      <h1 className="text-3xl font-bold text-center">
        Do my IssueOps need all these states?
      </h1>

      <span>
        Nope! You can use as many or as few states as you need. For example, if
        you don&apos;t need an authorized user to approve requests, you can omit
        the <code>Approved</code> state.
      </span>

      <h1 className="text-3xl font-bold text-center">
        Can my IssueOps use each state more than once?
      </h1>

      <span>
        Of course! In state diagrams, its common for each state to have multiple
        transitions. States can even transition back into themselves!
      </span>

      <span>
        When an issue is first opened it will be in the <code>Opened</code>{' '}
        state. Typically, the first step after an issue is opened is to parse
        the body and prepare for further processing. If this is successful, the
        issue would transition into the <code>Parsed</code> state. If there is a
        problem during parsing, the workflow can add a comment with a
        descriptive error and return the issue to the <code>Opened</code> state.
        When the user edits the issue to fix the error, parsing would run again.
      </span>

      <Card>
        <CardHeader>
          <CardTitle>Example State Diagram</CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidDiagram id="diagram2">
            {dedent`
            stateDiagram-v2
            1 : Opened
            2 : Parsed
            [*] --> 1
            1 --> 2 : Parse success
            1 --> 1 : Parse failure
            2 --> [*]
            `}
          </MermaidDiagram>
        </CardContent>
      </Card>
    </div>
  )
}
