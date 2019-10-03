import addAtLeast from "./add-at-least"

describe("Add-at-least condition", () => {
  it("simulates success", async () => {
    const specs = {
      anchor: "CONTAINS",
      minimumQuantifierValue: 2,
      quantifier: "AT_LEAST",
    }

    expect(json(await addAtLeast(specs))).toEqual(
      json({ regex: "{2,}", specs })
    )
  })

  it("simulates negative value", async () => {
    try {
      await addAtLeast({ minimumQuantifierValue: -1 })
    } catch (e) {
      expect(e.message).toEqual(
        "A quantity equal or bigger than 0 must be set."
      )
    }
  })
})
