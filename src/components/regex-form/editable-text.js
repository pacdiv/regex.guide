import PropTypes from "prop-types"
import React, { Component, createRef } from "react"
import styled from "@emotion/styled"

import { Button } from "../utils"

const StyledConditionSentence = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`

const MenuButton = styled(Button)`
  height: 0.8em;
  line-height: 1px;
  margin: 0 0 0 0.3em;
  width: auto;
`

class ConditionSentence extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    sentence: PropTypes.string
  }

  containerRef = createRef()

  onButtonClick = () => this.props.onClick(this.containerRef)

  render() {
    return (
      <StyledConditionSentence ref={this.containerRef}>
        {this.props.sentence}
        <MenuButton onClick={this.onButtonClick} type="button">
          →
        </MenuButton>
      </StyledConditionSentence>
    )
  }
}

export default ConditionSentence
