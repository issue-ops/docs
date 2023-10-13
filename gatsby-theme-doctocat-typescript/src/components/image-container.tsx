import { Box } from '@primer/react'
import React, { ReactElement, ReactNode } from 'react'

export default function ImageContainer({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <Box
      sx={{
        p: 6,
        bg: 'gray.1',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 2
      }}>
      <Box
        sx={{
          img: { maxWidth: '100%' },
          justifyContent: 'center',
          display: 'flex'
        }}>
        {children}
      </Box>
    </Box>
  )
}
