import { Link } from "gatsby"
import React, { Component } from "react"
import styled from "@emotion/styled"

import { Button } from "../components/utils"
import editIcon from "../../content/assets/icon-edit.png"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Text = styled.div`
  font-family: monospace;
  font-size: 1.25em;
  text-align: center;

  @media (min-width: 480px) {
    max-width: 32em;
    margin-left: auto;
    margin-right: auto;
  }
`

class IndexPage extends Component {
  componentDidMount() {
    if (
      typeof window !== "undefined" &&
      !sessionStorage.getItem("didSeeOnboarding")
    ) {
      sessionStorage.setItem("didSeeOnboarding", true)
    }
  }

  render() {
    const { location } = this.props

    return (
      <>
        <SEO
          title="RegexGuide: Online Tool for Future Regex Users."
          withoutSiteTitle
        />
        <Layout location={location}>
          <Text>
            <p>
              Hi there, welcome!{" "}
              <span aria-label="welcome!" role="img">
                👋
              </span>
            </p>
            <p>
              The RegexGuide helps you to perceive how useful and powerful
              regular expressions can be.
            </p>
            <p>
              How? By helping you to write your first simple regular expressions
              without knowledge required!
            </p>
            <p>
              Here’s what you need to do! Enter a text to match, then hit “Add a
              first condition” and icon buttons like “
              <img alt="menu" src={editIcon} />” to add as much matching
              conditions as you need!
            </p>
            <p>
              Disclaimer: Once you feel comfortable with these simple regexes,
              read some documentation and start writing more complex ones on
              your own!{" "}
              <span aria-label="welcome!" role="img">
                🚀
              </span>
            </p>
            <p>Got it? Click the button below!</p>
            <Link to="/playground/">
              <Button>Let’s start!</Button>
            </Link>
          </Text>
        </Layout>
      </>
    )
  }
}

export default IndexPage
