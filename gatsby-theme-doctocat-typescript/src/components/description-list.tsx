import { themeGet, useTheme } from '@primer/react'

import React, { ReactElement } from 'react'
import { styled } from 'styled-components'

const StyledDescriptionList = styled.dl`
  padding: 0;

  dt {
    padding: 0;
    margin-top: ${themeGet('space.3')({})};
    font-size: 1em;
    font-style: italic;
    font-weight: ${themeGet('fontWeights.bold')({})};
  }

  dd {
    padding: 0 ${themeGet('space.3')({})};
    margin: 0 0 ${themeGet('space.3')({})};
  }
`

const DescriptionList = (props: any): ReactElement => {
  const theme = useTheme()

  return <StyledDescriptionList {...props} theme={theme} />
}

export default DescriptionList
