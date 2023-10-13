import path from 'path'
import remarkGfm from 'remark-gfm'
import remarkGithub from 'remark-github'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'

/** @type {import('gatsby').GatsbyConfig} */
const config = {
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        query: `
            {
              allMdx {
                nodes {
                  id
                  frontmatter {
                    title
                  }
                  body
                  parent {
                    ... on File {
                      relativeDirectory
                      name
                    }
                  }
                }
              }
            }
          `,
        ref: 'id',
        index: ['title', 'body', 'parent', 'path'],
        store: ['id', 'path', 'title'],
        normalizer: searchNormalizer
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: path.resolve('./src/images/icon.png')
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600
            }
          }
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkGithub],
          rehypePlugins: [rehypeMdxCodeProps]
        }
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.resolve('./content')
      }
    },
    'gatsby-transformer-yaml'
  ]
}

/**
 * Normalizes site data for the local search plugin.
 * @param {SearchNormalizerData} response The response from the GraphQL query
 * @returns {SearchNormalizerResult[]}
 */
function searchNormalizer({ data }) {
  return data.allMdx.nodes.map((node) => ({
    id: node.id,
    path: node.parent.relativeDirectory + '/' + node.parent.name,
    title: node.frontmatter.title,
    body: node.body
  }))
}

export default config
