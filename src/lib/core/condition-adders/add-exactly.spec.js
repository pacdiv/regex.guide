import addExactly from "./add-exactly"

describe("Add-exactly condition", () => {
  it("simulates success", async () => {
    const specs = {
      anchor: "CONTAINS",
      minimumQuantifierValue: 2,
      quantifier: "EXACTLY"
    }

    expect(json(await addExactly(specs)))
      .toEqual(json({ regex: "{2}", specs }))
  })

  it("simulates value not bigger than 0", async () => {
    try {
      await addExactly({ minimumQuantifierValue: 0 })
    } catch (e) {
      expect(e.message).toEqual("A quantity bigger than 0 must be set.")
    }
  })
})
