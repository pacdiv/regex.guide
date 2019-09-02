import PropTypes from "prop-types"
import React, { Component, Fragment } from "react"
import styled from "@emotion/styled"

import { Button, RelativeFormContainer, TextInput, TextInputListForm } from "../utils"
import { characters, getLabelFromKey, quantifiers } from "../../lib/core"
import Step from './condition-input-step'

const TextInputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  width: 16em;

  span {
    width: 4em;
  }

  input,
  span {
    margin-bottom: .5em;
  }
`

const StyledErrorParagraph = styled.p`
  color: crimson;
`

class ConditionInput extends Component {
  static propTypes = {
    anchor: PropTypes.string,
    availableAnchors: PropTypes.arrayOf(PropTypes.object),
    characters: PropTypes.string,
    exactQuantifierValue: PropTypes.string,
    minimumQuantifierValue: PropTypes.string,
    maximumQuantifierValue: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    quantifier: PropTypes.string,
    queryString: PropTypes.string,
    setValue: PropTypes.string,
    wordList: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultQuantifiers = ["BETWEEN", "EXACTLY", "ONE_OR_MORE", "NONE_OR_MORE"]
  static preChoices = []

  state = {
    anchor: this.props.anchor || "CONTAINS",
    characters: this.props.characters || "ALPHANUMERIC_CHARACTERS",
    exactQuantifierValue: this.props.exactQuantifierValue || "",
    error: null,
    minimumQuantifierValue: this.props.minimumQuantifierValue || "",
    maximumQuantifierValue: this.props.maximumQuantifierValue || "",
    quantifier: this.props.quantifier || "ONE_OR_MORE",
    queryString: this.props.queryString || "",
    setValue: this.props.setValue || "",
    wordList: this.props.wordList || [],
  }

  componentDidUpdate(prevProps, prevState) {
    const { defaultQuantifiers } = ConditionInput
    const { quantifier: currentQuantifier } = this.state

    if (!defaultQuantifiers.includes(prevState.quantifier) && defaultQuantifiers.includes(currentQuantifier)) {
      this.setState({ characters: "ALPHANUMERIC_CHARACTERS" })
    }
    if (prevState.quantifier !== "SET" && currentQuantifier === "SET") {
      this.setState({ characters: "WORDS_SUCH_AS" })
    }
  }

  onChange = event => {
    const { value } = event.target

    this.setState({ queryString: value }, () => this.props.onChange(value))
  }

  onAnchorSelectChange = event => {
    this.setState({ anchor: event.target.value })
    event.target.blur()
  }

  onExactLimitTextFieldChange = event => {
    this.setState({ exactQuantifierValue: event.target.value })
  }

  onCharactersSelectChange = event => {
    this.setState({ characters: event.target.value })
    event.target.blur()
  }

  onMinimumLimitTextFieldChange = value => {
    this.setState({ minimumQuantifierValue: value })
  }

  onMaximumLimitTextFieldChange = value => {
    this.setState({ maximumQuantifierValue: value })
  }

  onQuantifierSelectChange = event => {
    this.setState({ quantifier: event.target.value })
    event.target.blur()
  }

  onSetTextFieldChange = value => {
    this.setState({ setValue: value })
  }

  onSubmitButtonClick = event => {
    event.preventDefault()

    this.props.onSubmit({ ...this.state })
      .then(() => this.setState({ error: null }))
      .catch(err => this.setState({ error: err.message }))
  }

  onWordListChange = value => {
    this.setState({ wordList: value })
  }

  render() {
    const {
      anchor: selectedAnchor,
      characters: selectedCharacters,
      error,
      quantifier: selectedQuantifier
    } = this.state
    const charactersOptions = characters[selectedQuantifier] || characters.DEFAULT

    return (
      <RelativeFormContainer>
        {!this.props.anchor && this.renderDefaultStep(
          "Pick an anchor:",
          this.props.availableAnchors,
          selectedAnchor,
          this.onAnchorSelectChange
        )}
        {this.renderDefaultStep(
          "Pick an quantifier:",
          quantifiers,
          selectedQuantifier,
          this.onQuantifierSelectChange
        )}
        {
          (selectedQuantifier === "BETWEEN" || selectedQuantifier === "EXACTLY") &&
          this.renderNumbersStepForm()
        }
        {this.renderDefaultStep(
          `Pick a type of ${selectedQuantifier === "SET" ? "set" : "characters"}:`,
          charactersOptions,
          selectedCharacters,
          this.onCharactersSelectChange
        )}
        {selectedQuantifier === "SET" && this.renderSetStepForm()}
        {error && <StyledErrorParagraph>{error}</StyledErrorParagraph>}
        <Button className="submit-theme" onClick={this.onSubmitButtonClick}>
          Submit
        </Button>
        <Button className="transparent-theme" onClick={this.props.onCancel}>
          Cancel
        </Button>
      </RelativeFormContainer>
    )
  }

  renderNumbersStepForm() {
    const { maximumQuantifierValue, minimumQuantifierValue, quantifier } = this.state

    return (
      <Step title={quantifier === "EXACTLY" ? "How many exactly?" : "Between how many?"}>
        <TextInputGroup>
          <TextInput
            onChange={this.onMinimumLimitTextFieldChange}
            placeholder="0"
            queryString={minimumQuantifierValue}
            smallWidth
            type="number"
          />
          {quantifier === "BETWEEN" && (
            <Fragment>
              <span>and</span>
              <TextInput
                onChange={this.onMaximumLimitTextFieldChange}
                placeholder="0"
                queryString={maximumQuantifierValue}
                smallWidth
                type="number"
              />
            </Fragment>
          )}
        </TextInputGroup>
      </Step>
    )
  }

  renderSetStepForm() {
    const { characters: selectedCharacters, setValue, wordList } = this.state

    return (
      <Step title={`${getLabelFromKey(characters.SET, selectedCharacters, true)} such as:`}>
        {selectedCharacters === "WORDS_SUCH_AS" && (
          <TextInputListForm
            data={wordList}
            onChange={this.onWordListChange}
          />
        )}
        {selectedCharacters === "CHARACTERS" && (
          <TextInputGroup>
            <TextInput
              onChange={this.onSetTextFieldChange}
              placeholder="xyz"
              queryString={setValue}
              uniqueCharacters
            />
          </TextInputGroup>
        )}
      </Step>
    )
  }

  renderDefaultStep(title, dataSource, currentValue, callback) {
    return (
      <Step title={title}>
        <div className="buttons-wrapper">
          {dataSource.map(({ key, label }) => (
            <button {...currentValue === key && { className: "selected"}} type="button" value={key} onClick={callback}>
              {label}
            </button>
          ))}
        </div>
      </Step>
    )
  }
}

export default ConditionInput
