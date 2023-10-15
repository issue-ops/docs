import { BaseStyles, themeGet, useTheme } from '@primer/react'
import React, { ReactNode } from 'react'
import { createGlobalStyle } from 'styled-components'
import { GatsbyBrowser } from 'gatsby'

const StyledGlobalStyles = createGlobalStyle`
  body {
    color: ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.fg.default`)(
        props
      )};
    background-color: ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.canvas.default`)(
        props
      )};
  }

  .footnotes {
    font-size: ${(props) => themeGet('fontSizes.1')(props)};
    color: ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.fg.subtle`)(
        props
      )};

    ol {
      padding-left: ${(props) => themeGet('space.3')(props)}
    }

  .footnote-backref {
      font-family: ${(props) => themeGet('fonts.mono')(props)};
      margin-left: 2px;
      text-decoration: none;
    }
  }
`

const GlobalStyles = (props: any) => {
  const theme = useTheme()

  return <StyledGlobalStyles {...props} theme={theme} />
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}: {
  element: ReactNode
}) => {
  return (
    <BaseStyles>
      <GlobalStyles />
      {element}
    </BaseStyles>
  )
}
