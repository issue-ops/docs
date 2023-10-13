import { BaseStyles, Box } from '@primer/react'
import Frame from './frame'
import React, { ReactElement } from 'react'

// Users can shadow this file to wrap live previews.
// This is useful for applying global styles.
export default function LivePreviewWrapper({
  children
}: {
  children: React.ReactNode
}): ReactElement {
  return (
    <Frame>
      <BaseStyles>
        <Box sx={{ p: 3 }}>{children}</Box>
      </BaseStyles>
    </Frame>
  )
}
