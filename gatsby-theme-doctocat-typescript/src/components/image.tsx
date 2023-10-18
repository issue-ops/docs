import { themeGet, useTheme } from '@primer/react'

import React, { ReactElement } from 'react'
import { styled } from 'styled-components'

const StyledImage = styled.img`
  max-width: 100%;
  box-sizing: content-box;
  background-color: ${(props) =>
    themeGet(`colorSchemes.${props.theme.colorScheme}.colors.canvas.default`)(
      props
    )};
`

const Image = (props: any): ReactElement => {
  const theme = useTheme()

  return <StyledImage {...props} theme={theme} />
}

export default Image
