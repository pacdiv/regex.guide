import React, { createRef, PureComponent, Fragment } from "react"
import PropTypes from 'prop-types'
import styled from "@emotion/styled"

import { Button } from "../utils"

const HiddenTextarea = styled.textarea`
  border: 0;
  height: 0;
  opacity: 0;
  width: 0;
`

class ClipboardAction extends PureComponent {
  static propTypes = {
    flags: PropTypes.string,
    value: PropTypes.string
  }

  hiddenTextareaRef = createRef()

  onClipboardButtonClick = () => {
    this.hiddenTextareaRef.current.focus()
    this.hiddenTextareaRef.current.setSelectionRange(0, 999999)
    document.execCommand('copy')
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
