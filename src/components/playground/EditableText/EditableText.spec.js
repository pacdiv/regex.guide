import React from "react"
import { fireEvent, render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import EditableText from "./EditableText"

test("EditableText component", async () => {
  const onClick = jest.fn()
  const { container, getByAltText } = render(
    <EditableText
      label="demo"
      onClick={onClick}
      sentence="Is this a placeholder?"
    />
  )

  expect(container).toMatchSnapshot()
  fireEvent.click(getByAltText("menu").closest("button"))
  expect(onClick).toHaveBeenCalledTimes(1)
})
