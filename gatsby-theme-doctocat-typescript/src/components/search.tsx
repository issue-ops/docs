import { SearchIcon } from '@primer/octicons-react'
import { Box, ThemeProvider } from '@primer/react'

import Downshift from 'downshift'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import React, { ReactElement } from 'react'
import { useFlexSearch } from 'react-use-flexsearch'

import SearchResults from './search-results'
import TextInput from './text-input'
import useSiteMetadata from '../use-site-metadata'

import type { DownshiftState, StateChangeOptions } from 'downshift'
import type Partial from 'ts-toolbelt'

function stateReducer(
  state: DownshiftState<{ path: string; title: string }>,
  changes: StateChangeOptions<{ path: string; title: string }>
): Partial<StateChangeOptions<{ path: string; title: string }>> {
  switch (changes.type) {
    case Downshift.stateChangeTypes.changeInput:
      if (!changes.inputValue) {
        // Close the menu if the input is empty.
        return { ...changes, isOpen: false }
      }
      return changes
    default:
      return changes
  }
}

export default function Search(): ReactElement {
  const data = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)

  const { index, store } = data.localSearchPages

  const [query, setQuery] = React.useState('')
  const results = useFlexSearch(query, index, store)
  const siteMetadata = useSiteMetadata()

  return (
    <Downshift<{ path: string; title: string }>
      inputValue={query}
      onInputValueChange={(inputValue) => setQuery(inputValue)}
      selectedItem={null}
      onSelect={(item) => {
        if (item) {
          navigate(`/${item.path}`)
          setQuery('')
        }
      }}
      itemToString={(item) => (item ? item.title : '')}
      stateReducer={stateReducer}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getRootProps,
        isOpen,
        highlightedIndex
      }) => (
        <Box {...getRootProps({ position: 'relative' })}>
          <TextInput
            leadingVisual={SearchIcon}
            {...getInputProps({
              placeholder: `Search ${siteMetadata.title}`,
              sx: {
                width: 300
              }
            })}
          />
          {isOpen ? (
            <Box
              {...getMenuProps({
                position: 'absolute',
                left: 0,
                right: 0,
                pt: 2
              })}>
              <ThemeProvider colorMode="day">
                <Box
                  style={{ overflow: 'auto' }}
                  sx={{
                    minWidth: 300,
                    maxHeight: '70vh',
                    p: 2,
                    boxShadow: 'shadow.large',
                    borderColor: 'border.muted',
                    bg: 'canvas.overlay',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}>
                  <SearchResults
                    results={results}
                    getItemProps={getItemProps}
                    highlightedIndex={highlightedIndex ?? 0}
                  />
                </Box>
              </ThemeProvider>
            </Box>
          ) : null}
        </Box>
      )}
    </Downshift>
  )
}
