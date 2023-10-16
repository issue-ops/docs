import { themeGet } from '@primer/react'

import React from 'react'
import { styled } from 'styled-components'

const StyledList = styled.ul`
  padding-left: 2em;

  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
  }

  li {
    word-wrap: break-all;
  }

  li > p {
    margin-top: ${themeGet('space.3')({})};
  }

  li + li {
    margin-top: ${themeGet('space.1')({})};
  }
`

const List = (props: any) => <StyledList {...props} />

export default List
