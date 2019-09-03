import PropTypes from "prop-types"
import React, { PureComponent } from "react"
import styled from "@emotion/styled"

import { Button, CheckboxInput, RelativeFormContainer } from "../utils"

const SubmitButton = styled(Button)`
  height: 2em;
  width: 12em;
`

class RegexFlagsForm extends PureComponent {
  static propTypes = {
    flags: PropTypes.shape({
      global: PropTypes.bool,
    }),
    onFlagChange: PropTypes.func,
    onSubmitClick: PropTypes.func,
  }

  onGlobalChange = () => {
    this.props.onFlagChange("global", !this.props.flags.global)
  }

  render() {
    return (
      <RelativeFormContainer>
        <CheckboxInput
          checked={this.props.flags.global}
          label="Global"
          onChange={this.onGlobalChange}
        />
        <SubmitButton onClick={this.props.onSubmitClick}>
          Submit
        </SubmitButton>
      </RelativeFormContainer>
    )
  }
}

export default RegexFlagsForm
