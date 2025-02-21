'use client'

import { NavMain } from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { MarkGithubIcon } from '@primer/octicons-react'
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import {
  BookOpen,
  Bot,
  DockIcon,
  GalleryVerticalEnd,
  type LucideIcon,
  Settings2,
  SquareTerminal
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { NavFooter } from './nav-footer'

const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    }
  ],
  navMain: [
    {
      title: 'Introduction',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'About',
          url: '/docs/introduction'
        },
        {
          title: 'Issues and PRs',
          url: '/docs/introduction/issues-and-prs'
        },
        {
          title: 'Workflow Security',
          url: '/docs/introduction/workflow-security'
        },
        {
          title: 'Best Practices',
          url: '/docs/introduction/best-practices'
        }
      ]
    },
    {
      title: 'Setup',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'About',
          url: '/docs/setup'
        },
        {
          title: 'Repository',
          url: '/docs/setup/repository'
        },
        {
          title: 'GitHub App',
          url: '/docs/setup/github-app'
        },
        {
          title: 'Issue Form',
          url: '/docs/setup/issue-form'
        },
        {
          title: 'Issue Workflow',
          url: '/docs/setup/issue-workflow'
        },
        {
          title: 'Comment Workflow',
          url: '/docs/setup/comment-workflow'
        }
      ]
    },
    {
      title: 'States and Transitions',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'About',
          url: '/docs/states-and-transitions'
        },
        {
          title: 'Parse',
          url: '/docs/states-and-transitions/parse'
        },
        {
          title: 'Validate',
          url: '/docs/states-and-transitions/validate'
        },
        {
          title: 'Submit',
          url: '/docs/states-and-transitions/submit'
        },
        {
          title: 'Approve',
          url: '/docs/states-and-transitions/approve'
        },
        {
          title: 'Deny',
          url: '/docs/states-and-transitions/deny'
        }
      ]
    },
    {
      title: 'Reference',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'IssueOps Actions',
          url: '/docs/reference/issueops-actions'
        },
        {
          title: 'Branch Deployments',
          url: '/docs/reference/branch-deployments'
        },
        {
          title: 'Examples',
          url: '/docs/reference/examples'
        }
      ]
    }
  ]
}

const footer = [
  {
    name: 'issue-ops/docs',
    url: 'https://github.com/issue-ops/docs',
    icon: MarkGithubIcon as LucideIcon
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  asChild>
                  <Link href="/">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <DockIcon className="h-4 w-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        IssueOps Docs
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter projects={footer} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
