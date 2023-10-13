import { Box } from '@primer/react'
import React, { ReactElement } from 'react'
import navItems from '../nav.yml'
import { HEADER_HEIGHT } from './header'
import NavItems from './nav-items'

function usePersistentScroll(id: string): {
  ref: React.RefObject<HTMLDivElement>
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void
} {
  const ref = React.useRef<HTMLDivElement>(null)

  const handleScroll = React.useCallback(
    // Save scroll position in session storage on every scroll change
    (event: React.UIEvent<HTMLDivElement>) =>
      // eslint-disable-next-line no-undef
      window.sessionStorage.setItem(
        id,
        event.currentTarget.scrollTop.toString()
      ),
    [id]
  )

  React.useLayoutEffect(() => {
    // Restore scroll position when component mounts
    // eslint-disable-next-line no-undef
    const scrollPosition = window.sessionStorage.getItem(id)
    if (scrollPosition && ref.current) {
      ref.current.scrollTop = Number(scrollPosition)
    }
  }, [id])

  // Return props to spread onto the scroll container
  return {
    ref,
    onScroll: handleScroll
  }
}

export default function Sidebar(): ReactElement {
  const scrollContainerProps = usePersistentScroll('sidebar')

  return (
    <Box
      sx={{
        position: 'sticky',
        top: HEADER_HEIGHT,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        width: 260
      }}>
      <Box
        {...scrollContainerProps}
        style={{ overflow: 'auto' }}
        sx={{
          borderWidth: 0,
          borderRightWidth: 1,
          borderRadius: 0,
          height: '100%',
          borderStyle: 'solid',
          borderColor: 'border.subtle',
          px: 2
        }}>
        <Box sx={{ flexDirection: 'column', display: 'flex' }}>
          <NavItems items={navItems} />
        </Box>
      </Box>
    </Box>
  )
}
