import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

import useSiteMetadata from '../use-site-metadata'

export default function Head(props: {
  title?: string
  description?: string
}): ReactElement {
  const siteMetadata = useSiteMetadata()
  const title = props.title
    ? `${props.title} | ${siteMetadata.title}`
    : siteMetadata.title
  const description = props.description || siteMetadata.description

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
