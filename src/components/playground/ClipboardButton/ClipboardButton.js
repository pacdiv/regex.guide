import React, { createRef, PureComponent, Fragment } from "react"
import PropTypes from "prop-types"

import { Button } from "../../utils"
import { HiddenTextarea } from "./ClipboardButton.style"

class ClipboardAction extends PureComponent {
  static propTypes = {
    flags: PropTypes.string,
    value: PropTypes.string,
  }

  hiddenTextareaRef = createRef()

  onClipboardButtonClick = () => {
    this.hiddenTextareaRef.current.focus()
    this.hiddenTextareaRef.current.setSelectionRange(0, 999999)
    document.execCommand("copy")
    this.hiddenTextareaRef.current.blur()
  }

  render() {
    const { flags, value } = this.props

    return (
      <Fragment>
        <Button onClick={this.onClipboardButtonClick} size="medium">
          Copy to clipboard
        </Button>
        <HiddenTextarea
          readOnly
          ref={this.hiddenTextareaRef}
          value={`/${value}/${flags}`}
        />
      </Fragment>
    )
  }
}

export default ClipboardAction
