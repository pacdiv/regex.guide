import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

const StyledStep = styled.div`
  left: 0;
  margin: 0.5rem 0 1rem;
  min-width: 100%;
  width: 100%;
  top: 0;

  span {
    font-size: 0.8em;
  }

  p {
    font-size: .85em;
    line-height: 1.5em;
    margin-bottom: 1em;
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

function ConditionInputStep({ children, currentStep, title }) {
  return (
    <StyledStep>
      <p>
        <i>Step {currentStep}</i>
        <br />
        {title}
      </p>
      {children}
    </StyledStep>
  )
}

ConditionInputStep.propTypes = {
  children: PropTypes.node,
  currentStep: PropTypes.number,
  title: PropTypes.string,
}

export default ConditionInputStep
