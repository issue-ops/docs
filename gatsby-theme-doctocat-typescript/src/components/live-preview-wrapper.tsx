import { Box, themeGet } from '@primer/react'

import React, { ReactElement, ReactNode } from 'react'

// Users can shadow this file to wrap live previews.
// This is useful for applying global styles.
export default function LivePreviewWrapper({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <Box
      style={{
        padding: themeGet('space.3')({}),
        fontFamily: themeGet('fonts.normal')({}),
        width: '100%'
      }}>
      {children}
    </Box>
  )
}
