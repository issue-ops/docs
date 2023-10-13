import { SSRProvider } from '@react-aria/ssr'
import { MDXProvider } from '@mdx-js/react'
import { BaseStyles, ThemeProvider, theme } from '@primer/react'
import Link from './components/link'
import React, { ReactNode } from 'react'
import mdxComponents from './mdx-components'
import Blockquote from './components/blockquote'
import Caption from './components/caption'
import Code from './components/code'
import DescriptionList from './components/description-list'
import { Do, DoDontContainer, Dont } from './components/do-dont'
import { H1, H2, H3, H4, H5, H6 } from './components/heading'
import HorizontalRule from './components/horizontal-rule'
import Image from './components/image'
import ImageContainer from './components/image-container'
import List from './components/list'
import Note from './components/note'
import Paragraph from './components/paragraph'
import Superscript from './components/superscript'
import Table from './components/table'
import InlineCode from './components/inline-code'
import LiveCode from './components/live-code'
import githubTheme from './github'
import deepmerge from 'deepmerge'

const components = {
  // @mdx-js/react components
  a: Link,
  blockquote: Blockquote,
  code: (props: any) => (
    <Code codeBlock={props.children.trim()} inlineCode={true} />
  ),
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: HorizontalRule,
  img: Image,
  ol: (props: any) => <List as="ol" {...props} />,
  p: Paragraph,
  pre: (props: any) => {
    const className = props.children.props.className
      ? props.children.props.className.replace(/language-/, '')
      : ''
    const codeBlock = props.children.props.children.trim()
    const live = props.live ? props.live : false
    const highlight = props.highlight ? props.highlight.split('-') : []
    const noinline = props.noinline ? props.noinline : false

    return (
      <Code
        className={className}
        codeBlock={codeBlock}
        live={live}
        inlineCode={false}
        highlight={highlight}
        noinline={noinline}
      />
    )
  },
  ul: List,

  // remark-gfm components
  dl: DescriptionList,
  table: Table,
  sup: Superscript,

  // Custom components
  Note,
  Do,
  Dont,
  DoDontContainer,
  Caption,
  ImageContainer,
  ...mdxComponents
}

// const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
//   element
// }: {
//   element: ReactNode
// }) => {
//   import('@mdx-js/react').then((mod) => {
//     const MDXProvider = mod.MDXProvider

//     console.log('1')
//     return (
//       <MDXProvider components={components}>
//         <ThemeProvider>{element}</ThemeProvider>
//       </MDXProvider>
//     )
//   })

//   console.log('2')
//   return <ThemeProvider>{element}</ThemeProvider>
// }

export const wrapRootElement = ({ element }: { element: ReactNode }) => (
  <SSRProvider>
    <ThemeProvider theme={deepmerge(theme, githubTheme)}>
      <BaseStyles>
        <MDXProvider components={components}>{element}</MDXProvider>
      </BaseStyles>
    </ThemeProvider>
  </SSRProvider>
)
