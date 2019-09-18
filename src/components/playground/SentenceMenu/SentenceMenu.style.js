import styled from "@emotion/styled"

export const MenuContainer = styled.div`
  align-items: stretch;
  background-color: #fbfbfb;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family: system-ui;
  font-size: 0.8em;
  font-weight: 300;
  justify-content: center;
  position: absolute;
  top: 4rem;
  width: 16rem;
  z-index: 1;

  @media screen and (min-width: 600px) {
    top: 2rem;
  }

  button {
    background-color: inherit;
    border: 0;
    height: 2.5em;
    cursor: pointer;
  }
`
