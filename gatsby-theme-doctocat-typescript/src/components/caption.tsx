import { Text } from '@primer/react'

import React, { ReactElement } from 'react'

export default function Caption(props: any): ReactElement {
  return (
    <Text
      as="p"
      {...props}
      sx={{
        mt: 2,
        mb: 3,
        fontSize: 1,
        color: 'gray.5'
      }}
    />
  )
}
