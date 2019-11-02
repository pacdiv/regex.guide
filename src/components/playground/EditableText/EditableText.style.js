import styled from "@emotion/styled"

import { Button } from "../../utils"

export const EditableTextContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0.25em 0;
  position: relative;

  &:only-child {
    margin: 0;
  }
`

export const MenuButton = styled(Button)`
  background-color: #ffffff;
  height: 1em;
  line-height: 1px;
  margin: 0;
  width: 1em;

  img {
    margin: 0;
    max-width: 1em;
  }
`
