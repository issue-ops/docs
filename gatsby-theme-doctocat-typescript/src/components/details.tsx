import React, { ReactElement, ReactNode } from 'react'
import { styled } from 'styled-components'

// The <details> element is not yet supported in Edge so we have to use a polyfill.
// We have to check if window is defined before importing the polyfill
// so the code doesn’t run while Gatsby is building.
if (typeof window !== 'undefined') {
  import('details-element-polyfill')
}

// TODO: Replace this Details component with the one from @primer/react when 14.0.0 is released.
// Reference: https://github.com/primer/components/pull/499

const DetailsReset = styled.details`
  & > summary {
    list-style: none;
  }

  & > summary::-webkit-details-marker {
    display: none;
  }

  & > summary::before {
    display: none;
  }
`

function getRenderer(children: ReactNode) {
  return typeof children === 'function' ? children : () => children
}

export default function Details({
  children,
  overlay,
  render = getRenderer(children),
  ...rest
}: {
  children: ReactNode
  overlay?: boolean
  render?: (props: {
    open: boolean
    toggle: (event: any) => void
    [key: string]: any
  }) => ReactNode
  [key: string]: any
}): ReactElement {
  const [open, setOpen] = React.useState(Boolean(rest.open))

  function toggle(event: any) {
    if (event) event.preventDefault()
    if (overlay) {
      openMenu()
    } else {
      setOpen(!open)
    }
  }

  function openMenu() {
    if (!open) {
      setOpen(true)

      // eslint-disable-next-line no-undef
      document.addEventListener('click', closeMenu)
    }
  }

  function closeMenu() {
    setOpen(false)

    // eslint-disable-next-line no-undef
    document.removeEventListener('click', closeMenu)
  }

  return (
    <DetailsReset {...rest} open={open}>
      {render({ open, toggle })}
    </DetailsReset>
  )
}

Details.defaultProps = {
  overlay: false
}
