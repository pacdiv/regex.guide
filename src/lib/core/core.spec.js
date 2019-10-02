import Core from "./core"

describe("Core", () => {
  const condition1 = {
    anchor: "CONTAINS",
    characters: "ALPHANUMERIC_CHARACTERS",
    error: null,
    exactQuantifierValue: "",
    maximumQuantifierValue: "",
    minimumQuantifierValue: "",
    quantifier: "ONE_OR_MORE",
    setValue: "",
  }

  const condition2 = {
    ...condition1,
    quantifier: "EXACTLY",
    minimumQuantifierValue: 3,
  }

  it("core initialization", () => {
    const core = Object.create(Core)

    expect(core).toBeTruthy()
    expect(core.getChunks()).toEqual([])
    expect(core.getFlags().global).toEqual(false)
    expect(core.getRegexChunks()).toEqual([])
  })

  it("add condition", async () => {
    const core = Object.create(Core)

    await core.addCondition(condition1)

    expect(core.getChunks().length).toEqual(1)
    expect(core.getRegexChunks().length).toEqual(1)

    const wrongCondition = {
      ...condition2,
      minimumQuantifierValue: "-1",
    }

    core.addCondition(wrongCondition).catch(() => {
      expect(core.getChunks().length).toEqual(1)
      expect(core.getRegexChunks().length).toEqual(1)
    })
  })

  it("edit condition", async () => {
    const core = Object.create(Core)

    await core.addCondition(condition1)
    await core.addCondition(condition1, 0, false)

    expect(core.getChunks().length).toEqual(1)
    expect(core.getRegexChunks().length).toEqual(1)
  })

  it("delete condition", async () => {
    const core = Object.create(Core)

    await core.addCondition(condition1)
    await core.addCondition(condition2)

    await core.deleteCondition(1)
    await core.deleteCondition(0)

    expect(core.getChunks().length).toEqual(0)
    expect(core.getRegexChunks().length).toEqual(0)

    core.deleteCondition(42).catch(() => {
      expect(core.getChunks().length).toEqual(0)
      expect(core.getRegexChunks().length).toEqual(0)
    })
  })

  it("get available anchors", async () => {
    const core = Object.create(Core)
    const joinKeys = data =>
      data.reduce(
        (acc, { key }, index) => (index ? acc.concat("-", key) : key),
        ""
      )

    await core.addCondition(condition1)
    await core.addCondition(condition2)

    expect(joinKeys(core.getAvailableAnchors(0, "before"))).toEqual(
      "CONTAINS-STARTS_WITH"
    )
    expect(joinKeys(core.getAvailableAnchors(1, "before"))).toEqual("CONTAINS")

    expect(joinKeys(core.getAvailableAnchors(0, "after"))).toEqual("CONTAINS")
    expect(joinKeys(core.getAvailableAnchors(1, "after"))).toEqual(
      "CONTAINS-ENDS_WITH"
    )

    expect(joinKeys(core.getAvailableAnchors(0))).toEqual("CONTAINS")

    await core.deleteCondition(1)
    await core.deleteCondition(0)

    expect(joinKeys(core.getAvailableAnchors(0))).toEqual(
      "CONTAINS-ENDS_WITH-STARTS_WITH"
    )
  })

  it("set flag", () => {
    const core = Object.create(Core)

    core.setFlag("global", true)
    expect(core.getFlags().global).toEqual(true)
  })
})
