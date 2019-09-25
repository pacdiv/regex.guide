import addSet from "./add-set"

describe("Add-set condition", () => {
  it("simulates success with characters", async () => {
    const specs = {
      anchor: "CONTAINS",
      characters: "CHARACTERS",
      quantifier: "SET",
      setValue: "0-9A-Z"
    }

    expect(json(await addSet(specs)))
      .toEqual(json({ regex: "[0-9A-Z]", specs: { ...specs, characters: undefined } }))
  })

  it("simulates without characters", async () => {
    try {
      const specs = {
        anchor: "CONTAINS",
        characters: "CHARACTERS",
        quantifier: "SET",
        setValue: " "
      }
      await addSet(specs)
    } catch (e) {
      expect(e.message).toEqual("Characters must be defined.")
    }
  })

  it("simulates success with words", async () => {
    const specs = {
      anchor: "CONTAINS",
      characters: "WORDS_SUCH_AS",
      quantifier: "SET",
      wordList: [{ index: "0", value: "foo" }, { index: "1", value: "bar" }]
    }

    expect(json(await addSet(specs)))
      .toEqual(json({ regex: "foo|bar", specs: { ...specs, characters: undefined } }))
  })

  it("simulates without words", async () => {
    try {
      const specs = {
        anchor: "CONTAINS",
        characters: "WORDS_SUCH_AS",
        quantifier: "SET",
        wordList: []
      }
      await addSet(specs)
    } catch (e) {
      expect(e.message).toEqual("The word list cannot be empty.")
    }
  })
})
