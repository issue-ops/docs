import { themeGet, useTheme } from '@primer/react'
import shouldForwardProp from '@styled-system/should-forward-prop'

import React from 'react'
import { styled } from 'styled-components'
import { variant } from 'styled-system'

const StyledNote = styled.div.withConfig({ shouldForwardProp })`
  padding: ${(props) => themeGet('space.3')(props)};
  margin-bottom: ${(props) => themeGet('space.3')(props)};
  border-radius: ${(props) => themeGet('radii.2')(props)};
  border-left: ${(props) => themeGet('radii.2')(props)} solid;

  & *:last-child {
    margin-bottom: 0;
  }

  ${(props) =>
    variant({
      variants: {
        info: {
          borderColor: themeGet(
            `colorSchemes.${props.theme.colorScheme}.colors.accent.muted`
          )(props),
          bg: themeGet(
            `colorSchemes.${props.theme.colorScheme}.colors.accent.subtle`
          )(props)
        },
        warning: {
          borderColor: themeGet(
            `colorSchemes.${props.theme.colorScheme}.colors.attention.muted`
          )(props),
          bg: themeGet(
            `colorSchemes.${props.theme.colorScheme}.colors.attention.subtle`
          )(props)
        },
        danger: {
          borderColor: themeGet(
            `colorSchemes.${props.theme.colorScheme}.colors.danger.muted`
          )(props),
          bg: themeGet(
            `colorSchemes.${props.theme.colorScheme}.colors.danger.subtle`
          )(props)
        }
      }
    })(props)}
`

const Note = (props: any) => {
  const theme = useTheme()

  return <StyledNote {...props} theme={theme} />
}

Note.defaultProps = {
  variant: 'info'
}

export default Note
