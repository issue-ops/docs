const axios = require('axios')
const uniqBy = require('lodash.uniqby')
const fs = require('fs')
const getPkgRepo = require('get-pkg-repo')
const path = require('path')

const CONTRIBUTOR_CACHE = new Map()

/** @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']} */
const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.mts', '.mdx']
    },
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: ['babel-loader', '@mdx-js/loader']
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  })
}

/** @type {import('gatsby').GatsbyNode['createPages']} */
const createPages = async ({ actions, graphql }, themeOptions) => {
  // Get the package.json for this project so we can get the repo name.
  const { readPackageUpSync } = await import('read-pkg-up')
  const repo = getPkgRepo(readPackageUpSync()?.packageJson)

  // Get the MDX files in the project.
  /** @type {CreatePagesMDXResult} */
  const { data } = await graphql(`
    query {
      allMdx {
        nodes {
          internal {
            contentFilePath
          }
          body
          tableOfContents(maxDepth: 2)
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
          frontmatter {
            status
          }
        }
      }
    }
  `)

  if (!process.env.GITHUB_TOKEN)
    console.info('No GITHUB_TOKEN set...skipping GitHub API calls')

  // Create pages for each MDX file.
  await Promise.all(
    (data?.allMdx.nodes ?? []).map(async (node) => {
      const defaultBranch = themeOptions.defaultBranch ?? 'main'

      // Convert Windows backslash paths to forward slash paths: foo\\bar → foo/bar
      const pagePath = path
        .join(
          node.parent.relativeDirectory,
          node.parent.name === 'index' ? '/' : node.parent.name
        )
        .replace(/\\/g, '/')

      // Get the absolute path of the file on this filesystem.
      const rootAbsolutePath = path.resolve(
        process.cwd(),
        themeOptions?.repoRootPath?.toString() ?? '.'
      )

      // Get the relative path of the file in the repository.
      const fileRelativePath = path.relative(
        rootAbsolutePath,
        node.internal.contentFilePath
      )

      // Use the branch, package.json, and file path to get the edit URL.
      const editUrl = `https://github.com/${repo.user}/${repo.project}/edit/${defaultBranch}/${fileRelativePath}`

      actions.createPage({
        path: pagePath,
        component: node.internal.contentFilePath,
        context: {
          editUrl,
          contributors: process.env.GITHUB_TOKEN
            ? await fetchContributors(
                repo,
                fileRelativePath,
                process.env.GITHUB_TOKEN
              )
            : [],
          tableOfContents: node.tableOfContents,
          frontmatter: node.frontmatter
        }
      })
    })
  )
}

/** @type {import('gatsby').GatsbyNode['onPostBuild']} */
const onPostBuild = async ({ graphql }) => {
  try {
    /** @type {PostBuildSitePageResult} */
    const { data } = await graphql(`
      query {
        allSitePage(
          filter: {
            context: {
              frontmatter: { componentId: { ne: null }, status: { ne: null } }
            }
          }
        ) {
          nodes {
            path
            context {
              frontmatter {
                componentId
                status
              }
            }
          }
        }
      }
    `)

    const components = data?.allSitePage.nodes.map((node) => {
      return {
        id: node.context.frontmatter.componentId,
        path: node.path,
        status: node.context.frontmatter.status.toLowerCase()
      }
    })

    fs.writeFileSync(
      path.resolve(process.cwd(), 'public/components.json'),
      JSON.stringify(components)
    )
  } catch (error) {
    // This is not necessarily an error, so we just log a warning instead of
    // failing the build. Some sites won't have any markdown files with
    // `componentId` frontmatter and that's okay.
    console.warn('Unable to build components.json')
  }
}

/**
 *
 * @param {{user: string; project: string}} repo
 * @param {string} filePath
 * @param {string} accessToken
 * @returns {Promise<{login: string | null; latestCommit: { date: string;  url: string } }[]>}
 */
async function fetchContributors(repo, filePath, accessToken = '') {
  const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers:
      accessToken && accessToken.length > 0
        ? { Authorization: `token ${accessToken}` }
        : {}
  })

  // Hash the values by the repo and file path.
  const hash = `${repo.user}/${repo.project}/${filePath}`
  const cached = CONTRIBUTOR_CACHE.get(hash)

  // Cache hit!
  if (cached) return cached

  try {
    const url = `/repos/${repo.user}/${repo.project}/commits?path=${filePath}&per_page=100`

    /** @type {import('@octokit/types').Endpoints['GET /repos/{owner}/{repo}/commits']['response']} */
    const { data } = await instance.get(url)

    const commits = data
      .map((commit) => ({
        login: commit.author && commit.author.login,
        latestCommit: {
          date: commit.commit.author?.date ?? '',
          url: commit.html_url
        }
      }))
      .filter((contributor) => Boolean(contributor.login))

    const result = uniqBy(commits, 'login')
    CONTRIBUTOR_CACHE.set(hash, result)

    return result
  } catch (error) {
    console.error(`[ERROR] Unable to fetch contributors for ${filePath}.`)
    console.error(error.message)
  } finally {
    return []
  }
}

module.exports = {
  onCreateWebpackConfig,
  createPages,
  onPostBuild
}
