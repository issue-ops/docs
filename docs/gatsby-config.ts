import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'IssueOps Docs',
    shortName: 'IssueOps Docs',
    description: 'The one-stop shop for all things IssueOps',
    siteUrl: 'https://issueops.github.io/docs',
    header: {
      title: 'GitHub',
      url: 'https://github.com/issue-ops/docs',
      logoUrl: 'https://github.com/issue-ops/docs'
    }
  },
  pathPrefix: '/docs',
  trailingSlash: 'never',
  plugins: [
    {
      resolve: '@issue-ops/gatsby-theme-doctocat-typescript',
      options: {
        repoRootPath: '..',
        defaultBranch: 'main'
      }
    }
  ]
}

export default config
