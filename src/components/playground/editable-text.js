import PropTypes from "prop-types"
import React, { Component, createRef } from "react"
import styled from "@emotion/styled"

import { Button } from "../utils"
import editIcon from "../../images/icon-edit.png"

const StyledConditionSentence = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0.75em 0 0;
  position: relative;

  &:last-of-type {
    margin-bottom: 0.75em;
  }

  &:only-child {
    margin: 0;
  }
`

const MenuButton = styled(Button)`
  background-color: #ffffff;
  height: 1em;
  line-height: 1px;
  margin: 0;
  width: 1em;

  img {
    margin: 0;
    max-width: 1em;
  }
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
          <img alt="menu" src={editIcon} />
        </MenuButton>
      </StyledConditionSentence>
    )
  }
}

export default ConditionSentence
