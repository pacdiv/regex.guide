import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const ChunkContainer = styled.span`
  ${({ isBeingEdited }) =>
    isBeingEdited && css`
      background-color: lightgrey;
    `
  }
`
