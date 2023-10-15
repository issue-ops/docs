import { Box, Text, themeGet, useTheme } from '@primer/react'
import shouldForwardProp from '@styled-system/should-forward-prop'

import htmlReactParser from 'html-react-parser'
import { themes } from 'prism-react-renderer'
import React, { ReactNode } from 'react'
import reactElementToJsxString from 'react-element-to-jsx-string'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { styled } from 'styled-components'

import scope from '../live-code-scope'
import ClipboardCopy from './clipboard-copy'
import LivePreviewWrapper from './live-preview-wrapper'

interface LineWrapperProps {
  range: { firstLine: number; lastLine: number }
  children: ReactNode
}

const languageTransformers = {
  html: (html: any) => htmlToJsx(html),
  jsx: (jsx: any) => jsx
}

function htmlToJsx(html: any) {
  try {
    const reactElement = htmlReactParser(removeNewlines(html))
    return reactElementToJsxString(<>{reactElement}</>)
  } catch (error) {
    return `<React.Fragment>${html}</React.Fragment>`
  }
}

function removeNewlines(string: string) {
  return string.replace(/(\r\n|\n|\r)/gm, '')
}

const getResolvedScope = (metastring: any) => {
  if (typeof scope === 'function') return scope(metastring)
  return scope
}

function parseHighlightRange(highlight: string[]) {
  if (!highlight || highlight.length === 0) return undefined

  return {
    firstLine: parseInt(highlight[0]),
    lastLine: parseInt(highlight.length > 1 ? highlight[1] : highlight[0])
  }
}

const StyledLineWrapper: React.FC<LineWrapperProps> = styled.div.withConfig({
  shouldForwardProp
})`
  pre
    .token-line:nth-child(n + ${(props) => props.range.firstLine}):nth-child(
      -n + ${(props) => props.range.lastLine}
    ) {
    margin: 0px -16px;
    padding: 0px 16px;
    display: block;
    background-color: ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.accent.subtle`)(
        props
      )};
    box-shadow: inset 3px 0px 0px 0px
      ${(props) =>
        themeGet(`colorSchemes.${props.theme.colorScheme}.colors.accent.fg`)(
          props
        )};
  }
`

const LineWrapper = (props: any) => {
  const theme = useTheme()

  return <StyledLineWrapper {...props} theme={theme} />
}

function LineHighlighter({
  enabled,
  range,
  children
}: {
  enabled: boolean
  range?: { firstLine: number; lastLine: number }
  children: ReactNode
}) {
  if (!enabled || !range) return children

  return <LineWrapper range={range}>{children}</LineWrapper>
}

export default function LiveCode({
  code,
  language,
  highlight,
  noinline,
  metastring
}: {
  code: string
  language: string
  highlight: string[]
  noinline: boolean
  metastring: string
}) {
  const theme = useTheme()

  const [liveCode, setLiveCode] = React.useState(code)
  const [pristine, setPristine] = React.useState(true)
  const [mounted, setMounted] = React.useState(false)

  const handleChange = (updatedLiveCode: any) => {
    if (!mounted) setMounted(true)
    else {
      if (updatedLiveCode === code) setPristine(true)
      else setPristine(false)

      setLiveCode(updatedLiveCode)
    }
  }

  return (
    <Box sx={{ flexDirection: 'column', mb: 3, display: 'flex' }}>
      <LiveProvider
        code={liveCode}
        scope={getResolvedScope(metastring)}
        language={language}
        transformCode={
          language === 'jsx'
            ? languageTransformers.jsx
            : languageTransformers.html
        }
        noInline={noinline}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderTopRightRadius: 2,
            borderTopLeftRadius: 2,
            display: 'flex'
          }}>
          <LivePreviewWrapper>
            <LivePreview />
          </LivePreviewWrapper>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <LineHighlighter
            range={parseHighlightRange(highlight)}
            enabled={pristine}>
            <LiveEditor
              code={liveCode}
              onChange={handleChange}
              theme={themes.github}
              tabMode={'indentation'}
              style={{
                fontFamily: themeGet('fonts.mono')({}),
                fontSize: '85%',
                borderBottomLeftRadius: themeGet('radii.2')({}),
                borderBottomRightRadius: themeGet('radii.2')({}),
                border: '1px solid',
                borderTop: 0,
                backgroundColor: themeGet(
                  `colorSchemes.${theme.colorScheme}.colors.canvas.subtle`
                )({}),
                borderColor: themeGet(
                  `colorSchemes.${theme.colorScheme}.colors.border.default`
                )({}),
                resize: 'vertical',
                padding: 6
              }}
            />
          </LineHighlighter>
          <Box sx={{ top: 0, right: 0, p: 2, position: 'absolute' }}>
            <ClipboardCopy value={liveCode} />
          </Box>
        </Box>
        <Text
          as={LiveError}
          sx={{
            m: 0,
            p: 3,
            fontFamily: 'mono',
            fontSize: 1,
            color: 'fg.onEmphasis',
            bg: 'danger.emphasis'
          }}
        />
      </LiveProvider>
    </Box>
  )
}
