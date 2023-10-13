import { Link, Text, Box } from '@primer/react'
import { BookIcon } from '@primer/octicons-react'
import React from 'react'

export default function SourceLink({ href }: { href: string }) {
  return (
    <li>
      <Link href={href} target="_blank">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <BookIcon />
          <Text>Storybook</Text>
        </Box>
      </Link>
    </li>
  )
}
