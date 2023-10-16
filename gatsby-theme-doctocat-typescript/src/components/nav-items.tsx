import { useLocation } from '@gatsbyjs/reach-router'
import { NavList } from '@primer/react'

import { Link, withPrefix } from 'gatsby'
import React, { ReactElement, ReactNode } from 'react'

import VisuallyHidden from './visually-hidden'

type NavItemType = {
  title: string
  url?: string
  children?: NavItemType[]
}

function NavItem({
  href,
  children
}: {
  href: string
  children: ReactNode
}): ReactElement {
  const location = useLocation()
  const isCurrent = withPrefix(href) === location.pathname

  return (
    <NavList.Item
      as={Link}
      to={href}
      aria-current={isCurrent ? 'page' : undefined}>
      {children}
    </NavList.Item>
  )
}

export default function NavItems({
  items
}: {
  items: NavItemType[]
}): ReactElement {
  return (
    <>
      <VisuallyHidden>
        <h3>Site navigation</h3>
      </VisuallyHidden>
      <NavList aria-label="Site">
        {items.map((item) => (
          <React.Fragment key={item.title}>
            {item.children ? (
              <NavList.Group title={item.title}>
                {item.children.map((child) => (
                  <NavItem key={child.title} href={child.url || '#'}>
                    {child.title}
                    {child.children ? (
                      <NavList.SubNav>
                        {child.children.map((subChild) => (
                          <NavItem
                            key={subChild.title}
                            href={subChild.url || '#'}>
                            {subChild.title}
                          </NavItem>
                        ))}
                      </NavList.SubNav>
                    ) : null}
                  </NavItem>
                ))}
              </NavList.Group>
            ) : (
              <NavItem href={item.url || '#'}>{item.title}</NavItem>
            )}
          </React.Fragment>
        ))}
      </NavList>
    </>
  )
}
