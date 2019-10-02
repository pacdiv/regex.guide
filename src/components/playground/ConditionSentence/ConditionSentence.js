import PropTypes from "prop-types"
import React, { Component, createRef } from "react"

import { anchors, quantifiers, characters } from "../../../lib/core"
import EditableText from "../EditableText"

class ConditionSentence extends Component {
  static propTypes = {
    condition: PropTypes.object,
    index: PropTypes.number,
    onSentenceMenuChange: PropTypes.func,
    position: PropTypes.string,
  }

  static findByKey(dataSource, targetKey) {
    return dataSource.find(item => item.key === targetKey) || {}
  }

  static generateFromArray(source) {
    return source.reduce(
      (acc, value, index) =>
        acc.concat(
          index > 0 && index === source.length - 1 ? " or " : "",
          index && index < source.length - 1 ? ", " : "",
          value.match(/".*"/) ? value : `"${value}"`
        ),
      ""
    )
  }

  static generateCharactersSetstring(source) {
    let skippedIteration = false
    const sourceArray = source.split("")

    return ConditionSentence.generateFromArray(
      sourceArray.reduce((acc, char, index) => {
        if (skippedIteration) {
          skippedIteration = false
          return acc
        } else if (index === 0 || index === source.length - 1) {
          return acc.concat(char)
        } else if (
          char === "-" &&
          ConditionSentence.isCharactersRange(source, index)
        ) {
          skippedIteration = true
          return acc
            .slice(0, index - 1)
            .concat(`from "${source[index - 1]}" to "${source[index + 1]}"`)
        }
        return acc.concat(char)
      }, [])
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
      specs.quantifier !== "SET" ? quantifier : "",
      specs.quantifier === "BETWEEN"
        ? `${specs.minimumQuantifierValue} and ${specs.maximumQuantifierValue}`
        : "",
      specs.quantifier === "EXACTLY" || specs.quantifier === "AT_LEAST"
        ? specs.minimumQuantifierValue
        : "",
      specs.characters !== "BACK_REFERENCES"
        ? findByKey(
            characters[specs.quantifier] || characters.DEFAULT,
            specs.characters
          ).label || ""
        : "",
      specs.characters === "BACK_REFERENCES"
        ? "time(s) the ".concat(
            specs.backReference.replace(/^\\/, "#"),
            " captured reference"
          )
        : "",
      specs.quantifier === "SET" ? "like" : "",
      specs.characters === "WORDS_SUCH_AS"
        ? generateFromArray(specs.wordList.map(({ value }) => value))
        : "",
      specs.characters === "CHARACTERS"
        ? generateCharactersSetstring(specs.setValue)
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
