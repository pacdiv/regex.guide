import styled from "@emotion/styled"
import { css } from "@emotion/core"

export default styled.button`
  background-color: #555555;
  border: 0px;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  height: 3em;
  margin: auto;
  width: 16em;

  ${({ colorTheme }) =>
    colorTheme === 'submit' && css`background-color: limegreen;` ||
    colorTheme === 'transparent' && css`background-color: inherit; color: initial;`
  }
  
  ${({ size }) =>
    size === 'medium' && css`width: 13em;`
  }
`
