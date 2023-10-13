import { BaseStyles, themeGet } from '@primer/react'
import React, { ReactNode } from 'react'
import { createGlobalStyle } from 'styled-components'
import { GatsbyBrowser } from 'gatsby'

const GlobalStyles = createGlobalStyle`
  body {
    color: ${themeGet('colors.fg.default')};
    background-color: ${themeGet('colors.canvas.default')};
  }

  .footnotes {
    font-size: ${themeGet('fontSizes.1')};
    color: ${themeGet('colors.fg.subtle')};

    ol {
      padding-left: ${themeGet('space.3')};
    }

  .footnote-backref {
      font-family: ${themeGet('fonts.mono')};
      margin-left: 2px;
      text-decoration: none;
    }
  }
`

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
