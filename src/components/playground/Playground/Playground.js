import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"

import { Button, TextInput } from "../../utils"
import core from "../../../lib/core"
import ClipboardButton from "../ClipboardButton"
import ConditionInput from "../ConditionInput"
import EditableChunk from "../EditableChunk"
import EditableText from "../EditableText"
import MatchesString from "../MatchesString"
import MatchesTable from "../MatchesTable"
import SentenceMenu from "../SentenceMenu"
import FlagsForm from "../FlagsForm"

import { PlaygroundContainer } from "./Playground.style"

class Playground extends Component {
  static preChoices = []

  static getChunkPosition(index, arrayLength) {
    if (arrayLength >= 1) {
      if (index === arrayLength - 2) return "second-last"
      else if (index < arrayLength - 2) return "body"
    }

    return null
  }

  state = {
    chunks: [],
    isEditingAtIndex: null,
    isEditingFlags: false,
    flags: {},
    lastActiveSentenceMenu: null,
    regexChunks: [],
    sourceString: "",
    sentenceEl: null,
  }

  core = Object.create(core)

  componentDidMount() {
    this.setState({ flags: this.core.getFlags() })
  }

  onConditionEditingCancel = () => {
    this.setState({ isEditingAtIndex: null })
  }

  onConditionInputSubmit = specs => {
    const { index, position } = this.state.isEditingAtIndex
    const realIndex = position === "after" ? index + 1 : index

    return this.core
      .addCondition(specs, realIndex, Boolean(position))
      .then(() =>
        this.setState({
          chunks: this.core.getChunks(),
          isEditingAtIndex: null,
          regexChunks: this.core.getRegexChunks(),
        })
      )
      .catch(err => Promise.reject(err))
  }

  onConditionSentenceMenuChange = (index, target) => {
    this.setState({
      lastActiveSentenceMenu: index,
      sentenceEl: target,
    })
  }

  onConditionSentenceMenuHide = () => {
    this.setState({ sentenceEl: null })
  }

  onDeleteConditionsButtonClick = index => {
    return this.core
      .deleteCondition(index)
      .then(() =>
        this.setState({
          chunks: this.core.getChunks(),
          isEditingAtIndex: null,
          regexChunks: this.core.getRegexChunks(),
          sentenceEl: null,
        })
      )
      .catch(err => Promise.reject(err))
  }

  onEditConditionsButtonClick = (index = -1, position = "after") => {
    this.setState({
      isEditingAtIndex: {
        index,
        position,
      },
      sentenceEl: null,
    })
  }

  onFlagChange = (flag, value) => {
    this.core.setFlag(flag, value)
    this.setState({ flags: this.core.getFlags() })
  }

  onSourceStringChange = (sourceString = "") => {
    this.setState({ sourceString })
  }

  onSubmitFlagsFormSwitch = () =>
    this.setState({ isEditingFlags: !this.state.isEditingFlags })

  render() {
    const {
      chunks,
      flags,
      isEditingAtIndex,
      isEditingFlags,
      lastActiveSentenceMenu,
      regexChunks,
      sourceString,
    } = this.state
    const { index: editingIndex = null, position: editingPosition } =
      isEditingAtIndex || {}
    const availableAnchors = this.core.getAvailableAnchors(
      editingIndex,
      editingPosition
    )

    return (
      <PlaygroundContainer>
        <div className="intro">
          Let’s write
          <EditableText
            label="flags"
            onClick={this.onSubmitFlagsFormSwitch}
            sentence={`a ${flags.global ? "global " : ""}regex`}
          />
          {isEditingFlags && (
            <FlagsForm
              flags={flags}
              onFlagChange={this.onFlagChange}
              onSubmitClick={this.onSubmitFlagsFormSwitch}
            />
          )}
          verifying that the text
        </div>
        <TextInput
          autoFocus
          onChange={this.onSourceStringChange}
          placeholder="👉 type your text here 👈"
        />
        <span>does</span>
        {!chunks.length && isEditingAtIndex && (
          <ConditionInput
            availableAnchors={availableAnchors}
            onCancel={this.onConditionEditingCancel}
            onSubmit={this.onConditionInputSubmit}
          />
        )}
        {!chunks.length && !isEditingAtIndex && (
          <Button onClick={() => this.onEditConditionsButtonClick()}>
            Add a first condition
          </Button>
        )}
        {chunks.map((condition, index) => (
          <EditableChunk
            key={`editable-chunk-${index}`}
            {...{
              availableAnchors,
              condition,
              editingIndex,
              editingPosition,
              index,
            }}
            onConditionEditingCancel={this.onConditionEditingCancel}
            onConditionInputSubmit={this.onConditionInputSubmit}
            onConditionSentenceMenuChange={this.onConditionSentenceMenuChange}
            position={Playground.getChunkPosition(index, chunks.length)}
          />
        ))}
        ?
        {chunks.length ? (
          <Fragment>
            {sourceString && (
              <MatchesTable {...{ flags, regexChunks, sourceString }} />
            )}
            <MatchesString {...{ editingIndex, flags, regexChunks }} />
            <ClipboardButton
              flags={flags.global ? "g" : ""}
              value={regexChunks.join("")}
            />
          </Fragment>
        ) : null}
        {this.state.sentenceEl &&
          ReactDOM.createPortal(
            <SentenceMenu
              anchorType={chunks[lastActiveSentenceMenu].specs.anchor}
              onAddAfterButtonClick={() =>
                this.onEditConditionsButtonClick(
                  lastActiveSentenceMenu,
                  "after"
                )
              }
              onAddBeforeButtonClick={() =>
                this.onEditConditionsButtonClick(
                  lastActiveSentenceMenu,
                  "before"
                )
              }
              onDeleteButtonClick={() =>
                this.onDeleteConditionsButtonClick(lastActiveSentenceMenu)
              }
              onEditButtonClick={() =>
                this.onEditConditionsButtonClick(lastActiveSentenceMenu, null)
              }
              onSwitchHiddenMenu={this.onConditionSentenceMenuHide}
            />,
            this.state.sentenceEl
          )}
      </PlaygroundContainer>
    )
  }
}

export default Playground
