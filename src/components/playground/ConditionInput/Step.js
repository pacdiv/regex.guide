import React from "react"
import PropTypes from "prop-types"

import { StepContainer } from "./Step.style"

function ConditionInputStep({ children, currentStep, title }) {
  return (
    <StepContainer>
      <p>
        <i>Step {currentStep}</i>
        <br />
        {title}
      </p>
      {children}
    </StepContainer>
  )
}

ConditionInputStep.propTypes = {
  children: PropTypes.node,
  currentStep: PropTypes.number,
  title: PropTypes.string,
}

export default ConditionInputStep
