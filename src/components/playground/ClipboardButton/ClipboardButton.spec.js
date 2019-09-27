import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

import ClipboardButton from "./ClipboardButton"

test('ClipboardButton component', async () => {
  const { container, getByText } = render(
    <ClipboardButton flags="g" value="foo|bar" />
  )

  expect(container).toMatchSnapshot()
  fireEvent.click(getByText("Copy to clipboard"))
})
