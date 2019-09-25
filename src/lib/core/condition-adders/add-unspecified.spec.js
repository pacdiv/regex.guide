import addUnspecified from "./add-unspecified"

describe("Add-unspecified condition", () => {
  it("simulates one-or-more success", async () => {
    const specs = {
      anchor: "CONTAINS",
      quantifier: "ONE_OR_MORE"
    }

    expect(json(await addUnspecified(specs)))
      .toEqual(json({ regex: "+", specs }))
  })

  it("simulates zero-or-more success", async () => {
    const specs = {
      anchor: "CONTAINS",
      quantifier: "ZERO_OR_MORE"
    }

    expect(json(await addUnspecified(specs)))
      .toEqual(json({ regex: "*", specs }))
  })
})
