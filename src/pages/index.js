import React from "react"
import styled from "@emotion/styled"

import { FooterLogo } from "../components/utils"
import Form from "../components/regex-form/form"
import Layout from "../components/layout"
import SEO from "../components/seo"

const FormContainer = styled.div`
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
    <FormContainer>
      <Form />
    </FormContainer>
    <MoreInfoParagraph>
      <a href="http://bit.ly/2ZJjUTy" target="blank_">
        <FooterLogo />
      </a>
    </MoreInfoParagraph>
  </Layout>
)

export default IndexPage
