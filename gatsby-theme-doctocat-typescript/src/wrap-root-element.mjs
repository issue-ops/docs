import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider, theme } from '@primer/react'

import React from 'react'

import Blockquote from './components/blockquote'
import Caption from './components/caption'
import Code from './components/code'
import DescriptionList from './components/description-list'
import { Do, DoDontContainer, Dont } from './components/do-dont'
import { H1, H2, H3, H4, H5, H6 } from './components/heading.mjs'
import HorizontalRule from './components/horizontal-rule'
import Image from './components/image'
import ImageContainer from './components/image-container'
import Link from './components/link'
import List from './components/list'
import Note from './components/note'
import Paragraph from './components/paragraph'
import Superscript from './components/superscript'
import Table from './components/table'
import mdxComponents from './mdx-components'

const components = {
  // @mdx-js/react components
  a: Link,
  blockquote: Blockquote,
  code: (props) => <Code codeBlock={props.children.trim()} inlineCode={true} />,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: HorizontalRule,
  img: Image,
  ol: (props) => <List as="ol" {...props} />,
  p: Paragraph,
  pre: (props) => {
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

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider
      theme={theme}
      colorMode="day"
      dayScheme="light"
      nightScheme="dark">
      <MDXProvider components={components}>{element}</MDXProvider>
    </ThemeProvider>
  )
}
