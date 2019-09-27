import React from "react"
import { shallow } from "enzyme"

import { Button, TextInput } from "../../utils"
import ConditionInput from "../ConditionInput"
import FlagsForm from "../FlagsForm"
import EditableChunk from "../EditableChunk"
import EditableText from "../EditableText"
import MatchesTable from "../MatchesTable"
import Playground from "./Playground"

describe("Playground rendering", () => {
  const condition = {
    anchor: "CONTAINS",
    characters: "ALPHANUMERIC_CHARACTERS",
    currentStep: 3,
    exactQuantifierValue: "",
    maximumQuantifierValue: "",
    minimumQuantifierValue: "",
    quantifier: "ONE_OR_MORE",
    setValue: "",
    wordList: []
  }

  it("simulates a condition creation", async () => {
    const wrapper = shallow(<Playground />)

    expect(wrapper.state("isEditingAtIndex")).toEqual(null)
    expect(wrapper.find(EditableChunk)).toHaveLength(0)

    wrapper.find(Button).simulate("click")
    expect(json(wrapper.state("isEditingAtIndex"))).toEqual(json({ index: -1, position: "after" }))

    wrapper.find(ConditionInput).simulate("submit", condition)
    await new Promise(resolve => setTimeout(resolve, 0)) // TODO: await Playground.onConditionInputSubmit
    expect(wrapper.state("isEditingAtIndex")).toEqual(null)
    expect(wrapper.find(EditableChunk)).toHaveLength(1)
  })

  it("simulates a flag editing", () => {
    const wrapper = shallow(<Playground />)

    expect(wrapper.state("flags").global).toEqual(false)

    wrapper.find(EditableText).simulate("click")
    wrapper.find(FlagsForm).simulate("flagChange", "global", true)
    expect(wrapper.state("flags").global).toEqual(true)
  })

  it("simulates typing a source text", () => {
    const wrapper = shallow(<Playground />)
    const sentence = "enzyme is pretty awesome!"

    expect(wrapper.state("sourceString")).toEqual("")

    wrapper.find(TextInput).simulate("change", sentence)
    expect(wrapper.state("sourceString")).toEqual(sentence)
  })

  it("renders the results table", async () => {
    const wrapper = shallow(<Playground />)
    const sentence = "Enzyme is pretty awesome!"

    expect(wrapper.find(MatchesTable)).toHaveLength(0)

    wrapper.find(Button).simulate("click")
    wrapper.find(ConditionInput).simulate("submit", condition)
    await new Promise(resolve => setTimeout(resolve, 0)) // TODO: await Playground.onConditionInputSubmit

    wrapper.find(TextInput).simulate("change", sentence)
    expect(wrapper.find(MatchesTable)).toHaveLength(1)
  })
})
