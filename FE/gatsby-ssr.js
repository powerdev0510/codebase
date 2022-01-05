/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// Hack, to reorder the helmet components as first in <head> tag
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  /**
   * @type {any[]} headComponents
   */
  const headComponents = getHeadComponents()

  headComponents.sort((a) => {
    if (a.props && a.props['data-react-helmet']) {
      return -1
    }
    return 1
  })

  replaceHeadComponents(headComponents)
}
