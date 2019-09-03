import PropTypes from 'prop-types'
import React from "react"
import styled from "@emotion/styled"

const ErrorText = styled.p`
  color: crimson;
  margin: .5em 0;
`

const StyledRegexMatchesTable = styled.div`
  margin: 1em 0 0;

  p {
    margin-bottom: .5em;
  }

  div.table {
    align-items: center;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    margin: 0 auto 2em;
    max-width: 16em;
    width: 100%;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 100%;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }

  > div {
    &:first-of-type {
      min-width: 3em;
    }
    &:last-of-type {
      border-left: 1px solid #f0f0f0;
      flex: 1 1 auto;
    }
  }
`

function getMatchesArray(sourceString, regexChunks, flags) {
  const regex = new RegExp(regexChunks.join(""), flags.global ? "g" : "")
  return sourceString.match(regex)
}

function RegexMatchesTable({ flags, regexChunks, sourceString }) {
  const matches = getMatchesArray(sourceString, regexChunks, flags)

  if (!matches) {
    return <ErrorText>The regex gets no matches.</ErrorText>
  }

  return (
    <StyledRegexMatchesTable>
      <p>Matches:</p>
      <div className="table">
        <Row>
          <div>#</div>
          <div>content</div>
        </Row>
        {matches.map((match, index) => (
          <Row key={`regex-match-${index}`}>
            <div>{index}</div>
            <div>{match}</div>
          </Row>
        ))}
      </div>
    </StyledRegexMatchesTable>
  )
}

RegexMatchesTable.propTypes = {
  flags: PropTypes.shape({
    global: PropTypes.bool
  }),
  regexChunks: PropTypes.arrayOf(PropTypes.string),
  sourceString: PropTypes.string
}

RegexMatchesTable.defaultProps = {
  flags: {},
  regexChunks: [],
  sourceString: ""
}

export default RegexMatchesTable
