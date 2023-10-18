import { themeGet, useTheme } from '@primer/react'

import React, { ReactElement } from 'react'
import { styled } from 'styled-components'

const StyledParagraph = styled.p`
  margin: 0 0 ${(props) => themeGet('space.3')(props)};
`

const Paragraph = (props: any): ReactElement => {
  const theme = useTheme()

  return <StyledParagraph {...props} theme={theme} />
}

export default Paragraph
