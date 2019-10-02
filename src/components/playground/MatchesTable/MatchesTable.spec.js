import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import MatchesTable from "./MatchesTable"

test("MatchesTable component with results", async () => {
  const { container } = render(
    <MatchesTable
      flags={{ global: true }}
      regexChunks={["\\d+"]}
      sourceString="If you don’t succeed at first, call it v1.0 🤫"
    />
  )

  expect(container).toMatchSnapshot()
})

test("MatchesTable component without results", async () => {
  const { container } = render(
    <MatchesTable
      flags={{ global: true }}
      regexChunks={["\\d+"]}
      sourceString="… I'm kidding!"
    />
  )

  expect(container).toMatchSnapshot()
})
