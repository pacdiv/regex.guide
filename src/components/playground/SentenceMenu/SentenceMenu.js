import PropTypes from "prop-types"
import React from "react"

import { MenuContainer } from "./SentenceMenu.style"

const SentenceMenu = props => {
  return (
    <MenuContainer>
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
    </MenuContainer>
  )
}

SentenceMenu.propTypes = {
  anchorType: PropTypes.string,
  onAddAfterButtonClick: PropTypes.func,
  onAddBeforeButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  onSwitchHiddenMenu: PropTypes.func
}

export default SentenceMenu
