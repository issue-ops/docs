import { styled } from 'styled-components'
import { themeGet } from '@primer/react'

const Link = styled.a`
  text-decoration: underline;
  text-underline-offset: 25%;
  color: ${themeGet('colors.accent.fg')};
`

export default Link
