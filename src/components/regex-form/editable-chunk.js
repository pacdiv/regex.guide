import PropTypes from "prop-types"
import React, { Fragment } from "react"

import ConditionInput from "./condition-input"
import ConditionSentence from "./condition-sentence"

function EditableChunk({
  availableAnchors,
  condition,
  editingIndex,
  editingPosition,
  index,
  onConditionEditingCancel,
  onConditionInputSubmit,
  onConditionSentenceMenuChange
}) {
  const ConditionCreationInput = <ConditionInput
    availableAnchors={availableAnchors}
    onCancel={onConditionEditingCancel}
    onSubmit={onConditionInputSubmit}
  />

  return (
    <Fragment>
      {editingIndex === index && editingPosition === 'before' && ConditionCreationInput}
      {editingIndex === index && !editingPosition ? (
        <ConditionInput
          {...condition.specs}
          availableAnchors={availableAnchors}
          onCancel={onConditionEditingCancel}
          onSubmit={onConditionInputSubmit}
        />
      ) : (
        <ConditionSentence
          condition={condition}
          index={index}
          onSentenceMenuChange={onConditionSentenceMenuChange}
        />
      )}
      {editingIndex === index && editingPosition === 'after' && ConditionCreationInput}
    </Fragment>
  )
}

EditableChunk.propTypes = {
  availableAnchors: PropTypes.arrayOf(PropTypes.object),
  condition: PropTypes.shape({
    regex: PropTypes.string,
    specs: PropTypes.object
  }),
  editingIndex: PropTypes.number,
  editingPosition: PropTypes.string,
  index: PropTypes.number,
  onConditionEditingCancel: PropTypes.func,
  onConditionInputSubmit: PropTypes.func,
  onConditionSentenceMenuChange: PropTypes.func
}

export default EditableChunk
