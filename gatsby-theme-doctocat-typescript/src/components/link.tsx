import { themeGet, useTheme } from '@primer/react'

import React from 'react'
import { styled } from 'styled-components'

const StyledLink = styled.a`
  text-decoration: underline;
  text-underline-offset: 25%;
  color: ${(props) =>
    themeGet(`colorSchemes.${props.theme.colorScheme}.colors.accent.fg`)(
      props
    )};
`

const Link = (props: any) => {
  const theme = useTheme()

  return <StyledLink {...props} theme={theme} />
}

export default Link
