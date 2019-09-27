import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { Button } from "../../utils"

export const ActionButton = styled(Button)`
  font-size: .9em;
  height: 2rem;
  width: 8rem;
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const StepsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  min-height: 11em;
  overflow-x: hidden;
  width: 100%;

  > div:first-of-type {
    transition: margin-left 250ms ease-in-out;
  }

  ${({ step }) =>
    step > 1 &&
    css`
      > div:first-of-type {
        margin-left: ${-100 * (step - 1)}%;
      }
  `}
`

export const TextInputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  max-width: 100%;

  span {
    width: 4em;
  }

  input,
  span {
    margin-bottom: 0.5em;
  }
`

export const ErrorParagraph = styled.p`
  color: crimson;
  margin: 0 2em 1em;
`
