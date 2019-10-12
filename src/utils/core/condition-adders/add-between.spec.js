import addBetween from "./add-between"

describe("Add-between condition", () => {
  it("simulates success", async () => {
    const specs = {
      anchor: "CONTAINS",
      minimumQuantifierValue: 0,
      maximumQuantifierValue: 3,
      quantifier: "BETWEEN",
    }

    expect(json(await addBetween(specs))).toEqual(
      json({ regex: "{0,3}", specs })
    )
  })

  it("simulates unset minimum or maximum", async () => {
    try {
      await addBetween({ maximumQuantifierValue: 3 })
    } catch (e) {
      expect(e.message).toEqual("Minimum and maximum values must be defined.")
    }

    try {
      await addBetween({ minimumQuantifierValue: 3 })
    } catch (e) {
      expect(e.message).toEqual("Minimum and maximum values must be defined.")
    }
  })

  it("simulates maximum not bigger than minimum", async () => {
    try {
      await addBetween({
        minimumQuantifierValue: 3,
        maximumQuantifierValue: 3,
      })
    } catch (e) {
      expect(e.message).toEqual("Minimum must be lower than maximum.")
    }
  })

  it("simulates negative values", async () => {
    try {
      await addBetween({
        minimumQuantifierValue: -3,
        maximumQuantifierValue: -1,
      })
    } catch (e) {
      expect(e.message).toEqual(
        "Minimum and maximum must be positive integers."
      )
    }
  })
})
