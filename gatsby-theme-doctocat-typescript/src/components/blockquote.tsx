import { themeGet, useTheme } from '@primer/react'

import React from 'react'
import { styled } from 'styled-components'

const StyledBlockquote: any = styled.blockquote`
  margin: 0 0 ${(props) => themeGet('space.3')(props)};
  padding: 0 ${(props) => themeGet('space.3')(props)};
  color: ${(props) =>
    themeGet(`colorSchemes.${props.theme.colorScheme}.colors.fg.muted`)(props)};
  border-left: 0.25em solid
    ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.border.default`)(
        props
      )};

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`

const Blockquote = (props: any) => {
  const theme = useTheme()

  return <StyledBlockquote {...props} theme={theme} />
}

export default Blockquote
