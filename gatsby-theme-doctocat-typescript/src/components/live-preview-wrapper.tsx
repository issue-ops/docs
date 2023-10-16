import { BaseStyles, Box, themeGet } from '@primer/react'

import React, { ReactElement, ReactNode } from 'react'

import Frame from './frame'

// Users can shadow this file to wrap live previews.
// This is useful for applying global styles.
export default function LivePreviewWrapper({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <Frame>
      <BaseStyles>
        <Box
          style={{
            padding: themeGet('space.3')({}),
            fontFamily: themeGet('fonts.normal')({})
          }}>
          {children}
        </Box>
      </BaseStyles>
    </Frame>
  )
}
