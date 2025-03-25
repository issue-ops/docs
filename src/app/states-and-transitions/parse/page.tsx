'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Info, Package } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import dedent from 'ts-dedent'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string(),
  repoName: z.string(),
  visibility: z.enum(['private', 'public']),
  readTeam: z.string(),
  writeTeam: z.string(),
  autoInit: z.enum(['true', 'false']),
  topics: z.string().optional()
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px]">Parse</h1>

      <p>
        When a new issue is opened, before any action can be taken on it, you
        should parse its contents and turn it into a machine-readable format.
        The{' '}
        <Link
          href="https://github.com/issue-ops/parser"
          className="text-blue-500 hover:underline">
          <code className="text-blue-500 hover:underline">
            issue-ops/parser
          </code>
        </Link>{' '}
        action does this by comparing the body of the issue with the original
        issue form template. This way, you can directly reference issue form
        fields without having to parse the body yourself with regular
        expressions.
      </p>

      <Alert>
        <Package className="h-4 w-4" />
        <AlertTitle>NPM Package</AlertTitle>
        <AlertDescription>
          This is also available as a standalone npm package,{' '}
          <Link
            href="https://www.npmjs.com/package/@github/issue-parser"
            className="text-blue-500 hover:underline">
            <code className="text-blue-500 hover:underline">
              @github/issue-parser
            </code>
          </Link>
        </AlertDescription>
      </Alert>

      <p>
        This action provides specific output formats based on the{' '}
        <code>type</code>
        property of the input.
      </p>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Input type</TableCell>
              <TableCell>Example parsed output</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>input</code>
              </TableCell>
              <TableCell>
                <code style={{ color: 'black' }}>&quot;octorepo&quot;</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>textarea</code>
              </TableCell>
              <TableCell>
                <code style={{ color: 'black' }}>
                  &quot;This is a description!\n\nIt is multiline, too!&quot;
                </code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>dropdown</code>
              </TableCell>
              <TableCell>
                <code
                  style={{ color: 'black' }}>{`["octocat", "issueops"]`}</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code style={{ color: 'black' }}>checkboxes</code>
              </TableCell>
              <TableCell>
                <code
                  style={{
                    color: 'black'
                  }}>{`{ "selected": ["Yes"], "unselected": ["No"] }`}</code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <p>
        Depending on how you&apos;re processing the input data, different types
        may be more helpful than others! Based on the issue form template and
        the contents of the issue itself, the <code>json</code> output will look
        similar to the following:
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="json" style={vscDarkPlus} showLineNumbers>
          {dedent`
          {
            "the_name_of_the_thing": "this-thing",
            "the_nickname_of_the_thing": "thing",
            "the_color_of_the_thing": ["blue"],
            "the_shape_of_the_thing": ["square"],
            "the_sounds_of_the_thing": ["re", "mi"],
            "the_topics_about_the_thing": [],
            "the_description_of_the_thing": "This is a description.\\n\\nIt has lines.",
            "the_notes_about_the_thing": "- Note\\n- Another note\\n- Lots of notes",
            "the_code_of_the_thing": "const thing = new Thing()\\n\\nthing.doThing()",
            "the_string_method_of_the_code_of_the_thing": "thing.toString()",
            "is_the_thing_a_thing": {
              "selected": ["Yes"],
              "unselected": ["No"]
            },
            "is_the_thing_useful": {
              "selected": ["Sometimes"],
              "unselected": ["Yes", "No"]
            },
            "read_team": "IssueOps-Demo-Readers",
            "write_team": "IssueOps-Demo-Writers"
          }
          `}
        </SyntaxHighlighter>
      </div>

      <p>
        Once an issue has been parsed, the next step is to{' '}
        <Link
          href="/states-and-transitions/validate"
          className="text-blue-500 hover:underline">
          validate
        </Link>{' '}
        the contents to make sure the request isn&apos;t missing data,
        doesn&apos;t contain invalid data, and can be processed by your
        workflow.
      </p>

      <h1 className="text-4xl font-bold">New repository request</h1>

      <h1 className="text-3xl font-bold">Issue form template</h1>

      <p>
        The new repository worklow starts off with the following issue form
        template.
      </p>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          name: New Repository Request
          description: Submit a request to create a new GitHub repository
          title: '[Request] New Repository'
          labels:
            - issueops:new-repository

          body:
            - type: markdown
              attributes:
                value:
                  Welcome to GitHub! Please fill out the information below to request a
                  new repository. Once submitted, your request will be reviewed by the
                  IssueOps team. If approved, the repository will be created and you will
                  be notified via a comment on this issue.
            - type: input
              id: name
              attributes:
                label: Repository Name
                description: The name of the repository you would like to create.
                placeholder: octorepo
              validations:
                required: true
            - type: dropdown
              id: visibility
              attributes:
                label: Repository Visibility
                description: The visibility of the repository.
                multiple: false
                options:
                  - private
                  - public
              validations:
                required: true
            - type: input
              id: read-team
              attributes:
                label: Read Team
                description: The GitHub Team that will get read access to the repository.
                placeholder: octocat-readers
              validations:
                required: true
            - type: input
              id: write-team
              attributes:
                label: Write Team
                description: The GitHub Team that will get write access to the repository.
                placeholder: octocat-writers
              validations:
                required: true
            - type: dropdown
              id: auto-init
              attributes:
                label: Auto Init
                description: Select \`true\` to initialize the repository with a \`README\`.
                multiple: false
                options:
                  - 'true'
                  - 'false'
              validations:
                required: true
            - type: textarea
              id: topics
              attributes:
                label: Topics
                description:
                  (Optional) A list of topics to add to the repository. Separate each
                  topic with a new line.
                placeholder: |
                  octocat
                  octodog
              validations:
                required: false
          `}
        </SyntaxHighlighter>
      </div>

      <p>
        When a user submits a request for a new repository, the issue form will
        look something like this:
      </p>

      <Card className="max-w-[800px] p-4">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              className="space-y-8"
              style={{ width: '100%' }}>
              <FormField
                control={form.control}
                name="title"
                render={() => (
                  <FormItem>
                    <FormLabel>Add a title</FormLabel>
                    <FormControl>
                      <Input value="[Request] New Repository" />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />
              <p>
                Welcome to GitHub! Please fill out the information below to
                request a new repository. Once submitted, your request will be
                reviewed by the IssueOps team. If approved, the repository will
                be created and you will be notified via a comment on this issue.
              </p>
              <FormField
                control={form.control}
                name="repoName"
                render={() => (
                  <FormItem>
                    <FormLabel>Repository Name</FormLabel>
                    <FormControl>
                      <Input placeholder="octorepo" />
                    </FormControl>
                    <FormDescription>
                      The name of the repository you would like to create.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visibility"
                render={() => (
                  <FormItem>
                    <FormLabel>Repository Visibility</FormLabel>
                    <Select value="public">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">public</SelectItem>
                        <SelectItem value="private">private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The visibility of the repository.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="readTeam"
                render={() => (
                  <FormItem>
                    <FormLabel>Read Team</FormLabel>
                    <FormControl>
                      <Input placeholder="octocat-readers" />
                    </FormControl>
                    <FormDescription>
                      The GitHub Team that will get read access to the
                      repository.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="writeTeam"
                render={() => (
                  <FormItem>
                    <FormLabel>Write Team</FormLabel>
                    <FormControl>
                      <Input placeholder="octocat-writers" />
                    </FormControl>
                    <FormDescription>
                      The GitHub Team that will get write access to the
                      repository.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autoInit"
                render={() => (
                  <FormItem>
                    <FormLabel>Auto Init</FormLabel>
                    <Select value="true">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">true</SelectItem>
                        <SelectItem value="false">false</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select <code>true</code> to initialize the repository with
                      a <code>README</code>.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topics"
                render={() => (
                  <FormItem>
                    <FormLabel>Topics</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={dedent`
                        octocat
                        octodog
                        `}
                      />
                    </FormControl>
                    <FormDescription>
                      (Optional) A list of topics to add to the repository.
                      Separate each topic with a new line.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <h1 className="text-3xl font-bold">GitHub Actions workflow</h1>

      <p>
        Creating an issue will kick off the start of the IssueOps process.
        However, in order to do anything with the request, we need to parse the
        issue body and extract the information we need to get approval and
        create a repository.
      </p>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Tips and Tricks</AlertTitle>
        <AlertDescription>
          Check the workflow comments for useful tips!
        </AlertDescription>
      </Alert>

      <div className="overflow-auto max-w-full">
        <SyntaxHighlighter language="yaml" style={vscDarkPlus} showLineNumbers>
          {dedent`
          name: Issue Opened/Edited/Reopened

          # At minimum, the issue body should be parsed any time an issue is opened,
          # edited, or reopened. This ensures that the most up to date information is
          # validated.
          on:
            issues:
              types:
                - opened
                - edited
                - reopened

          jobs:
            # Different request types may have different inputs. For example, a new
            # repository request may have different inputs than a repository transfer
            # request. You can create multiple jobs to parse different types of requests
            # in the same workflow. Labels can be used to control which jobs run for
            # which types of requests.
            new-repository-request:
              name: New Repository Request
              runs-on: ubuntu-latest

              # Assign labels for different types of requests, and use those labels to
              # trigger different workflows, jobs, and steps.
              if: contains(github.event.issue.labels.*.name, 'issueops:new-repository')

              # Initially, this workflow only needs permissions to read issues and
              # contents. This will be expanded later as we build additional
              # functionality.
              permissions:
                contents: read
                issues: read

              steps:
                # Get the repository contents. This lets the workflow reference files in
                # the repository such as the issue form template.
                - name: Checkout
                  id: checkout
                  uses: actions/checkout@vX.X.X

                - name: Parse Issue
                  id: parse
                  uses: issue-ops/parser@vX.X.X
                  with:
                    body: \${{ github.event.issue.body }}
                    issue-form-template: new-repository-request.yml

                - name: Output the Parsed Issue
                  id: output
                  run: echo \${{ steps.parse.outputs.json }}
          `}
        </SyntaxHighlighter>
      </div>

      <h1 className="text-3xl font-bold">Next steps</h1>

      <p>
        At this point, our issue has successfully transitioned into the{' '}
        <code>Parsed</code>
        state. This means that we have a machine-readable representation of the
        request that can be further processed by our workflows. However, we
        don&apos;t know if the request actually contains valid information! The
        next transition involves validating the parsed request against a set of
        rules to make sure it&apos;s ready to be processed.
      </p>

      <p>
        Continue to the next section to learn about{' '}
        <Link
          href="/states-and-transitions/validate"
          className="text-blue-500 hover:underline">
          validation
        </Link>
        .
      </p>
    </div>
  )
}
