import React from 'react'
import { NavList } from '@primer/react/drafts'

export default function TableOfContents({
  'aria-labelledby': ariaLabelledBy,
  items
}: {
  'aria-labelledby': string
  items: any[]
}) {
  return (
    <NavList aria-labelledby={ariaLabelledBy}>
      {items.map((item) => (
        <NavList.Item key={item.title} href={item.url}>
          {item.title}
        </NavList.Item>
      ))}
    </NavList>
  )
}
