import React from "react"
import styled from "@emotion/styled"
import typeofLogo from "../../../content/assets/typeof-logo.png"

const StyledLogo = styled.p`
  text-align: center;

  a {
    box-shadow: none;
    color: #444;
    font-family: "Times New Roman";
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -2px;
    margin-top: 0px;
    text-decoration: none;
    font-style: normal;
  }

  img {
    margin-bottom: 20px;
    max-width: 150px;
  }
`

const FooterLogo = () => {
  return (
    <StyledLogo>
      <a href="https://www.typeof.co" target="blank_">
        <img alt="typeof" src={typeofLogo} />
      </a>
    </StyledLogo>
  )
}

export default FooterLogo
