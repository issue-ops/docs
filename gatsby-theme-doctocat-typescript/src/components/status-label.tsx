import { Label, StyledOcticon } from '@primer/react'
import { DotFillIcon } from '@primer/octicons-react'
import React, { ReactElement } from 'react'
import type Record from 'ts-toolbelt'

type Status = 'alpha' | 'beta' | 'stable' | 'deprecated'

const STATUS_COLORS: Record<Status, string> = {
  alpha: 'severe.fg',
  beta: 'attention.fg',
  stable: 'success.fg',
  deprecated: 'danger.fg'
}

const STATUS_BACKGROUND: Record<Status, string> = {
  alpha: 'severe.subtle',
  beta: 'attention.subtle',
  stable: 'success.subtle',
  deprecated: 'danger.subtle'
}

function getStatusColor(status: Status): string {
  return STATUS_COLORS[status] || 'fg.muted'
}

function getStatusBackgroundColor(status: Status): string {
  return STATUS_BACKGROUND[status] || 'neutral.subtle'
}

export default function StatusLabel({
  status
}: {
  status: Status
}): ReactElement {
  return (
    <Label
      size="large"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: getStatusBackgroundColor(status),
        borderColor: 'transparent',
        fontWeight: 'normal'
      }}>
      <StyledOcticon
        icon={DotFillIcon}
        sx={{ color: getStatusColor(status) }}
      />
      {status}
    </Label>
  )
}