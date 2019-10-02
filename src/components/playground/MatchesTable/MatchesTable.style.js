import styled from "@emotion/styled"

export const ErrorText = styled.p`
  color: crimson;
  margin: 0.5em 0;
`

export const TableContainer = styled.div`
  margin: 1em 0 0;

  p {
    margin-bottom: 0.5em;
  }

  div.table {
    align-items: center;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    margin: 0 auto 2em;
    max-width: 16em;
    width: 100%;
  }
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 100%;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }

  > div {
    &:first-of-type {
      min-width: 3em;
    }
    &:last-of-type {
      border-left: 1px solid #f0f0f0;
      flex: 1 1 auto;
    }
  }
`
