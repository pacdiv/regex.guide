import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

import ConditionSentence from "./ConditionSentence"

test('ConditionSentence component with unspecified quantity', async () => {
  const { queryByText } = render(
    <ConditionSentence
      condition={{
        regex: "\w+",
        specs: {
          anchor: "CONTAINS",
          capturedExpression: "NO",
          characters: "ALPHANUMERIC_CHARACTERS",
          quantifier: "ONE_OR_MORE"
        }
      }}
      index={0}
      position="body"
    />
  )

  expect(queryByText("contain one or many alphanumeric characters,")).toBeTruthy()
})

test('ConditionSentence component with specific quantity', async () => {
  const { queryByText } = render(
    <ConditionSentence
      condition={{
        regex: "\w{2,}",
        specs: {
          anchor: "CONTAINS",
          capturedExpression: "NO",
          characters: "ALPHANUMERIC_CHARACTERS",
          minimumQuantifierValue: "2",
          quantifier: "AT_LEAST"
        }
      }}
      index={0}
      position="body"
    />
  )

  expect(queryByText("contain at least 2 alphanumeric characters,")).toBeTruthy()
})

test('ConditionSentence component with 2 specific limit quantities', async () => {
  const { queryByText } = render(
    <ConditionSentence
      condition={{
        regex: "\w{0,3}",
        specs: {
          anchor: "CONTAINS",
          capturedExpression: "NO",
          characters: "ALPHANUMERIC_CHARACTERS",
          maximumQuantifierValue: 3,
          minimumQuantifierValue: 0,
          quantifier: "BETWEEN"
        }
      }}
      index={0}
      position="body"
    />
  )

  expect(queryByText("contain between 0 and 3 alphanumeric characters,")).toBeTruthy()
})

test('ConditionSentence component with a set of words', async () => {
  const { queryByText } = render(
    <ConditionSentence
      condition={{
        regex: "foo|bar",
        specs: {
          anchor: "CONTAINS",
          capturedExpression: "NO",
          characters: "WORDS_SUCH_AS",
          quantifier: "SET",
          wordList: [
            { id: "df3a3462-dade-4562-8b93-986dd64c2212", value: "foo" },
            { id: "c72d742e-b44d-4f45-81ba-c854cecf1c35", value: "bar" },
          ]
        }
      }}
      index={0}
      position="body"
    />
  )

  expect(queryByText("contain words like \"foo\" or \"bar\",")).toBeTruthy()
})

test('ConditionSentence component with a set of characters', async () => {
  const { queryByText } = render(
    <ConditionSentence
      condition={{
        regex: "[abcA-F]",
        specs: {
          anchor: "CONTAINS",
          capturedExpression: "NO",
          characters: "CHARACTERS",
          quantifier: "SET",
          setValue: "abcA-F"
        }
      }}
      index={0}
      position="body"
    />
  )

  expect(queryByText("contain characters like \"a\", \"b\", \"c\" or from \"A\" to \"F\",")).toBeTruthy()
})

test('ConditionSentence component with a back reference', async () => {
  const { queryByText } = render(
    <ConditionSentence
      condition={{
        regex: "\\1+",
        specs: {
          anchor: "CONTAINS",
          backReference: "\\1",
          capturedExpression: "NO",
          characters: "BACK_REFERENCES",
          quantifier: "ONE_OR_MORE"
        }
      }}
      index={1}
      position="body"
    />
  )

  expect(queryByText("contain one or many time(s) the #1 captured reference,")).toBeTruthy()
})
