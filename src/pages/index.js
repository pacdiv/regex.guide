import React from "react"
import styled from "@emotion/styled"

import { FooterLogo } from "../components/utils"
import Playground from "../components/playground"
import Layout from "../components/layout"
import SEO from "../components/seo"

// const PlaygroundContainer = styled.div`
//   align-items: stretch;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   min-height: 80vh;
//   padding: 4em 0;
// `

// const MoreInfo = styled.div`
//   margin: 0 auto 2em;
// `

const IndexPage = ({ location }) => (
  <>
    <SEO title="The easiest way to learn regular expressions" />
    <Layout centered location={location}>
      <Playground />
  </Layout>
  </>
)

export default IndexPage
