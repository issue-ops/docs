import { NavList } from '@primer/react'

import React, { ReactElement } from 'react'

export default function TableOfContents({
  'aria-labelledby': ariaLabelledBy,
  items
}: {
  'aria-labelledby': string
  items: any[]
}): ReactElement {
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
