import PropTypes from "prop-types"
import React, { Component, createRef } from "react"

import {
  anchors,
  characters,
  customCharacters,
  quantifiers,
} from "../../../lib/core"
import EditableText from "../EditableText"

class ConditionSentence extends Component {
  static propTypes = {
    condition: PropTypes.object,
    index: PropTypes.number,
    onSentenceMenuChange: PropTypes.func,
    position: PropTypes.string,
  }

  static customCharactersKeys = customCharacters.map(({ key }) => key)

  static findByKey(dataSource, targetKey) {
    return dataSource.find(item => item.key === targetKey) || {}
  }

  static generateFromArray(source, negativeSentence = false) {
    const regexp = /".*"/
    const wordLink = negativeSentence ? "and" : "or"
    const prefix = negativeSentence ? "except" : "such as"

    return source.reduce(
      (acc, value, index) =>
        acc.concat(
          index > 0 && index === source.length - 1 ? ` ${wordLink} ` : "",
          index && index < source.length - 1 ? ", " : "",
          value.match(regexp) ? value : `"${value}"`
        ),
      source[0].match(regexp) && !negativeSentence ? "" : `${prefix} `
    )
  }

  static generateCharactersSetstring(source, negativeSentence = false) {
    let skippedIteration = false
    const sourceArray = source.split("")

    const sections = sourceArray.reduce(
      (acc, char, index) => {
        if (skippedIteration) {
          skippedIteration = false
          return acc
        } else if (index === 0 || index === source.length - 1) {
          return { ...acc, singles: acc.singles.concat(char) }
        } else if (
          char === "-" &&
          ConditionSentence.isCharactersRange(source, index)
        ) {
          skippedIteration = true
          return {
            ...acc,
            singles: acc.singles.slice(0, -1),
            groups: acc.groups.concat(
              `from "${source[index - 1]}" to "${source[index + 1]}"`
            ),
          }
        }
        return { ...acc, singles: acc.singles.concat(char) }
      },
      { singles: [], groups: [] }
    )

    return ConditionSentence.generateFromArray(
      Object.values(sections).flat(),
      negativeSentence
    )
  }

  static generateSentence({ specs }, position) {
    const {
      findByKey,
      generateFromArray,
      generateCharactersSetstring,
    } = ConditionSentence
    const quantifier = findByKey(quantifiers, specs.quantifier).label

    const data = [
      findByKey(anchors, specs.anchor).label || "",
      quantifier,
      specs.quantifier === "BETWEEN"
        ? `${specs.minimumQuantifierValue} and ${specs.maximumQuantifierValue}`
        : "",
      specs.quantifier === "EXACTLY" || specs.quantifier === "AT_LEAST"
        ? specs.minimumQuantifierValue
        : "",
      !ConditionSentence.customCharactersKeys.includes(specs.characters)
        ? findByKey(characters, specs.characters).label || ""
        : "",
      specs.characters === "BACK_REFERENCES"
        ? "time(s) the ".concat(
            specs.backReference.replace(/^\\/, "#"),
            " captured reference"
          )
        : "",
      specs.characters === "WORDS_SUCH_AS"
        ? "words ".concat(
            generateFromArray(specs.wordList.map(({ value }) => value))
          )
        : "",
      specs.characters.startsWith("CHARACTERS_")
        ? "characters ".concat(
            generateCharactersSetstring(
              specs.setValue,
              specs.characters === "CHARACTERS_EXCEPT"
            )
          )
        : "",
      position === "second-last" ? "and" : "",
    ]

    return data
      .filter(Boolean)
      .join(" ")
      .concat(position === "body" ? "," : "")
  }

  static isCharactersRange = (source, charIndex) => {
    const [leftChar, , rightChar] = source.substr(charIndex - 1, 3).split("")

    return [/[A-Z]/, /[a-z]/, /[0-9]/].some(
      regex => leftChar.match(regex) && rightChar.match(regex)
    )
  }

  state = {
    shouldMenuBeHidden: true,
  }

  containerRef = createRef()

  onButtonClick = ref => {
    const { index, onSentenceMenuChange } = this.props

    this.setState({ shouldMenuBeHidden: !this.state.shouldMenuBeHidden }, () =>
      onSentenceMenuChange(index, ref.current)
    )
  }

  render() {
    const { condition, index, position } = this.props

    return (
      <EditableText
        label={`editable-chunk-${index}`}
        onClick={this.onButtonClick}
        sentence={ConditionSentence.generateSentence(condition, position)}
      />
    )
  }
}

export default ConditionSentence
