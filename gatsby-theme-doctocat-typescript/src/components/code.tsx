import { Box, Text } from '@primer/react'
import { Highlight } from 'prism-react-renderer'
import React from 'react'
import githubTheme from '../github'
import ClipboardCopy from './clipboard-copy'
import LiveCode from './live-code'
import InlineCode from './inline-code'

export default function Code({
  className,
  codeBlock,
  live,
  highlight,
  inlineCode,
  noinline,
  metastring
}: any) {
  if (inlineCode === true) {
    return <InlineCode>{codeBlock}</InlineCode>
  }

  if (live) {
    return (
      <LiveCode
        code={codeBlock}
        highlight={highlight}
        language={className}
        noinline={noinline}
        metastring={metastring}
      />
    )
  }

  return (
    <Box
      sx={{
        display: 'table',
        tableLayout: 'fixed',
        width: '100%',
        position: 'relative'
      }}>
      <Box sx={{ top: 0, right: 0, p: 2, position: 'absolute' }}>
        <ClipboardCopy value={codeBlock} />
      </Box>
      <Highlight code={codeBlock} language={className} theme={githubTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            as="pre"
            className={className}
            style={{ ...style, overflow: 'auto' }}
            sx={{ borderRadius: 2, mt: 0, mb: 3, p: 3, border: 0 }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <Text
                    key={key}
                    {...getTokenProps({ token, key })}
                    sx={{ fontFamily: 'mono', fontSize: 1 }}
                  />
                ))}
              </div>
            ))}
          </Box>
        )}
      </Highlight>
    </Box>
  )
}
