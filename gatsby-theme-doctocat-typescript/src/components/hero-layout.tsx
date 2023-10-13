import { Box } from '@primer/react'
import React, { ReactNode } from 'react'
import Container from './container'
import Head from './head'
import Header from './header'
import Hero from './hero'
import PageFooter from './page-footer'
import Sidebar from './sidebar'

function HeroLayout({
  children,
  pageContext
}: {
  children: ReactNode
  pageContext: any
}) {
  let { additionalContributors } = pageContext.frontmatter

  if (!additionalContributors) {
    additionalContributors = []
  }

  return (
    <Box sx={{ flexDirection: 'column', minHeight: '100vh', display: 'flex' }}>
      <Head />
      <Header />
      <Box sx={{ flex: '1 1 auto', flexDirection: 'row', display: 'flex' }}>
        <Box sx={{ display: ['none', null, null, 'block'] }}>
          <Sidebar />
        </Box>
        <Box as="main" id="skip-nav" sx={{ width: '100%' }}>
          <Hero />
          <Container>
            {children}
            <PageFooter
              editUrl={pageContext.editUrl}
              contributors={pageContext.contributors.concat(
                additionalContributors.map((login: string) => ({ login }))
              )}
            />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default HeroLayout
