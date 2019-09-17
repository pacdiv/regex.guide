import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"

const StyledMenu = styled.div`
  align-items: stretch;
  background-color: #fbfbfb;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family: system-ui;
  font-size: 0.8em;
  font-weight: 300;
  justify-content: center;
  position: absolute;
  top: 4rem;
  width: 16rem;
  z-index: 1;

  @media screen and (min-width: 600px) {
    top: 2rem;
  }

  button {
    background-color: inherit;
    border: 0;
    height: 2.5em;
    cursor: pointer;
  }
`

const ConditionSentenceMenu = props => {
  return (
    <StyledMenu>
      <button type="button" onClick={props.onEditButtonClick}>
        Edit this condition
      </button>
      {props.anchorType !== "STARTS_WITH" && (
        <button type="button" onClick={props.onAddBeforeButtonClick}>
          Add a condition before
        </button>
      )}
      {props.anchorType !== "ENDS_WITH" && (
        <button type="button" onClick={props.onAddAfterButtonClick}>
          Add a condition after
        </button>
      )}
      <button type="button" onClick={props.onDeleteButtonClick}>
        Delete this condition
      </button>
      <button onClick={props.onSwitchHiddenMenu} type="button">
        Close the menu
      </button>
    </StyledMenu>
  )
}

ConditionSentenceMenu.propTypes = {
  anchorType: PropTypes.string,
  onAddAfterButtonClick: PropTypes.func,
  onAddBeforeButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onSwitchHiddenMenu: PropTypes.func
}

export default ConditionSentenceMenu
