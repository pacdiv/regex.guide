import PropTypes from "prop-types"
import React from "react"

import RegexChunk from "./regex-result-chunk"

function RegexResult({ editingIndex, flags, regexChunks }) {
  return (
    <p>
      Regex: /
      {regexChunks.map((item, index) => (
        <RegexChunk
          key={`joined-chunk-${index}`}
          isBeingEdited={index === editingIndex}
          label={item}
        />
      ))}
      /{flags.global ? "g" : ""}
    </p>
  )
}

RegexResult.propTypes = {
  editingIndex: PropTypes.number,
  flags: PropTypes.shape({
    global: PropTypes.bool,
  }),
  regexChunks: PropTypes.arrayOf(PropTypes.string),
}

export default RegexResult
