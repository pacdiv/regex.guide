import { css } from "@emotion/core"
import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"

const StyledRegexChunk = styled.span`
  ${({ isBeingEdited }) =>
    isBeingEdited && css`
      background-color: lightgrey;
    `
  }
`

function RegexChunk({ isBeingEdited, label }) {
  return (
    <StyledRegexChunk {...{ isBeingEdited }}>
      {label}
    </StyledRegexChunk>
  )
}

RegexChunk.propTypes = {
  isBeingEdited: PropTypes.bool,
  label: PropTypes.string
}

export default RegexChunk
