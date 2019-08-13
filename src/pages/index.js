import React from "react"
import styled from "@emotion/styled"

import { FooterLogo } from "../components/utils"
import Playground from "../components/playground/playground"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PlaygroundContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 85vh;
  padding: 4em 0;
`

const MoreInfoParagraph = styled.div`
  margin: 0 auto 2em;
  max-width: 6em;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Write a sentence, get a regex" />
    <PlaygroundContainer>
      <Playground />
    </PlaygroundContainer>
    <MoreInfoParagraph>
      <a href="http://bit.ly/2ZJjUTy" target="blank_">
        <FooterLogo />
      </a>
    </MoreInfoParagraph>
  </Layout>
)

export default IndexPage
