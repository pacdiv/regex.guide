import PropTypes from "prop-types"
import React, { Component, Fragment } from "react"
import styled from "@emotion/styled"

import { Button, RelativeFormContainer, Select, TextInput, TextInputListForm } from "../utils"
import { characters, quantifiers } from "../../utils/core"

const TextInputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 16em;

  input {
    border-radius: 4px;
    height: 3em;
    width: 6em;

    &:only-child {
      width: 16em;
    }
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
    exactQuantifierValue: PropTypes.string,
    characters: PropTypes.string,
    minimumQuantifierValue: PropTypes.string,
    maximumQuantifierValue: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    quantifier: PropTypes.string,
    queryString: PropTypes.string,
    setValue: PropTypes.string,
    wordList: PropTypes.arrayOf(PropTypes.string)
  }

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
    const { quantifier: currentQuantifier } = this.state

    if (prevState.quantifier === "SET" && currentQuantifier !== "SET") {
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
  }

  onExactLimitTextFieldChange = event => {
    this.setState({ exactQuantifierValue: event.target.value })
  }

  onCharactersSelectChange = event => {
    this.setState({ characters: event.target.value })
  }

  onMinimumLimitTextFieldChange = value => {
    this.setState({ minimumQuantifierValue: value })
  }

  onMaximumLimitTextFieldChange = value => {
    this.setState({ maximumQuantifierValue: value })
  }

  onQuantifierSelectChange = event => {
    const { value } = event.target

    this.setState({
      characters: "",
      quantifier: value
    })
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
    const { error } = this.state
    const charactersOptions = this.state.quantifier === "SET"
      ? characters.filter(item => item.isSetQuantifier)
      : characters.filter(item => !item.isSetQuantifier)

    return (
      <RelativeFormContainer>
        {!this.props.anchor && (
          <Select
            data={this.props.availableAnchors}
            onChange={this.onAnchorSelectChange}
            selectedOption={this.state.anchor}
          />
        )}
        <Select
          data={quantifiers}
          onChange={this.onQuantifierSelectChange}
          selectedOption={this.state.quantifier}
        />
        {(this.state.quantifier === "BETWEEN" ||
          this.state.quantifier === "EXACTLY") && (
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
        )}
        <Select
          data={charactersOptions}
          onChange={this.onCharactersSelectChange}
          selectedOption={this.state.characters}
        />
        {this.state.characters === "WORDS_SUCH_AS" && (
          <TextInputListForm onChange={this.onWordListChange} data={this.state.wordList} />
        )}
        {this.state.characters === "CHARACTERS" && (
          <TextInputGroup>
            <TextInput
              onChange={this.onSetTextFieldChange}
              placeholder="aeiou"
              queryString={this.state.setValue}
              uniqueCharacters
            />
          </TextInputGroup>
        )}
        {error && <StyledErrorParagraph>{error}</StyledErrorParagraph>}
        <Button colorTheme="submit" onClick={this.onSubmitButtonClick}>
          Submit
        </Button>
        <Button colorTheme="transparent" onClick={this.props.onCancel}>
          Cancel
        </Button>
      </RelativeFormContainer>
    )
  }
}

export default ConditionInput
