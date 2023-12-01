import { PencilIcon } from '@primer/octicons-react'
import { Box, Link, Octicon } from '@primer/react'

import React, { ReactElement } from 'react'

import Contributors from './contributors'
import VisuallyHidden from './visually-hidden'

export default function PageFooter({
  editUrl,
  contributors
}: {
  editUrl?: string
  contributors: {
    avatar_url: string
    href: string
    login: string
  }[]
}): ReactElement | null {
  return editUrl || contributors.length > 0 ? (
    <Box
      as="footer"
      aria-labelledby="footer-heading"
      sx={{
        borderWidth: 0,
        borderTopWidth: 1,
        borderRadius: 0,
        mt: 8,
        py: 5,
        borderStyle: 'solid',
        borderColor: 'border.default'
      }}>
      <VisuallyHidden>
        <h2 id="footer-heading">Footer</h2>
      </VisuallyHidden>
      <Box sx={{ display: 'grid', gap: 4 }}>
        {editUrl ? (
          <Link href={editUrl}>
            <Octicon icon={PencilIcon} sx={{ mr: 2 }} />
            Edit this page on GitHub
          </Link>
        ) : null}
        {contributors.length > 0 ? (
          <Contributors contributors={contributors} />
        ) : null}
      </Box>
    </Box>
  ) : null
}

PageFooter.defaultProps = {
  contributors: []
}
