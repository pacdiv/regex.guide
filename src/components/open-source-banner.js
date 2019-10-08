import React from "react"
import styled from "@emotion/styled"

const StyledBanner = styled.div`
  background-color: lightsalmon;
  color: white;
  height: 3em;
  font-family: monospace;
  font-size: 0.8em;
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
      The rege guide is open source.{" "}
      <a href="https://github.com/pacdiv/regex.guide" target="blank_">
        Join us on github
      </a>
      .
    </StyledBanner>
  )
}

export default OpenSourceBanner
