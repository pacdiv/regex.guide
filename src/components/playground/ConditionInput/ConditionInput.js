import PropTypes from "prop-types"
import React, { Component, Fragment } from "react"

import { ActionsWrapper, StepsWrapper, TextInputGroup, ErrorParagraph } from "./ConditionInput.style"
import { Button, RelativeFormContainer, TextInput, TextInputListForm } from "../../utils"
import { characters, getLabelFromKey, quantifiers } from "../../../lib/core"
import Step from './Step'

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
    wordList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  }

  static defaultQuantifiers = [
    "BETWEEN",
    "EXACTLY",
    "ONE_OR_MORE",
    "NONE_OR_MORE",
  ]
  static preChoices = []

  state = {
    anchor: this.props.anchor || "CONTAINS",
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

  componentDidUpdate(prevProps, prevState) {
    const { defaultQuantifiers } = ConditionInput
    const { quantifier: currentQuantifier } = this.state

    if (
      !defaultQuantifiers.includes(prevState.quantifier) &&
      defaultQuantifiers.includes(currentQuantifier)
    ) {
      this.setState({ characters: "ALPHANUMERIC_CHARACTERS" })
    }
    if (prevState.quantifier !== "SET" && currentQuantifier === "SET") {
      this.setState({ characters: "WORDS_SUCH_AS" })
    }
  }

  isOnFirstStep = () => {
    const { anchor } = this.props
    const { currentStep } = this.state

    return currentStep === 1 || (anchor && currentStep === 2)
  }

  isOnLastStep = () => {
    const { currentStep, quantifier } = this.state

    return (
      currentStep === 4 ||
      (currentStep === 3 &&
        (quantifier === "ONE_OR_MORE" || quantifier === "NONE_OR_MORE"))
    )
  }

  onChange = event => {
    const { value } = event.target

    this.setState({ queryString: value }, () => this.props.onChange(value))
  }

  onAnchorSelectChange = event => {
    this.setState({
      anchor: event.target.value,
      currentStep: this.state.currentStep + 1
    })
    event.target.blur()
  }

  onCancelButtonClick = event => {
    event.preventDefault()

    if (this.isOnFirstStep())
      this.props.onCancel(event)
    else
      this.setState({ currentStep: this.state.currentStep - 1 })
  }

  onExactLimitTextFieldChange = event => {
    this.setState({ exactQuantifierValue: event.target.value })
  }

  onCharactersSelectChange = event => {
    this.setState(
      {
        characters: event.target.value,
        ...(this.state.quantifier === "SET" && {
          currentStep: this.state.currentStep + 1,
        }),
      },
      () => this.state.quantifier !== "SET" && this.submit()
    )

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
      quantifier: event.target.value
    })
    event.target.blur()
  }

  onSetTextFieldChange = value => {
    this.setState({ setValue: value })
  }

  onSubmitButtonClick = event => {
    event.preventDefault()

    if (this.isOnLastStep())
      this.submit()
    else
      this.setState({ currentStep: this.state.currentStep + 1 })
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
      characters: selectedCharacters,
      currentStep,
      error,
      quantifier: selectedQuantifier,
    } = this.state
    const charactersOptions =
      characters[selectedQuantifier] || characters.DEFAULT

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
          {(selectedQuantifier === "BETWEEN" ||
            selectedQuantifier === "EXACTLY") &&
            this.renderNumbersStepForm()
          }
          {this.renderDefaultStep(
            `Pick a type of ${
              selectedQuantifier === "SET" ? "set" : "characters"
            }:`,
            charactersOptions,
            selectedCharacters,
            this.onCharactersSelectChange
          )}
          {selectedQuantifier === "SET" && this.renderSetStepForm()}
        </StepsWrapper>
        {error && <ErrorParagraph>{error}</ErrorParagraph>}
        <ActionsWrapper>
          <Button
            className="transparent-theme"
            onClick={this.onCancelButtonClick}
          >
            {this.isOnFirstStep() ? "Cancel" : "← Back"}
          </Button>
          <Button className="submit-theme" onClick={this.onSubmitButtonClick}>
            {this.isOnLastStep() ? "Submit" : "Next →"}
          </Button>
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

    return (
      <Step
        currentStep={currentStep}
        title={quantifier === "EXACTLY" ? "How many exactly?" : "Between how many?"}
      >
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
    const {
      characters: selectedCharacters,
      currentStep,
      setValue,
      wordList,
    } = this.state

    return (
      <Step
        currentStep={currentStep}
        title={`${getLabelFromKey(
          characters.SET,
          selectedCharacters,
          true
        )} such as:`}
      >
        {selectedCharacters === "WORDS_SUCH_AS" && (
          <TextInputListForm data={wordList} onChange={this.onWordListChange} />
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
