import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import styled from "@emotion/styled"

import { Button, TextInput } from "../utils"
import core from "../../utils/core"
import ClipboardAction from './clipboard-action'
import ConditionInput from "./condition-input"
import EditableChunk from "./editable-chunk"
import EditableText from "./editable-text"
import RegexMatchesTable from "./regex-matches-table"
import RegexStringResult from "./regex-string-result"
import RegexSentenceMenu from "./condition-sentence-menu"
import RegexFlagsForm from "./regex-flags-form"

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-size: 1.3em;
  line-height: 1.7em;
  text-align: center;

  div.intro {
    margin: 0 auto;
    max-width: 14em;
  }
`

class Form extends Component {
  static preChoices = []

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
      <StyledForm>
        <div className="intro">
          Dear regex guide,
          <br />
          how may I write
          <EditableText
            onClick={this.onSubmitFlagsFormSwitch}
            sentence={`a ${flags.global ? "global " : ""}regex`}
          />
          {isEditingFlags && (
            <RegexFlagsForm
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
          />
        ))}
        ?
        {chunks.length ? (
          <Fragment>
            {sourceString && <RegexMatchesTable {...{ flags, regexChunks, sourceString }} />}
            <RegexStringResult {...{ editingIndex, flags, regexChunks }} />
            <ClipboardAction
              flags={flags.global ? "g" : ""}
              value={regexChunks.join("")}
            />
          </Fragment>
        ) : null}
        {this.state.sentenceEl &&
          ReactDOM.createPortal(
            <RegexSentenceMenu
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
      </StyledForm>
    )
  }
}

export default Form
