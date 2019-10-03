import PropTypes from "prop-types"
import React from "react"

import { ChunkContainer } from "./Chunk.style"

function Chunk({ isBeingEdited, label }) {
  return <ChunkContainer {...{ isBeingEdited }}>{label}</ChunkContainer>
}

Chunk.propTypes = {
  isBeingEdited: PropTypes.bool,
  label: PropTypes.string,
}

export default Chunk
