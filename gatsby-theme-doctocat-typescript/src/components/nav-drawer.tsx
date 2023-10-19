import { Box, Button, Link, ThemeProvider } from '@primer/react'
import { XIcon } from '@primer/octicons-react'

import { Link as GatsbyLink } from 'gatsby'
// eslint-disable-next-line import/no-unresolved
import debounce from 'lodash.debounce'
import React, { ReactElement } from 'react'

import Drawer from './drawer'
import navItems from '../nav.yml'
import NavItems from './nav-items'
import useSiteMetadata from '../use-site-metadata'

export function useNavDrawerState(
  breakpoint: number | string
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isOpen, setOpen] = React.useState(false)

  const onResize = React.useCallback(() => {
    // Handle string values from themes with units at the end
    if (typeof breakpoint === 'string') {
      breakpoint = parseInt(breakpoint, 10)
    }

    // eslint-disable-next-line no-undef
    if (window.innerWidth >= breakpoint) {
      setOpen(false)
    }
  }, [setOpen, breakpoint])

  const debouncedOnResize = React.useCallback(debounce(onResize, 250), [
    onResize
  ])

  React.useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line no-undef
      window.addEventListener('resize', debouncedOnResize)
      return () => {
        // cancel any debounced invocation of the resize handler
        debouncedOnResize.cancel()

        // eslint-disable-next-line no-undef
        window.removeEventListener('resize', debouncedOnResize)
      }
    }
  }, [isOpen, debouncedOnResize])

  return [isOpen, setOpen]
}

export default function NavDrawer({
  isOpen,
  onDismiss
}: {
  isOpen: boolean
  onDismiss: () => void
}): ReactElement {
  const siteMetadata = useSiteMetadata()
  return (
    <Drawer isOpen={isOpen} onDismiss={onDismiss}>
      <Box
        style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch' }}
        sx={{
          flexDirection: 'column',
          height: '100%',
          bg: 'canvas.default',
          display: 'flex'
        }}>
        <Box
          sx={{
            flexDirection: 'column',
            flex: '0 0 auto',
            color: 'fg.default',
            bg: 'canvas.default',
            display: 'flex'
          }}>
          <Box
            sx={{
              borderWidth: 0,
              borderRadius: 0,
              borderBottomWidth: 1,
              borderColor: 'border.muted',
              borderStyle: 'solid'
            }}>
            <Box
              sx={{
                py: 3,
                pl: 4,
                pr: 3,
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex'
              }}>
              <Link
                href="https://primer.style"
                sx={{ fontWeight: 'bold', color: 'inherit' }}>
                Primer
              </Link>
              <Button aria-label="Close" onClick={onDismiss}>
                <XIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        {navItems.length > 0 ? (
          <ThemeProvider colorMode="day">
            <Box
              sx={{
                flexDirection: 'column',
                flex: '1 0 auto',
                color: 'fg.default',
                bg: 'canvas.default',
                display: 'flex'
              }}>
              <Link
                as={GatsbyLink}
                to="/"
                sx={{
                  display: 'inline-block',
                  color: 'inherit',
                  fontWeight: 'bold',
                  mx: 4,
                  mt: 4
                }}>
                {siteMetadata.title}
              </Link>
              <Box sx={{ px: 2 }}>
                <NavItems items={navItems} />
              </Box>
            </Box>
          </ThemeProvider>
        ) : null}
      </Box>
    </Drawer>
  )
}
