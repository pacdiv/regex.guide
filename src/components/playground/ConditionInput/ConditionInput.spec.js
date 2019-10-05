import React from "react"
import { fireEvent, render, wait, waitForElement } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import ConditionInput from "./ConditionInput"

const availableAnchors = [
  { key: "CONTAINS", label: "contain" },
  { key: "ENDS_WITH", label: "end with", suffix: "$" },
  { key: "STARTS_WITH", label: "start with", prefix: "^" },
]

const availableDefaultCharacters = [
  {
    key: "ALPHANUMERIC_CHARACTERS",
    label: "alphanumeric characters",
    value: "\\w",
  },
  { key: "BACK_REFERENCES", label: "back references" },
  { key: "UPPER_LETTERS", label: "capital letters", value: "[A-Z]" },
  { key: "NUMBERS", label: "numbers", value: "\\d" },
  { key: "ANYTHING", label: "random characters", value: "." },
  { key: "LOWER_LETTERS", label: "small letters", value: "[a-z]" },
]

test("ConditionInput component by setting unspecified quantity", () => {
  const onSubmit = jest.fn(() => Promise.resolve())
  const { getByText } = render(
    <ConditionInput
      availableAnchors={availableAnchors}
      availableDefaultCharacters={availableDefaultCharacters}
      onSubmit={onSubmit}
    />
  )

  fireEvent.click(getByText("contain"))
  fireEvent.click(getByText("zero or many"))
  fireEvent.click(getByText("random characters"))
  fireEvent.click(getByText("no"))

  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test("ConditionInput component by setting an exact quantity", async () => {
  const onSubmit = jest.fn(() => Promise.resolve())
  const { getByLabelText, getByText } = render(
    <ConditionInput
      availableAnchors={availableAnchors}
      availableDefaultCharacters={availableDefaultCharacters}
      onSubmit={onSubmit}
    />
  )

  fireEvent.click(getByText("contain"))
  fireEvent.click(getByText("exactly"))
  fireEvent.change(getByLabelText("minimum"), { target: { value: "3" } })
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("small letters"))
  fireEvent.click(getByText("no"))

  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test("ConditionInput component by setting a quantity interval", async () => {
  const onSubmit = jest.fn(() => Promise.resolve())
  const { getByLabelText, getByText } = render(
    <ConditionInput
      availableAnchors={availableAnchors}
      availableDefaultCharacters={availableDefaultCharacters}
      onSubmit={onSubmit}
    />
  )

  fireEvent.click(getByText("contain"))
  fireEvent.click(getByText("between"))
  fireEvent.change(getByLabelText("minimum"), { target: { value: "1" } })
  fireEvent.change(getByLabelText("maximum"), { target: { value: "4" } })
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("capital letters"))
  fireEvent.click(getByText("no"))

  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test("ConditionInput component by setting a set of characters", async () => {
  const onSubmit = jest.fn(() => Promise.resolve())
  const { getByLabelText, getByText } = render(
    <ConditionInput
      availableAnchors={availableAnchors}
      availableDefaultCharacters={availableDefaultCharacters}
      onSubmit={onSubmit}
    />
  )

  fireEvent.click(getByText("contain"))
  fireEvent.click(getByText("a set of"))
  fireEvent.click(getByText("characters such as"))
  fireEvent.change(getByLabelText("characters-set"), {
    target: { value: "A-F#;0-9a-z" },
  })
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("no"))

  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test("ConditionInput component by setting a back reference", async () => {
  const onSubmit = jest.fn(() => Promise.resolve())
  const availableBackReferences = [
    {
      index: 0,
      key: "\\1",
      label: "([a-z]+)",
      regex: "\\1",
    },
  ]
  const { getByText } = render(
    <ConditionInput
      availableAnchors={availableAnchors}
      availableBackReferences={availableBackReferences}
      availableDefaultCharacters={availableDefaultCharacters}
      onSubmit={onSubmit}
    />
  )

  fireEvent.click(getByText("contain"))
  fireEvent.click(getByText("one or many"))
  fireEvent.click(getByText("back references"))
  fireEvent.click(getByText("([a-z]+)"))
  fireEvent.click(getByText("no"))

  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test("ConditionInput component by setting a set of words", async () => {
  const onSubmit = jest.fn(() => Promise.resolve())
  const { container, getByLabelText, getByText } = render(
    <ConditionInput
      availableAnchors={availableAnchors}
      availableDefaultCharacters={availableDefaultCharacters}
      onSubmit={onSubmit}
    />
  )

  fireEvent.click(getByText("contain"))
  fireEvent.click(getByText("a set of"))
  fireEvent.click(getByText("words such as"))
  fireEvent.change(getByLabelText("wordlist-set-0"), {
    target: { value: "foo" },
  })
  fireEvent.click(getByText("Add to the list"))
  await waitForElement(() => getByLabelText("wordlist-set-1"), { container })
  fireEvent.change(getByLabelText("wordlist-set-1"), {
    target: { value: "bar" },
  })
  fireEvent.click(getByText("Add to the list"))
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("no"))

  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test("ConditionInput component cancel action", async () => {
  const onCancel = jest.fn()
  const { getByText, queryByText } = render(
    <ConditionInput
      anchor="CONTAINS"
      availableAnchors={availableAnchors}
      availableDefaultCharacters={availableDefaultCharacters}
      onCancel={onCancel}
    />
  )

  fireEvent.click(getByText("Next →"))
  expect(queryByText("Cancel")).toBeFalsy()

  fireEvent.click(getByText("← Back"))
  expect(queryByText("Cancel")).toBeTruthy()

  fireEvent.click(getByText("Cancel"))
  expect(onCancel).toHaveBeenCalledTimes(1)
})

test("ConditionInput component error handling", async () => {
  const error = new Error("It’s not a bug. It’s an undocumented feature!")
  const onSubmit = jest.fn(() => Promise.reject(error))
  const { getByText } = render(
    <ConditionInput
      availableAnchors={availableAnchors}
      availableDefaultCharacters={availableDefaultCharacters}
      onSubmit={onSubmit}
    />
  )

  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("Next →"))
  fireEvent.click(getByText("Submit"))

  const errorParagraph = await waitForElement(() => getByText(error.message))
  expect(errorParagraph).toBeTruthy()
})
