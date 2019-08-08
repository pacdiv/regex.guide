// import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"

const StyledOption = styled.option`
  text-align: center;
`

const StyledSelect = styled.select`
  background-color: #ffffff;
  border: 0;
  border-radius: 4px;
  height: 3em;
  margin: 0 0 0.5em;
  padding: 0 1em;
  text-align: center;
  width: 16em;
`

function Option({ label, selected, value }) {
  return (
    <StyledOption {...{ selected, value}}>
      {label}
    </StyledOption>
  )
}

function Select({ data, onChange, selectedOption }) {
  return (
    <StyledSelect onChange={onChange}>
      {data.map(({ key: value, label }) => (
        <Option
          key={value}
          {...{ label, value, selected: selectedOption === value}}
        />
      ))}
    </StyledSelect>
  )
}

export default Select
