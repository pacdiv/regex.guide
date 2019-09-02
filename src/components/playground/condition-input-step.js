import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"

const StyledStep = styled.div`
  margin: 0.5rem 0px 1rem;

  span {
    font-size: 0.8em;
  }

  p {
    font-size: '.85em';
    margin-bottom: 0;
  }

  div.buttons-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    button {
      align-items: center;
      border: 1px solid #ebebeb;
      background-color: rgb(249, 249, 249);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      font-size: 0.8em;
      justify-content: flex-end;
      padding: 0.25em 0.5em;
      margin: 0.25em;

      &.selected {
        border-color: limegreen;
      }
    }
  }
`

function ConditionInputStep({ children, title }) {
  return (
    <StyledStep>
      <p>{title}</p>
      {children}
    </StyledStep>
  )
}

ConditionInputStep.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default ConditionInputStep
