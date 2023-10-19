declare module '@primer/component-metadata'
declare module 'details-element-polyfill'
declare module 'get-pkg-repo'
declare module 'react-addons-text-content'
declare module 'react-use-flexsearch'
declare module '*.yml'

type KnownTarget = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type SearchNormalizerData = {
  allMdx: {
    nodes: {
      id: string
      frontmatter: {
        title: string
      }
      body: string
      parent: {
        relativeDirectory: string
        name: string
      }
    }[]
  }
}

type SearchNormalizerResult = {
  id: string
  title: string
  body: string
  parent: string
  path: string
}

type CreatePagesMDXResult = {
  data?: {
    allMdx: {
      nodes: {
        internal: {
          contentFilePath: string
        }
        body: string
        tableOfContents: {
          items: {
            url: string
            title: string
            items: {
              url: string
              title: string
            }[]
          }[]
        }
        parent: {
          relativeDirectory: string
          name: string
        }
        frontmatter: {
          status: string
        }
      }[]
    }
  }
}

type PostBuildSitePageResult = {
  data?: {
    allSitePage: {
      nodes: {
        path: string
        context: {
          frontmatter: {
            componentId: string
            status: string
          }
        }
      }[]
    }
  }
}
