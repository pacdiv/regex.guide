import React from "react"
import { fireEvent, render, waitForElement } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Playground from "./Playground"

test("Playground component (conditions and menu)", async () => {
  const {
    container,
    getByLabelText,
    getByPlaceholderText,
    getByText,
    queryByText,
  } = render(<Playground />)

  fireEvent.change(getByPlaceholderText("👉 type your text here 👈"), {
    target: {
      value:
        "Microsoft named .Net so you won’t see it in a Unix directory listing.",
    },
  })

  fireEvent.click(getByText("Add a first condition"))
  await waitForElement(() => getByText("Which characters would you match?"), {
    container,
  })
  fireEvent.click(getByText("words like"))
  fireEvent.change(getByLabelText("wordlist-set-0"), {
    target: { value: "Microsoft" },
  })
  fireEvent.click(getByText("Add to the list"))
  await waitForElement(() => getByLabelText("wordlist-set-1"), { container })
  fireEvent.change(getByLabelText("wordlist-set-1"), {
    target: { value: "Unix" },
  })
  fireEvent.click(getByText("Add to the list"))
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("zero or many"))
  fireEvent.click(getByText("yes, regex must start with it"))
  fireEvent.click(getByText("Submit"))

  expect(
    await waitForElement(() =>
      queryByText('start with zero or many words such as "Microsoft" or "Unix"')
    )
  ).toBeTruthy()
  expect(queryByText("Copy to clipboard")).toBeTruthy()

  fireEvent.click(getByLabelText("editable-chunk-0-editable-text-button"))
  fireEvent.click(
    await waitForElement(() => getByText("Add a condition after"), {
      container,
    })
  )
  fireEvent.click(
    await waitForElement(() => getByText("characters like"), { container })
  )
  fireEvent.change(getByLabelText("characters-set"), { target: { value: "." } })
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("one or many"))
  fireEvent.click(getByText("yes, regex must end with it"))
  fireEvent.click(getByText("Submit"))

  expect(
    await waitForElement(() =>
      queryByText(
        'start with zero or many words such as "Microsoft" or "Unix" and'
      )
    )
  ).toBeTruthy()
  expect(
    await waitForElement(() =>
      queryByText('end with one or many characters such as "."')
    )
  ).toBeTruthy()
})

test("Playground component (condition menu)", async () => {
  const { container, getByLabelText, getByText, queryByText } = render(
    <Playground />
  )

  fireEvent.click(getByText("Add a first condition"))
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("Submit"))

  expect(
    await waitForElement(() =>
      queryByText("contain one or many alphanumeric characters")
    )
  ).toBeTruthy()

  fireEvent.click(getByLabelText("editable-chunk-0-editable-text-button"))
  fireEvent.click(
    await waitForElement(() => getByText("Close the menu"), { container })
  )
  expect(
    await waitForElement(() =>
      queryByText("contain one or many alphanumeric characters")
    )
  ).toBeTruthy()

  fireEvent.click(getByLabelText("editable-chunk-0-editable-text-button"))
  fireEvent.click(
    await waitForElement(() => getByText("Edit this condition"), { container })
  )
  fireEvent.click(
    await waitForElement(() => getByText("Cancel"), { container })
  )
  expect(
    await waitForElement(() =>
      queryByText("contain one or many alphanumeric characters")
    )
  ).toBeTruthy()

  fireEvent.click(getByLabelText("editable-chunk-0-editable-text-button"))
  fireEvent.click(
    await waitForElement(() => getByText("Add a condition before"), {
      container,
    })
  )
  fireEvent.click(
    await waitForElement(() => getByText("Cancel"), { container })
  )
  expect(
    await waitForElement(() =>
      queryByText("contain one or many alphanumeric characters")
    )
  ).toBeTruthy()

  fireEvent.click(getByLabelText("editable-chunk-0-editable-text-button"))
  fireEvent.click(
    await waitForElement(() => getByText("Add a condition after"), {
      container,
    })
  )
  fireEvent.click(
    await waitForElement(() => getByText("Cancel"), { container })
  )
  expect(
    await waitForElement(() =>
      queryByText("contain one or many alphanumeric characters")
    )
  ).toBeTruthy()

  fireEvent.click(getByLabelText("editable-chunk-0-editable-text-button"))
  fireEvent.click(
    await waitForElement(() => getByText("Delete this condition"), {
      container,
    })
  )
  expect(
    await waitForElement(() => queryByText("Add a first condition"))
  ).toBeTruthy()
  expect(queryByText("contain one or many alphanumeric characters")).toBeFalsy()
})

test("Playground component (flags)", async () => {
  const { getByLabelText, getByText, queryByText } = render(<Playground />)

  expect(queryByText("a regex")).toBeTruthy()

  fireEvent.click(getByLabelText("flags-editable-text-button"))
  fireEvent.click(await waitForElement(() => getByText("Global")))
  fireEvent.click(getByText("Submit"))

  expect(await waitForElement(() => queryByText("a global regex"))).toBeTruthy()
})
