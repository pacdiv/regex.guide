import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled"

import { Button } from "../components/utils"
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

const IndexPage = ({ location }) => (
  <>
    <SEO title="" />
    <Layout location={location}>
      <Text>
        <p>Hi there, welcome! 👋</p>
        <p>
          The Regex Guide helps you to write a regular expression matching a
          given string.
          <br />
          No regular expressions knowledge required!
        </p>
        <p>Here's a snippet showing how you can use it:</p>
        <img
          alt="A Regex Guide use case"
          src="https://github.com/pacdiv/regex.guide/raw/master/readme-image.gif"
        />
        <p>Got it? Click the button below!</p>
        <Link to="/playground">
          <Button>Let’s start!</Button>
        </Link>
      </Text>
    </Layout>
  </>
)

export default IndexPage
