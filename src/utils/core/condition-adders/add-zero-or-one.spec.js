import addZeroOrOne from "./add-zero-or-one"

describe("Add-zero-or-one condition", () => {
  it("simulates success", async () => {
    const specs = {
      anchor: "CONTAINS",
      quantifier: "NONE_OR_ONE",
    }

    expect(json(await addZeroOrOne(specs))).toEqual(json({ regex: "?", specs }))
  })
})
