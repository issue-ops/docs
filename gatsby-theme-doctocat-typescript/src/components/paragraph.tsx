import { themeGet, useTheme } from '@primer/react'

import React from 'react'
import { styled } from 'styled-components'

const StyledParagraph = styled.p`
  margin: 0 0 ${(props) => themeGet('space.3')(props)};
`

const Paragraph = (props: any) => {
  const theme = useTheme()

  return <StyledParagraph {...props} theme={theme} />
}

export default Paragraph
