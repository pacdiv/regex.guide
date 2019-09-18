import PropTypes from "prop-types"
import React from "react"

import Chunk from "./Chunk"

function MatchesString({ editingIndex, flags, regexChunks }) {
  return (
    <p>
      Regex: /
      {regexChunks.map((item, index) => (
        <Chunk
          key={`joined-chunk-${index}`}
          isBeingEdited={index === editingIndex}
          label={item}
        />
      ))}
      /{flags.global ? "g" : ""}
    </p>
  )
}

MatchesString.propTypes = {
  editingIndex: PropTypes.number,
  flags: PropTypes.shape({
    global: PropTypes.bool,
  }),
  regexChunks: PropTypes.arrayOf(PropTypes.string),
}

export default MatchesString
