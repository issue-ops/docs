import React, { ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Measure from 'react-measure'
import { StyleSheetManager } from 'styled-components'

export default function Frame({
  children
}: {
  children: ReactNode
}): ReactElement {
  const [height, setHeight] = React.useState<string | number>('auto')
  const ref = React.useRef<HTMLIFrameElement>(null)
  const contentDocument = ref.current
    ? ref.current.contentWindow?.document
    : null

  React.useEffect(() => {
    if (ref.current) {
      const iframeBody = ref.current.contentWindow?.document.body

      if (iframeBody) {
        iframeBody.style.margin = '0'
      }
    }
  }, [])

  return (
    <iframe
      ref={ref}
      style={{
        width: '100%',
        border: 0,
        borderRadius: 6,
        height
      }}>
      {contentDocument &&
        createPortal(
          <StyleSheetManager target={contentDocument.head}>
            <Measure
              bounds={true}
              onResize={(rect) => setHeight(rect.bounds?.height || 'auto')}>
              {({ measureRef }) => <div ref={measureRef}>{children}</div>}
            </Measure>
          </StyleSheetManager>,
          contentDocument.body
        )}
    </iframe>
  )
}
