import { themeGet, useTheme } from '@primer/react'

import React, { ReactElement } from 'react'
import { styled } from 'styled-components'

const StyledInlineCode = styled.code`
  padding: 0.2em 0.4em;
  font-family: ${(props) => themeGet('fonts.mono')(props)};
  font-size: 85%;
  background-color: ${(props) =>
    themeGet(`colorSchemes.${props.theme.colorScheme}.colors.neutral.muted`)(
      props
    )};
  border-radius: ${(props) => themeGet('radii.2')(props)};
`

const InlineCode = (props: any): ReactElement => {
  const theme = useTheme()

  return <StyledInlineCode {...props} theme={theme} />
}

export default InlineCode
