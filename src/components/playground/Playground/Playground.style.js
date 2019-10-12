import styled from "@emotion/styled"

export const PlaygroundContainer = styled.div`
  color: hsla(0, 0%, 0%, 0.7);
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-size: 1.3em;
  line-height: 1.7em;
  margin: auto;
  max-width: 16em;
  padding: 4em 0;
  text-align: center;

  div.intro {
    margin: 0 auto;
    max-width: 14em;
  }

  @media (min-width: 375px) {
    max-width: 18em;
  }

  @media (min-width: 480px) {
    font-size: 1.4em;
    max-width: none;
  }
`
