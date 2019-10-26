import React, { Component } from "react"
import { navigate } from "gatsby"

import Playground from "../components/playground"
import Layout from "../components/layout"
import SEO from "../components/seo"

class PlaygroundPage extends Component {
  constructor(props) {
    super(props)

    if (
      typeof window !== "undefined" &&
      !sessionStorage.getItem("didSeeOnboarding")
    ) {
      navigate("/", { replace: true })
    }
  }

  render() {
    const { location } = this.props

    return (
      <>
        <SEO title="The fastest way to start writing regular expressions" />
        <Layout centered location={location}>
          <Playground />
        </Layout>
      </>
    )
  }
}

export default PlaygroundPage
