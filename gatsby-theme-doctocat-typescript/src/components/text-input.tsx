import { TextInput as PrimerTextInput, themeGet, useTheme } from '@primer/react'

import React from 'react'
import { styled } from 'styled-components'

const StyledTextInput = styled(PrimerTextInput)`
  input {
    font-size: ${(props) => themeGet('fontSizes.2')(props)} !important;
  }

  input::placeholder {
    color: ${(props) =>
      themeGet('colorSchemes.${props.theme.colorScheme}.colors.fg.muted')(
        props
      )} !important;
  }
`

const TextInput = (props: any) => {
  const theme = useTheme()

  return <StyledTextInput {...props} theme={theme} />
}

export default TextInput
