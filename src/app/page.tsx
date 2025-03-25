'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  LockIcon,
  PencilIcon,
  SearchIcon,
  ZapIcon
} from '@primer/octicons-react'
import { Construction, Terminal } from 'lucide-react'
import Link from 'next/link'

const carouselItems = [
  {
    icon: ZapIcon,
    title: 'Event-driven',
    description:
      'Any time a user interacts with an issue or PR, an event is triggered. These events can be used to trigger GitHub Actions workflows.'
  },
  {
    icon: PencilIcon,
    title: 'Customizable',
    description:
      'Based on the event type and data provided, you can implement custom logic to perform virtually any task. If you can interact with it via an API, command-line tool, or script, you can probably build it with IssueOps.'
  },
  {
    icon: SearchIcon,
    title: 'Transparent',
    description:
      'All actions taken on an issue are recorded in the issue timeline.'
  },
  {
    icon: LockIcon,
    title: 'Immutable',
    description:
      'An issue or pull request creates an immutable record of the transaction, approvals, and actions that are taken. This follows GitHub\'s "everything has a URL" philosophy.'
  }
]

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl sm:text-5xl font-bold pt-[20px]">
        The one stop shop for all things IssueOps
      </h1>

      <p>
        If you landed on this page, you&apos;re probably trying to find the
        answer to the question <i>What is IssueOps?</i> If so, you came to the
        right place! The goal of this site is to provide education, best
        practices, examples, and resources for building IssueOps workflows on
        GitHub.
      </p>

      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Under Construction</AlertTitle>
        <AlertDescription>
          This site is a work in progress. If you have any feedback, please{' '}
          <Link
            href="https://github.com/issue-ops/docs/issues/new"
            className="text-blue-500 hover:underline">
            open an issue!
          </Link>{' '}
          If you&apos;re interested in contributing, check out our{' '}
          <Link
            href="https://github.com/issue-ops/docs/blob/main/CONTRIBUTING.md"
            className="text-blue-500 hover:underline">
            contribution guide.
          </Link>
        </AlertDescription>
      </Alert>

      <h2 className="text-xl sm:text-2xl font-bold">What is IssueOps?</h2>

      <p>
        IssueOps is a loose collection of tools, workflows, and concepts that
        can be applied to{' '}
        <Link
          href="https://github.com/features/issues"
          className="text-blue-500 hover:underline">
          GitHub Issues
        </Link>{' '}
        to drive a nearly limitless number of workflows. Like many of the other
        &quot;Ops&quot; tools, (ChatOps, GitOps, and so on), IssueOps leverages
        a friendly interface to drive behind-the-scenes automation. In this
        case, issues and pull requests (PRs) are the interface, and GitHub
        Actions is the automation engine.
      </p>

      <p>
        IssueOps isn&apos;t just a DevOps tool! You can run anything from
        complex CI/CD pipelines to a bed and breakfast reservation system. If
        you can interact with it via an API, there&apos;s a good chance you can
        build it with IssueOps!
      </p>

      {/* TODO: Animation of IssueOps example */}

      <h2 className="text-xl sm:text-2xl font-bold">
        Why should I use IssueOps?
      </h2>

      <Carousel
        className="w-full max-w-xs"
        opts={{
          loop: true
        }}>
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardHeader className="flex items-center justify-center">
                    <item.icon className="h-6 w-6" />
                    <h4>{item.title}</h4>
                  </CardHeader>
                  <CardContent className="">{item.description}</CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <h2 className="text-xl sm:text-2xl font-bold">How do I get started?</h2>

      <p>
        Check out the resources on this site to learn more about IssueOps and
        how to build your own workflows.
      </p>

      <p>
        If you&apos;re looking for inspiration and a practical demonstration,
        check out{' '}
        <Link
          href="https://issue-ops.github.io/bear-creek-honey-farm/"
          className="text-blue-500 hover:underline">
          Bear Creek Honey Farm
        </Link>
        ! This is a fictional bed and breakfast reservation system drive by
        IssueOps workflows. The source code for this example can be found in the{' '}
        <Link
          href="https://github.com/issue-ops/bear-creek-honey-farm"
          className="text-blue-500 hover:underline">
          issue-ops/bear-creek-honey-farm
        </Link>{' '}
        and{' '}
        <Link
          href="https://github.com/issue-ops/demo-reservation-action"
          className="text-blue-500 hover:underline">
          issue-ops/demo-reservation-action
        </Link>{' '}
        repositories.
      </p>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Have a Cool Example?</AlertTitle>
        <AlertDescription>
          If you have an interesting IssueOps project you&apos;d like featured,
          send us a PR!
        </AlertDescription>
      </Alert>
    </div>
  )
}
