import PropTypes from "prop-types"
import React, { Fragment } from "react"

import ConditionInput from "../ConditionInput"
import ConditionSentence from "../ConditionSentence"

function EditableChunk({
  availableAnchors,
  availableBackReferences,
  availableDefaultCharacters,
  condition,
  editingIndex,
  editingPosition,
  index,
  onConditionEditingCancel,
  onConditionInputSubmit,
  onConditionSentenceMenuChange,
  position,
}) {
  const ConditionCreationInput = (
    <ConditionInput
      availableAnchors={availableAnchors}
      availableBackReferences={availableBackReferences}
      availableDefaultCharacters={availableDefaultCharacters}
      onCancel={onConditionEditingCancel}
      onSubmit={onConditionInputSubmit}
    />
  )

  return (
    <Fragment>
      {editingIndex === index &&
        editingPosition === "before" &&
        ConditionCreationInput}
      {editingIndex === index && !editingPosition ? (
        <ConditionInput
          {...condition.specs}
          availableAnchors={availableAnchors}
          availableBackReferences={availableBackReferences}
          availableDefaultCharacters={availableDefaultCharacters}
          onCancel={onConditionEditingCancel}
          onSubmit={onConditionInputSubmit}
        />
      ) : (
        <ConditionSentence
          condition={condition}
          index={index}
          onSentenceMenuChange={onConditionSentenceMenuChange}
          position={position}
        />
      )}
      {editingIndex === index &&
        editingPosition === "after" &&
        ConditionCreationInput}
    </Fragment>
  )
}

EditableChunk.propTypes = {
  availableAnchors: PropTypes.arrayOf(PropTypes.object),
  availableBackReferences: PropTypes.arrayOf(PropTypes.object),
  availableDefaultCharacters: PropTypes.arrayOf(PropTypes.object),
  condition: PropTypes.shape({
    regex: PropTypes.string,
    specs: PropTypes.object,
  }),
  editingIndex: PropTypes.number,
  editingPosition: PropTypes.string,
  index: PropTypes.number,
  onConditionEditingCancel: PropTypes.func,
  onConditionInputSubmit: PropTypes.func,
  onConditionSentenceMenuChange: PropTypes.func,
  position: PropTypes.string,
}

export default EditableChunk
