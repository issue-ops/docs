import { Link, Text, Box } from '@primer/react'

import React, { ReactElement } from 'react'

export default function ReactLink({ href }: { href: string }): ReactElement {
  return (
    <li>
      <Link href={href} target="_blank">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ReactLogo />
          <Text>React</Text>
        </Box>
      </Link>
    </li>
  )
}

function ReactLogo(): ReactElement {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      width={16}
      height={16}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.129 2.533a13 13 0 0 0-1.84 1.035c.566.467 1.13.98 1.683 1.532a23.93 23.93 0 0 1 1.533 1.683 13 13 0 0 0 1.034-1.84c.335-.742.504-1.372.53-1.856.026-.485-.091-.735-.22-.864-.128-.128-.379-.246-.863-.22-.485.027-1.114.196-1.857.53Zm-.616-1.368c-.785.354-1.624.842-2.477 1.444A15.152 15.152 0 0 0 5.56 1.166C4.72.787 3.901.546 3.167.506c-.733-.04-1.47.12-2.006.657-.536.536-.696 1.273-.656 2.006.04.733.281 1.55.66 2.39.353.786.84 1.624 1.443 2.478a15.15 15.15 0 0 0-1.442 2.475c-.378.84-.62 1.657-.66 2.39-.04.734.12 1.47.657 2.007.536.536 1.273.696 2.006.656.733-.04 1.55-.281 2.39-.66a15.15 15.15 0 0 0 2.476-1.441c.853.601 1.69 1.089 2.476 1.442.84.378 1.657.62 2.39.66.734.04 1.47-.121 2.007-.657.536-.536.696-1.273.656-2.006-.04-.734-.281-1.551-.66-2.391a15.149 15.149 0 0 0-1.441-2.475 15.15 15.15 0 0 0 1.443-2.478c.378-.84.62-1.657.66-2.39.04-.734-.121-1.47-.657-2.007-.536-.536-1.273-.696-2.006-.656-.733.04-1.55.281-2.391.66Zm-7.98 3.78c.259.574.607 1.195 1.035 1.838.467-.566.98-1.131 1.533-1.684a23.915 23.915 0 0 1 1.682-1.531 12.995 12.995 0 0 0-1.84-1.035c-.742-.334-1.372-.503-1.856-.53-.485-.026-.735.092-.864.22-.128.129-.246.38-.22.864.027.484.196 1.114.53 1.857ZM6.161 6.16a22.144 22.144 0 0 0-1.678 1.877A22.14 22.14 0 0 0 6.16 9.91a22.155 22.155 0 0 0 1.876 1.678 22.137 22.137 0 0 0 1.877-1.678c.62-.62 1.181-1.251 1.676-1.874A22.137 22.137 0 0 0 9.911 6.16a22.142 22.142 0 0 0-1.875-1.677A22.144 22.144 0 0 0 6.161 6.16Zm-3.626 4.967c.258-.574.605-1.194 1.033-1.837.467.566.98 1.13 1.531 1.682a23.922 23.922 0 0 0 1.684 1.532c-.643.428-1.263.775-1.838 1.034-.743.334-1.373.503-1.857.53-.484.026-.735-.091-.864-.22-.128-.128-.245-.38-.22-.864.027-.484.196-1.114.53-1.857Zm8.592 2.411a13 13 0 0 1-1.837-1.034c.566-.467 1.13-.98 1.683-1.532a23.903 23.903 0 0 0 1.531-1.682c.428.643.775 1.263 1.034 1.837.334.743.503 1.373.53 1.857.026.485-.091.736-.22.864-.128.129-.38.246-.864.22-.484-.027-1.114-.195-1.857-.53ZM8.034 8.782a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      />
    </svg>
  )
}
