import { RubyIcon } from '@primer/octicons-react'
import { Link, Text, Box } from '@primer/react'

import React, { ReactElement } from 'react'

export default function RailsLink({ href }: { href: string }): ReactElement {
  return (
    <li>
      <Link href={href} target="_blank">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <RubyIcon />
          <Text>Rails</Text>
        </Box>
      </Link>
    </li>
  )
}
