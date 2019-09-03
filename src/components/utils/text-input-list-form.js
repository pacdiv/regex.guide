import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "@emotion/styled"
import uuid from 'uuid/v4'

import Button from './button'
import TextInput from './text-input'

const StyledTextInputListForm = styled.div`
  display: flex;
  flex-direction: column;

  input,
  button {
    margin-bottom: .5em;
  }

  button {
    font-size: .8em;
    height: 2.5rem;
    width: 12rem;
  }

  input {
    width: 12rem;
  }
`

const InputContainer = styled.div`
  position: relative;

  > button {
    background-color: crimson;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    height: 16px;
    font-size: 1rem;
    position: absolute;
    right: -8px;
    top: -8px;
    width: 16px;

    &:before,
    &:after {
      background-color: white;
      content: ' ';
      height: 0.6em;
      left: auto;
      position: absolute;
      right: auto;
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
      <Button onClick={addItem}>
        Add to the list
      </Button>
    </StyledTextInputListForm>
  )
}

TextInputListForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string
    })
  ),
  onChange: PropTypes.func
}

TextInputListForm.defaultProps = {
  data: [],
  onChange: () => undefined
}

export default TextInputListForm
