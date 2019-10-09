import React from "react"
import styled from "@emotion/styled"

const StyledBanner = styled.div`
  background-color: lightsalmon;
  color: white;
  height: 3em;
  font-family: monospace;
  font-size: 0.8em;
  font-weight: 700;
  line-height: 3em;
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  a {
    color: white;
  }
`

function OpenSourceBanner() {
  return (
    <StyledBanner>
      The regex guide is open source. Join us on{" "}
      <a href="https://github.com/pacdiv/regex.guide" target="blank_">
        github
      </a>
      !
    </StyledBanner>
  )
}

export default OpenSourceBanner
