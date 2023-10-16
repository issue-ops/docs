import { themeGet, useTheme } from '@primer/react'

import React from 'react'
import { styled } from 'styled-components'

const StyledHorizontalRule = styled.hr`
  height: ${(props) => themeGet('borderWidths.1')(props)};
  padding: 0;
  margin: ${(props) => themeGet('space.4')(props)} 0;
  background-color: ${(props) =>
    themeGet(`colorSchemes.${props.theme.colorScheme}.colors.border.default`)(
      props
    )};
  border: 0;
`

const HorizontalRule = (props: any) => {
  const theme = useTheme()

  return <StyledHorizontalRule {...props} theme={theme} />
}

export default HorizontalRule
