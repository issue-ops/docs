import path from 'path'
import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Doctocat',
    shortName: 'Doctocat',
    description: 'A Gatsby theme for creating Primer documentation sites',
    siteUrl: 'https://issueops.github.io/docs',
    imageUrl:
      'https://user-images.githubusercontent.com/10384315/53922681-2f6d3100-402a-11e9-9719-5d1811c8110a.png',
    header: {
      title: 'GitHub',
      url: 'https://github.com/issue-ops/docs',
      logoUrl: 'https://github.com/issue-ops/docs'
    }
  },
  pathPrefix: '/docs',
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
