import React from "react"
import styled from "@emotion/styled"

const StyledLogo = styled.p`
  text-align: center;

  a {
    color: #444;
    font-family: "Times New Roman";
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -2px;
    margin-top: 0px;
    text-decoration: none;
    font-style: normal;
  }
`

const FooterLogo = () => {
  return (
    <StyledLogo>
      <a href="http://bit.ly/2koZuQp" target="blank_">
        growthnotes
      </a>
    </StyledLogo>
  )
}

export default FooterLogo
