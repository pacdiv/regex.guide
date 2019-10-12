import styled from "@emotion/styled"

const RelativeFormContainer = styled.div`
  align-items: center;
  background-color: rgb(240, 240, 240);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5em auto;
  padding: 0.5em 0;
  width: 100%;

  @media (min-width: 480px) {
    max-width: 20em;
    width: auto;
  }
`

export default RelativeFormContainer
