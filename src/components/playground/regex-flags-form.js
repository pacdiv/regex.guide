import PropTypes from "prop-types"
import React, { PureComponent } from "react"

import { Button, CheckboxInput, RelativeFormContainer } from "../utils"

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
        <Button className="submit-theme" onClick={this.props.onSubmitClick} size="medium">
          Submit
        </Button>
      </RelativeFormContainer>
    )
  }
}

export default RegexFlagsForm
