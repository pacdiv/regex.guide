import styled from "@emotion/styled"
import { css } from "@emotion/core"

const Button = styled.button`
  background-color: #555555;
  border: 0px;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  height: 3em;
  margin: auto;
  width: 16em;

  &.submit-theme {
    background-color: limegreen;
  }

  &.transparent-theme {
    background-color: transparent;
    color: initial;
    text-decoration: underline;
  }
  
  ${({ size }) =>
    size === 'medium' && css`width: 13em;`
  }
`

export default Button
