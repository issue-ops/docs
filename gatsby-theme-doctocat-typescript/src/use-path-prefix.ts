import { useStaticQuery, graphql } from 'gatsby'

export default function usePathPrefix() {
  const data = useStaticQuery(graphql`
    {
      site {
        pathPrefix
      }
    }
  `)
  return data.site.pathPrefix
}
