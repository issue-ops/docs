import { themeGet, useTheme } from '@primer/react'

import React from 'react'
import { styled } from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  margin: 0 0 ${(props) => themeGet('space.3')(props)};
  overflow: auto;
  border-collapse: separate;
  border-spacing: 0px;

  th {
    font-weight: ${(props) => themeGet('fontWeights.bold')(props)};
    background-color: ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.neutral.subtle`)(
        props
      )};
  }

  th,
  td {
    padding: ${(props) => themeGet('space.2')(props)}
      ${(props) => themeGet('space.3')(props)};
    border-color: ${(props) =>
      themeGet(`colorSchemes.${props.theme.colorScheme}.colors.border.muted`)(
        props
      )};
    border-style: solid;
    border-width: 0;
    border-left-width: ${(props) => themeGet('borderWidths.1')(props)};
    border-top-width: ${(props) => themeGet('borderWidths.1')(props)};
  }

  tr:last-child td {
    border-bottom-width: ${(props) => themeGet('borderWidths.1')(props)};
  }

  tr td:last-child,
  tr th:last-child {
    border-right-width: ${(props) => themeGet('borderWidths.1')(props)};
  }

  thead th:first-child {
    border-top-left-radius: ${(props) => themeGet('radii.2')(props)};
  }

  thead th:last-child {
    border-top-right-radius: ${(props) => themeGet('radii.2')(props)};
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: ${(props) => themeGet('radii.2')(props)};
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: ${(props) => themeGet('radii.2')(props)};
  }

  img {
    background-color: transparent;
    vertical-align: middle;
  }
`

const Table = (props: any) => {
  const theme = useTheme()

  return <StyledTable {...props} theme={theme} />
}

export default Table
