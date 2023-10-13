import { Box, Text } from '@primer/react'
import React, { ReactElement, ReactNode } from 'react'

export function DoDontContainer({
  stacked,
  children
}: {
  stacked?: boolean
  children: ReactNode
}): ReactElement {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', null, stacked ? '1fr' : '1fr 1fr'],
        gap: 4,
        mb: 4
      }}>
      {children}
    </Box>
  )
}

DoDontContainer.defaultProps = {
  stacked: false
}

export function Do(props: any): ReactElement {
  return (
    <DoDontBase
      {...props}
      title="Do"
      bg="success.fg"
      borderColor="success.muted"
    />
  )
}

export function Dont(props: any): ReactElement {
  return (
    <DoDontBase
      {...props}
      title="Don’t"
      bg="danger.fg"
      borderColor="danger.muted"
    />
  )
}

function DoDontBase({
  children,
  title,
  bg,
  borderColor,
  indented
}: {
  children: ReactNode
  title: string
  bg: string
  borderColor: string
  indented?: boolean
}): ReactElement {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignSelf: 'start',
          flexDirection: 'row',
          alignItems: 'center',
          mb: '2',
          backgroundColor: bg,
          borderRadius: '2',
          color: 'fg.onEmphasis',
          paddingX: '2'
        }}>
        <Text
          sx={{ fontWeight: 'bold', fontSize: '1', color: 'fg.onEmphasis' }}>
          {title}
        </Text>
      </Box>
      <Box
        sx={{
          '& *:last-child': { mb: 0 },
          img: { maxWidth: '100%' },
          display: 'flex',
          flexDirection: 'column'
        }}>
        {indented ? (
          <Box
            as="blockquote"
            sx={{
              margin: '0',
              borderLeftWidth: '4px',
              borderLeftStyle: 'solid',
              borderLeftColor: borderColor,
              paddingLeft: '3'
            }}>
            {children}
          </Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  )
}
