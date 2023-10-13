import React from 'react'
import { createPortal } from 'react-dom'
import { StyleSheetManager } from 'styled-components'
import Measure from 'react-measure'

export default function Frame({ children }: { children: any }) {
  const [height, setHeight] = React.useState('auto')
  // const [contentRef, setContentRef] = React.useState(null)
  const contentRef = React.useRef<HTMLIFrameElement>(null)

  const mountNode = contentRef.current?.contentWindow?.document?.body
  const mountHead = contentRef.current?.contentWindow?.document?.head

  return (
    <Measure
      bounds={true}
      onResize={(rect) => {
        const h = (rect.bounds?.height ?? 0) + 20
        setHeight(`${h}px`)
      }}>
      {({ measureRef }) => (
        <iframe
          ref={contentRef}
          style={{ width: '100%', border: 0, borderRadius: 6, height: height }}>
          {mountNode &&
            createPortal(
              <StyleSheetManager target={mountHead}>
                <div ref={measureRef}>{children}</div>
              </StyleSheetManager>,
              mountNode
            )}
        </iframe>
      )}
    </Measure>
  )
}
