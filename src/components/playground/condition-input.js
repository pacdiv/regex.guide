import PropTypes from "prop-types"
import React, { Component, Fragment } from "react"
import styled from "@emotion/styled"

import { Button, RelativeFormContainer, TextInput, TextInputListForm } from "../utils"
import { characters, getLabelFromKey, quantifiers } from "../../lib/core"

const Step = styled.div`
  margin: 0.5rem 0px 1rem;

  span {
    font-size: 0.8em;
  }

  div.wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    button {
      align-items: center;
      border: 1px solid limegreen;
      background-color: rgb(249, 249, 249);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      font-size: 0.8em;
      justify-content: flex-end;
      padding: 0.25em 0.5em;
      margin: 0.25em;
    }
  }
`

const TextInputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  width: 16em;

  input:only-child {
    width: 12rem;
  }

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
    const { error, quantifier } = this.state
    const charactersOptions = characters[quantifier] || characters.DEFAULT

    return (
      <RelativeFormContainer>
        {!this.props.anchor && (
          <Step>
            <p style={{ fontSize: '.85em', marginBottom: 0 }}>Pick an anchor:</p>
            <div className="wrapper">
              {this.props.availableAnchors.map(({ key, label, prefix = "", suffix = "" }) => (
                <button style={{ border: `1px solid ${this.state.anchor === key ? "limegreen" : "#ebebeb"}` }} type="button" value={key} onClick={this.onAnchorSelectChange}>
                  {label}
                </button>
              ))}
            </div>
          </Step>
        )}
        <Step>
          <p style={{ fontSize: '.85em', marginBottom: 0 }}>Pick a quantifier:</p>
          <div className="wrapper">
            {quantifiers.map(({ key, label, placeholder = "" }) => (
              <button style={{ border: `1px solid ${this.state.quantifier === key ? "limegreen" : "#ebebeb"}` }} type="button" value={key} onClick={this.onQuantifierSelectChange}>
                {label}
              </button>
            ))}
          </div>
        </Step>
        {(this.state.quantifier === "BETWEEN" ||
          this.state.quantifier === "EXACTLY") && (
            <Step>
              <p style={{ fontSize: '.85em', marginBottom: 0 }}>
                {this.state.quantifier === "EXACTLY" ? "How many exactly?" : "Between how many?"}
              </p>
              <TextInputGroup>
                <TextInput
                  onChange={this.onMinimumLimitTextFieldChange}
                  placeholder="0"
                  queryString={this.state.minimumQuantifierValue}
                  type="number"
                />
                {this.state.quantifier === "BETWEEN" && (
                  <Fragment>
                    <span>and</span>
                    <TextInput
                      onChange={this.onMaximumLimitTextFieldChange}
                      placeholder="0"
                      queryString={this.state.maximumQuantifierValue}
                      type="number"
                    />
                  </Fragment>
                )}
              </TextInputGroup>
          </Step>
        )}
        <Step>
          <p style={{ fontSize: '.85em', marginBottom: 0 }}>
            Pick a type of {this.state.quantifier === "SET" ? "set" : "characters"}:
          </p>
          <div className="wrapper">
            {charactersOptions.map(({ key, label, value = "" }) => (
              <button style={{ border: `1px solid ${this.state.characters === key ? "limegreen" : "#ebebeb"}` }} type="button" value={key} onClick={this.onCharactersSelectChange}>
                {label}
              </button>
            ))}
          </div>
        </Step>
        {this.state.quantifier === "SET" && (
          <Step>
            <p style={{ fontSize: '.85em', marginBottom: 0 }}>
              {getLabelFromKey(characters.SET, this.state.characters, true)}
              {" "}such as:
            </p>
            {this.state.characters === "WORDS_SUCH_AS" && (
              <TextInputListForm onChange={this.onWordListChange} data={this.state.wordList} />
            )}
            {this.state.characters === "CHARACTERS" && (
              <TextInputGroup>
                <TextInput
                  onChange={this.onSetTextFieldChange}
                  placeholder="xyz"
                  queryString={this.state.setValue}
                  uniqueCharacters
                />
              </TextInputGroup>
            )}
          </Step>
        )}
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
}

export default ConditionInput
