import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"

const StyledCheckboxInput = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .5em 1em;
  width: 100%;
`

function CheckboxInput({ checked, label, onChange }) {
  const key = 'checkbot-input-'.concat(label.toLowerCase())

  return (
    <StyledCheckboxInput>
      <label htmlFor={key}>Global</label>
      <input type="checkbox" name={key} {...{ checked, onChange }} />
    </StyledCheckboxInput>
  )
}

CheckboxInput.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
}

export default CheckboxInput
