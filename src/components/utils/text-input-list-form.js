import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import uuid from 'uuid/v4'

import Button from './button'
import TextInput from './text-input'

const StyledTextInputListForm = styled.div`
  display: flex;
  flex-direction: column;

  input,
  button {
    height: 3em;
    margin-bottom: .5em;
  }

  input {
    width: 100%;
  }
`

const InputContainer = styled.div`
  position: relative;

  > button {
    background-color: crimson;
    border: 0;
    border-radius: .5em;
    cursor: pointer;
    height: 1em;
    position: absolute;
    right: -.5em;
    top: -.25em;
    width: 1em;

    &:before,
    &:after {
      background-color: white;
      content: ' ';
      height: 0.6em;
      left: 0.5em;
      position: absolute;
      top: 0.2em;
      width: 2px;
    }

    &:before {
      transform: rotate(45deg);
    }
    
    &:after {
      transform: rotate(-45deg);
    }
  }
`

function TextInputListForm({ data, onChange }) {
  const [list, setList] = useState(
    data.concat({
      id: uuid(),
      value: ""
    })
  )

  function addItem() {
    const nextList = list.concat({
      id: uuid(),
      value: ""
    })

    setList(nextList)
    onChange(nextList.filter(({ value }) => value.trim()))
  }

  function editItem(nextValue, targetId) {
    const nextList = list.map(item =>
      item.id === targetId
        ? { ...item, value: nextValue }
        : item
    )

    setList(nextList)
    onChange(nextList.filter(({ value }) => value.trim()))
  }

  function removeItem(targetId) {
    const nextList = list.filter(({ id }) => id !== targetId)

    setList(nextList)
    onChange(nextList.filter(({ value }) => value.trim()))
  }

  return (
    <StyledTextInputListForm>
      {list.map(({ id, value }, index) => (
        <InputContainer key={`text-input-container-${id}`}>
          <TextInput
            onChange={nextValue => editItem(nextValue, id)}
            placeholder="foobar"
            queryString={value}
          />
          {index < list.length - 1 && (
            <button onClick={() => removeItem(id)} type="button" />
          )}
        </InputContainer>
      ))}
      <Button colorTheme="light" onClick={addItem}>
        Add to the list
      </Button>
    </StyledTextInputListForm>
  )
}

TextInputListForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

TextInputListForm.defaultProps = {
  data: [],
  onChange: () => undefined
}

export default TextInputListForm
