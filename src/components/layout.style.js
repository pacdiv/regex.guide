import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const HomeTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5em;

  a {
    box-shadow: none;
    color: hsla(0, 0%, 0%, 0.8);
    text-decoration: underline;
  }
`

export const LayoutContainer = styled.div`
  color: hsla(0, 0%, 0%, 0.8);
  width: 100%;

  ${({ centered }) =>
    centered &&
    css`
      align-items: stretch;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100%;
    `};

  main {
    margin: auto;
    max-width: 960px;
    width: 100%;
  }

  footer {
    font-size: 0.8em;
    text-align: center;
  }
`

export const MoreInfo = styled.div`
  margin: 0 auto 2em;
`
