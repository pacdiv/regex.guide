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
    queryString: PropTypes.string
  }

  static preChoices = []

  state = {
    hasFocus: this.props.autoFocus,
    queryString: this.props.queryString || ''
  }

  onBlur = () => this.setState({ hasFocus: false })

  onChange = event => {
    const { value } = event.target

    this.setState(
      { queryString: value },
      () => this.props.onChange(value)
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
      />
    )
  }
}

export default TextInput
