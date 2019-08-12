import PropTypes from "prop-types"
import React, { Component } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

const StyledTextInupt = styled.input`
  text-align: center;

  ${({ hasNotFocus }) =>
    hasNotFocus && css`
      border-color: transparent;
      font-style: italic;
    `
  }
`

class TextInput extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    queryString: PropTypes.string,
    uniqueCharacters: PropTypes.bool
  }

  static preChoices = []

  state = {
    hasFocus: this.props.autoFocus,
    queryString: this.props.queryString || ''
  }

  onBlur = () => this.setState({ hasFocus: false })

  onChange = event => {
    const { value } = event.target

    const nextValue = this.props.uniqueCharacters
      ? value
        .split("")
        .reduce((acc, letter) =>
          acc.includes(letter)
            ? acc
            : acc.concat(letter)
        , "")
      : value

    this.setState(
      { queryString: nextValue },
      () => this.props.onChange(nextValue)
    )
  }

  onFocus = () => this.setState({ hasFocus: true })

  render() {
    const { hasFocus, queryString } = this.state
    const value = !this.props.type && !hasFocus && queryString ? `“${queryString}”` : queryString

    return (
      <StyledTextInupt
        autoFocus={this.props.autoFocus}
        hasNotFocus={!this.state.hasFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onFocus={this.onFocus}
        placeholder={this.props.placeholder}
        type={this.props.type || 'text'}
        value={value}
        {...this.props.uniqueCharacters && { onKeyDown: this.onKeyDown }}
      />
    )
  }
}

export default TextInput
