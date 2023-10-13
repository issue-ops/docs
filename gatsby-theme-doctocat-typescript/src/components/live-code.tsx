import { Box, Text, themeGet, theme } from '@primer/react'
import htmlReactParser from 'html-react-parser'
import githubTheme from '../github'
import React, { ReactNode } from 'react'
import reactElementToJsxString from 'react-element-to-jsx-string'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { styled, ThemeContext } from 'styled-components'
import scope from '../live-code-scope'
import ClipboardCopy from './clipboard-copy'
import LivePreviewWrapper from './live-preview-wrapper'
import shouldForwardProp from '@styled-system/should-forward-prop'
import deepmerge from 'deepmerge'

const languageTransformers = {
  html: (html: any) => htmlToJsx(html),
  jsx: (jsx: any) => wrapWithFragment(jsx)
}

function htmlToJsx(html: any) {
  try {
    const reactElement = htmlReactParser(removeNewlines(html))
    // The output of htmlReactParser could be a single React element
    // or an array of React elements. reactElementToJsxString does not accept arrays
    // so we have to wrap the output in React fragment.
    return reactElementToJsxString(<>{reactElement}</>)
  } catch (error) {
    return wrapWithFragment(html)
  }
}

function removeNewlines(string: string) {
  return string.replace(/(\r\n|\n|\r)/gm, '')
}

function wrapWithFragment(jsx: string) {
  return `<React.Fragment>${jsx}</React.Fragment>`
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

interface LineWrapperProps {
  range: { firstLine: number; lastLine: number }
  children: React.ReactNode
}

// prettier-ignore
const LineWrapper: React.FC<LineWrapperProps> = styled.div.withConfig({
  shouldForwardProp
  })`
  pre .token-line:nth-child(n + ${props => props.range.firstLine}):nth-child(-n + ${props => props.range.lastLine}) {
    margin: 0px -10px;
    padding: 0px 10px;
    background-color: ${themeGet('colorSchemes.light.colors.accent.subtle')};
    box-shadow: inset 3px 0px 0px 0px ${themeGet('colorSchemes.light.colors.accent.fg')};
  }
`

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
  const combinedTheme = deepmerge(theme, githubTheme)

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
        language={language}
        code={liveCode}
        scope={getResolvedScope(metastring)}
        theme={combinedTheme}
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
              theme={combinedTheme}
              tabMode={'indentation'}
              style={{
                fontFamily: themeGet('fonts.mono')({}),
                fontSize: '85%',
                borderBottomLeftRadius: themeGet('radii')({})[2],
                borderBottomRightRadius: themeGet('radii')({})[2],
                border: '1px solid',
                borderTop: 0,
                borderColor: themeGet('colors.border.default')({})
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
