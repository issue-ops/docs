import { LinkIcon } from '@primer/octicons-react'
import { Heading, Link, StyledOcticon, themeGet, useTheme } from '@primer/react'

import GithubSlugger from 'github-slugger'
import React from 'react'
import textContent from 'react-addons-text-content'
import { styled } from 'styled-components'

import { HEADER_HEIGHT } from './header'

const StyledHeading = styled(Heading)`
  margin-top: ${themeGet('space.4')({})};
  margin-bottom: ${themeGet('space.3')({})};
  scroll-margin-top: ${HEADER_HEIGHT + 24}px;
  line-height: ${themeGet('lineHeights.condensed')({})};

  @media (hover: hover) {
    & .octicon-link {
      visibility: hidden;
    }

    &:hover .octicon-link,
    &:focus-within .octicon-link {
      visibility: visible;
    }
  }
`

function MarkdownHeading({ children, ...props }) {
  const slugger = new GithubSlugger()
  const text = children ? textContent(children) : ''
  const id = text ? slugger.slug(text) : ''

  return (
    <StyledHeading id={id} {...props}>
      <Link
        href={`#${id}`}
        sx={{
          color: 'inherit',
          '&:hover, &:focus': {
            textDecoration: 'none'
          }
        }}>
        {children}
        <StyledOcticon
          icon={LinkIcon}
          className="octicon-link"
          sx={{
            ml: 2,
            color: 'fg.muted',
            // !important is needed here to override default icon styles
            verticalAlign: 'middle !important'
          }}
        />
      </Link>
    </StyledHeading>
  )
}

const StyledH1 = styled(StyledHeading).attrs({ as: 'h1' })`
  padding-bottom: ${themeGet('space.2')({})};
  font-size: ${themeGet('fontSizes.7')({})};
  border-bottom: 1px solid
    ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.border.default`)(
        props
      )};
`

const StyledH2 = styled(StyledHeading).attrs({ as: 'h2' })`
  padding-bottom: ${themeGet('space.2')({})};
  font-size: ${themeGet('fontSizes.4')({})};
  border-bottom: 1px solid
    ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.border.default`)(
        props
      )};
  font-weight: ${themeGet('fontWeights.semibold')({})};
`

const StyledH3 = styled(StyledHeading).attrs({ as: 'h3' })`
  font-size: ${themeGet('fontSizes.3')({})};
  font-weight: ${themeGet('fontWeights.semibold')({})};
`

const StyledH4 = styled(StyledHeading).attrs({ as: 'h4' })`
  font-size: ${themeGet('fontSizes.2')({})};
  font-weight: ${themeGet('fontWeights.semibold')({})};
`

const StyledH5 = styled(StyledHeading).attrs({ as: 'h5' })`
  font-size: ${themeGet('fontSizes.1')({})};
`

const StyledH6 = styled(StyledHeading).attrs({ as: 'h6' })`
  font-size: ${themeGet('fontSizes.1')({})};
  color: ${(props) =>
    themeGet(`colorSchemes.${props.theme.colorScheme}.colors.fg.muted`)(props)};
`

const Heading1 = (props) => {
  const theme = useTheme()

  return <StyledH1 {...props} theme={theme} />
}

const Heading2 = (props) => {
  const theme = useTheme()

  return <StyledH2 {...props} theme={theme} />
}

const Heading3 = (props) => {
  const theme = useTheme()

  return <StyledH3 {...props} theme={theme} />
}

const Heading4 = (props) => {
  const theme = useTheme()

  return <StyledH4 {...props} theme={theme} />
}

const Heading5 = (props) => {
  const theme = useTheme()

  return <StyledH5 {...props} theme={theme} />
}

const Heading6 = (props) => {
  const theme = useTheme()

  return <StyledH6 {...props} theme={theme} />
}

export const H1 = (props) => {
  return <MarkdownHeading as={Heading1} {...props} />
}

export const H2 = (props) => {
  return <MarkdownHeading as={Heading2} {...props} />
}

export const H3 = (props) => {
  return <MarkdownHeading as={Heading3} {...props} />
}

export const H4 = (props) => {
  return <MarkdownHeading as={Heading4} {...props} />
}

export const H5 = (props) => {
  return <MarkdownHeading as={Heading5} {...props} />
}

export const H6 = (props) => {
  return <MarkdownHeading as={Heading6} {...props} />
}
