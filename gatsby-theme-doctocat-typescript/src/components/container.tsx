import { Box } from '@primer/react'

import React, { ReactElement, ReactNode } from 'react'

export default function Container({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <Box sx={{ width: '100%', maxWidth: 960, p: 5, mx: 'auto' }}>
      {children}
    </Box>
  )
}
