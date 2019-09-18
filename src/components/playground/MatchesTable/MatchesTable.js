import PropTypes from 'prop-types'
import React from "react"

import { ErrorText, Row, TableContainer } from "./MatchesTable.style"

function getMatchesArray(sourceString, regexChunks, flags) {
  const regex = new RegExp(regexChunks.join(""), flags.global ? "g" : "")
  return sourceString.match(regex)
}

function MatchesTable({ flags, regexChunks, sourceString }) {
  const matches = getMatchesArray(sourceString, regexChunks, flags)

  if (!matches) {
    return <ErrorText>The regex gets no matches.</ErrorText>
  }

  return (
    <TableContainer>
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
    </TableContainer>
  )
}

MatchesTable.propTypes = {
  flags: PropTypes.shape({
    global: PropTypes.bool
  }),
  regexChunks: PropTypes.arrayOf(PropTypes.string),
  sourceString: PropTypes.string
}

MatchesTable.defaultProps = {
  flags: {},
  regexChunks: [],
  sourceString: ""
}

export default MatchesTable
