import {
  MarkGithubIcon,
  SearchIcon,
  ThreeBarsIcon
} from '@primer/octicons-react'
import {
  Box,
  Button,
  Link,
  StyledOcticon,
  Text,
  themeGet,
  ThemeProvider
} from '@primer/react'

import { Link as GatsbyLink } from 'gatsby'
import React, { ReactElement } from 'react'

import MobileSearch from './mobile-search'
import NavDrawer, { useNavDrawerState } from './nav-drawer'
import Search from './search'
import SkipLink from './skip-link'
import useSiteMetadata from '../use-site-metadata'

export const HEADER_HEIGHT = 56

export default function Header({
  isSearchEnabled
}: {
  isSearchEnabled: boolean
}): ReactElement {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useNavDrawerState(
    themeGet('breakpoints.2')({})
  )
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false)

  const siteMetadata = useSiteMetadata()

  return (
    <ThemeProvider>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Box
          as="header"
          sx={{
            display: 'flex',
            height: HEADER_HEIGHT,
            px: [3, null, null, 4],
            alignItems: 'center',
            justifyContent: 'space-between',
            bg: 'canvas.default',
            border: '1px solid',
            borderColor: 'border.muted'
          }}>
          <SkipLink />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href={siteMetadata.header.logoUrl}
              sx={{
                color: 'fg.default',
                mr: 3,
                lineHeight: 'condensedUltra'
              }}>
              <StyledOcticon icon={MarkGithubIcon} size={24} />
            </Link>
            {siteMetadata.header.title ? (
              <Link
                href={siteMetadata.header.url}
                sx={{
                  color: 'fg.default',
                  fontWeight: 'bold',
                  display: [
                    // We only hide "Primer" on small viewports if a shortName is defined.
                    siteMetadata.shortName ? 'none' : 'inline-block',
                    null,
                    null,
                    'inline-block'
                  ]
                }}>
                {siteMetadata.header.title}
              </Link>
            ) : null}
            {siteMetadata.shortName ? (
              <>
                {siteMetadata.header.title && (
                  <Text
                    sx={{
                      display: ['none', null, null, 'inline-block'],
                      color: 'fg.default',
                      mx: 2
                    }}>
                    /
                  </Text>
                )}
                <Link
                  as={GatsbyLink}
                  to="/"
                  sx={{
                    fontWeight: 'bold',
                    color: 'fg.default'
                  }}>
                  {siteMetadata.shortName}
                </Link>
              </>
            ) : null}
          </Box>
          <Box>
            <Box
              sx={{
                display: ['none', null, null, 'flex'],
                alignItems: 'center'
              }}>
              {isSearchEnabled ? (
                <Box sx={{ display: ['none', null, null, 'block'], ml: 3 }}>
                  <Search />
                </Box>
              ) : null}
            </Box>
            <Box sx={{ display: ['flex', null, null, 'none'] }}>
              {isSearchEnabled ? (
                <>
                  <Button
                    aria-label="Search"
                    aria-expanded={isMobileSearchOpen}
                    onClick={() => setIsMobileSearchOpen(true)}
                    sx={{
                      ml: 3
                    }}>
                    <SearchIcon />
                  </Button>
                  <MobileSearch
                    isOpen={isMobileSearchOpen}
                    onDismiss={() => setIsMobileSearchOpen(false)}
                  />
                </>
              ) : null}
              <Button
                aria-label="Menu"
                aria-expanded={isNavDrawerOpen}
                onClick={() => setIsNavDrawerOpen(true)}
                sx={{
                  ml: 3
                }}>
                <ThreeBarsIcon />
              </Button>
              <NavDrawer
                isOpen={isNavDrawerOpen}
                onDismiss={() => setIsNavDrawerOpen(false)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

Header.defaultProps = {
  isSearchEnabled: true
}
