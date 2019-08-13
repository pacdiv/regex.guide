import PropTypes from "prop-types"
import React, { Component, createRef } from "react"

import { anchors, quantifiers, characters } from '../../lib/core/'
import EditableText from './editable-text'

class ConditionSentence extends Component {
  static propTypes = {
    condition: PropTypes.object,
    index: PropTypes.number,
    onSentenceMenuChange: PropTypes.func
  }

  static findByKey(dataSource, targetKey) {
    return dataSource.find(item => item.key === targetKey) || {}
  }

  static generateFromArray(source) {
    return source.reduce(
      (acc, value, index) => acc.concat(
        index > 0 && index === source.length - 1 ? " or " : "",
        index && index < source.length - 1 ? ", " : "",
        `"${value}"`
      ),
      ""
    )
  }

  static generateSentence({ specs }) {
    const { findByKey, generateFromArray } = ConditionSentence
    const quantifier = findByKey(quantifiers, specs.quantifier).label

    const data = [
      findByKey(anchors, specs.anchor).label || "",
      specs.quantifier !== "SET" && quantifier || "",
      specs.quantifier === "BETWEEN"
        ? `${specs.minimumQuantifierValue} and ${specs.maximumQuantifierValue}`
        : "",
      specs.quantifier === "EXACTLY" ? specs.minimumQuantifierValue : "",
      findByKey(characters[specs.quantifier] || characters.DEFAULT, specs.characters).label || "",
      specs.characters === "WORDS_SUCH_AS" ? generateFromArray(specs.wordList.map(({ value }) => value)) : "",
      specs.characters === "CHARACTERS" ? generateFromArray(specs.setValue.split("")) : "",
    ]

    return data
      .map(i => i)
      .join(" ")
  }

  state = {
    shouldMenuBeHidden: true,
  }

  containerRef = createRef()

  onButtonClick = ref => {
    const { index, onSentenceMenuChange } = this.props

    this.setState(
      { shouldMenuBeHidden: !this.state.shouldMenuBeHidden },
      () => onSentenceMenuChange(index, ref.current)
    )
  }

  render() {
    return (
      <EditableText
        onClick={this.onButtonClick}
        sentence={ConditionSentence.generateSentence(this.props.condition)}
      />
    )
  }
}

export default ConditionSentence
