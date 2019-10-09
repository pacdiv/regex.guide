import PropTypes from "prop-types"
import React, { Component, Fragment } from "react"

import {
  ActionButton,
  ActionsWrapper,
  StepsWrapper,
  TextInputGroup,
  ErrorParagraph,
} from "./ConditionInput.style"
import {
  RelativeFormContainer,
  TextInput,
  TextInputListForm,
} from "../../utils"
import { captures, customCharacters, quantifiers } from "../../../lib/core"
import Step from "./Step"

class ConditionInput extends Component {
  static propTypes = {
    anchor: PropTypes.string,
    availableAnchors: PropTypes.arrayOf(PropTypes.object),
    availableBackReferences: PropTypes.arrayOf(PropTypes.object),
    availableDefaultCharacters: PropTypes.arrayOf(PropTypes.object),
    capturedExpression: PropTypes.string,
    characters: PropTypes.string,
    exactQuantifierValue: PropTypes.string,
    minimumQuantifierValue: PropTypes.string,
    maximumQuantifierValue: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    quantifier: PropTypes.string,
    queryString: PropTypes.string,
    setValue: PropTypes.string,
    wordList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }

  static customCharactersKeys = customCharacters.map(({ key }) => key)

  static isDigitQuantifier = quantifier => {
    return ["AT_LEAST", "BETWEEN", "EXACTLY"].includes(quantifier)
  }

  state = {
    anchor: this.props.anchor || "CONTAINS",
    backReference: this.props.backReference || "",
    capturedExpression: this.props.capturedExpression || "NO",
    characters: this.props.characters || "ALPHANUMERIC_CHARACTERS",
    currentStep: this.props.anchor ? 2 : 1,
    exactQuantifierValue: this.props.exactQuantifierValue || "",
    error: null,
    minimumQuantifierValue: this.props.minimumQuantifierValue || "",
    maximumQuantifierValue: this.props.maximumQuantifierValue || "",
    quantifier: this.props.quantifier || "ONE_OR_MORE",
    queryString: this.props.queryString || "",
    setValue: this.props.setValue || "",
    wordList: this.props.wordList || [],
  }

  isOnFirstStep = () => {
    const { anchor } = this.props
    const { currentStep } = this.state

    return currentStep === 1 || (anchor && currentStep === 2)
  }

  isOnLastStep = () => {
    const {
      characters: selectedCharacters,
      currentStep,
      quantifier,
    } = this.state
    const { customCharactersKeys } = ConditionInput

    if (
      currentStep === 4 &&
      !customCharactersKeys.includes(selectedCharacters) &&
      (quantifier === "ONE_OR_MORE" || quantifier === "NONE_OR_MORE")
    )
      return true
    else if (
      currentStep === 5 &&
      !customCharactersKeys.includes(selectedCharacters) &&
      quantifier !== "ONE_OR_MORE" &&
      quantifier !== "NONE_OR_MORE"
    )
      return true
    else if (
      currentStep === 5 &&
      customCharactersKeys.includes(selectedCharacters) &&
      (quantifier === "ONE_OR_MORE" || quantifier === "NONE_OR_MORE")
    )
      return true
    else if (currentStep === 6) return true

    return false
  }

  onChange = event => {
    const { value } = event.target
    this.setState({ queryString: value }, () => this.props.onChange(value))
  }

  onAnchorSelectChange = event => {
    this.setState({
      anchor: event.target.value,
      currentStep: this.state.currentStep + 1,
    })
    event.target.blur()
  }

  onBackReferenceChange = event => {
    this.setState({
      backReference: event.target.value,
      currentStep: this.state.currentStep + 1,
    })
    event.target.blur()
  }

  onCancelButtonClick = event => {
    event.preventDefault()

    if (this.isOnFirstStep()) this.props.onCancel(event)
    else this.setState({ currentStep: this.state.currentStep - 1 })
  }

  onCapturedExpressionChange = event => {
    this.setState({ capturedExpression: event.target.value }, this.submit)

    event.target.blur()
  }

  onExactLimitTextFieldChange = event => {
    this.setState({ exactQuantifierValue: event.target.value })
  }

  onCharactersSelectChange = event => {
    this.setState({
      characters: event.target.value,
      currentStep: this.state.currentStep + 1,
    })
    event.target.blur()
  }

  onMinimumLimitTextFieldChange = value => {
    this.setState({ minimumQuantifierValue: value })
  }

  onMaximumLimitTextFieldChange = value => {
    this.setState({ maximumQuantifierValue: value })
  }

  onQuantifierSelectChange = event => {
    this.setState({
      currentStep: this.state.currentStep + 1,
      quantifier: event.target.value,
    })
    event.target.blur()
  }

  onSetTextFieldChange = value => {
    this.setState({ setValue: value })
  }

  onSubmitButtonClick = event => {
    event.preventDefault()

    if (this.isOnLastStep()) this.submit()
    else this.setState({ currentStep: this.state.currentStep + 1 })
  }

  onWordListChange = value => {
    this.setState({ wordList: value })
  }

  submit = () => {
    this.props
      .onSubmit({ ...this.state })
      .catch(err => this.setState({ error: err.message }))
  }

  render() {
    const {
      anchor: selectedAnchor,
      backReference,
      capturedExpression,
      characters: selectedCharacters,
      currentStep,
      error,
      quantifier: selectedQuantifier,
    } = this.state
    const charactersOptions = this.props.availableDefaultCharacters

    return (
      <RelativeFormContainer>
        <StepsWrapper step={currentStep}>
          {this.renderDefaultStep(
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
          {ConditionInput.isDigitQuantifier(selectedQuantifier) &&
            this.renderNumbersStepForm()}
          {this.renderDefaultStep(
            `Pick a type of characters:`,
            charactersOptions,
            selectedCharacters,
            this.onCharactersSelectChange
          )}
          {[
            "CHARACTERS_SUCH_AS",
            "CHARACTERS_EXCEPT",
            "WORDS_SUCH_AS",
          ].includes(selectedCharacters) && this.renderSetStepForm()}
          {selectedCharacters === "BACK_REFERENCES" &&
            this.renderDefaultStep(
              "Pick a previous reference:",
              this.props.availableBackReferences,
              backReference,
              this.onBackReferenceChange
            )}
          {this.renderDefaultStep(
            "Will you need to match this with following expressions?",
            captures,
            capturedExpression,
            this.onCapturedExpressionChange
          )}
        </StepsWrapper>
        {error && <ErrorParagraph>{error}</ErrorParagraph>}
        <ActionsWrapper>
          <ActionButton
            className="transparent-theme"
            onClick={this.onCancelButtonClick}
          >
            {this.isOnFirstStep() ? "Cancel" : "← Back"}
          </ActionButton>
          <ActionButton
            className="submit-theme"
            onClick={this.onSubmitButtonClick}
          >
            {this.isOnLastStep() ? "Submit" : "Next →"}
          </ActionButton>
        </ActionsWrapper>
      </RelativeFormContainer>
    )
  }

  renderNumbersStepForm() {
    const {
      currentStep,
      maximumQuantifierValue,
      minimumQuantifierValue,
      quantifier,
    } = this.state
    let title = ""

    if (quantifier === "EXACTLY") title = "How many exactly?"
    else if (quantifier === "AT_LEAST") title = "At least how many?"
    else if (quantifier === "BETWEEN") title = "Between how many?"

    return (
      <Step currentStep={currentStep} title={title}>
        <TextInputGroup>
          <TextInput
            label="minimum"
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
                label="maximum"
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
    const {
      characters: selectedCharacters,
      currentStep,
      setValue,
      wordList,
    } = this.state
    let title = ""

    if (selectedCharacters.startsWith("CHARACTERS_"))
      title = title.concat("characters")
    else if (selectedCharacters === "WORDS_SUCH_AS")
      title = title.concat("words")

    return (
      <Step
        currentStep={currentStep}
        title={`Type the ${title} to ${
          selectedCharacters === "CHARACTERS_EXCEPT" ? "avoid" : "match"
        }:`}
      >
        {selectedCharacters === "WORDS_SUCH_AS" && (
          <TextInputListForm
            data={wordList}
            label="wordlist-set"
            onChange={this.onWordListChange}
          />
        )}
        {selectedCharacters.startsWith("CHARACTERS_") && (
          <TextInputGroup>
            <TextInput
              exceptions="-"
              label="characters-set"
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
    const { currentStep } = this.state
    const keyPrefix = encodeURI(title)

    return (
      <Step currentStep={currentStep} title={title}>
        <div className="buttons-wrapper">
          {dataSource.map(({ key, label }) => (
            <button
              {...(currentValue === key && { className: "selected" })}
              key={`${keyPrefix}-${key}`}
              onClick={callback}
              type="button"
              value={key}
            >
              {label}
            </button>
          ))}
        </div>
      </Step>
    )
  }
}

export default ConditionInput
