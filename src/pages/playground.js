import React from "react"

import Playground from "../components/playground"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ location }) => (
  <>
    <SEO title="The fastest way to start writing regular expressions" />
    <Layout centered location={location}>
      <Playground />
    </Layout>
  </>
)

export default IndexPage
