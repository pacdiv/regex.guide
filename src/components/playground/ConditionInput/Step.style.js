import styled from "@emotion/styled"

export const StepContainer = styled.div`
  left: 0;
  margin: 0.5rem 0 1rem;
  /* max-height: 16em; */
  min-width: 100%;
  width: 100%;
  top: 0;

  @media (min-width: 375px) {
    padding: 0 0.5em;
  }

  span {
    font-size: 0.8em;
  }

  p {
    font-size: 0.85em;
    line-height: 1.5em;
    margin-bottom: 1em;
  }

  /* TODO: Replace the following classnames by components */
  div.buttons-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    button {
      align-items: center;
      border: 1px solid #ebebeb;
      background-color: rgb(249, 249, 249);
      border-radius: 4px;
      color: hsla(0, 0%, 0%, 0.7);
      display: flex;
      flex-direction: column;
      font-size: 0.8em;
      justify-content: flex-end;
      padding: 0.25em 0.5em;
      margin: 0.25em;
      min-width: 5em;

      &.selected {
        border-color: limegreen;
      }
    }
  }
`
