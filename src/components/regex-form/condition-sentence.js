import PropTypes from "prop-types"
import React, { Component, createRef } from "react"

import { anchors, quantifiers, characters } from '../../utils/core'
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

  static generateSentence({ specs }) {
    const { findByKey } = ConditionSentence
    const quantifier = findByKey(quantifiers, specs.quantifier).label

    return [
      findByKey(anchors, specs.anchor).label || "",
      quantifier || "",
      specs.quantifier === "BETWEEN"
        ? `${specs.minimumQuantifierValue} and ${specs.maximumQuantifierValue}`
        : "",
      specs.quantifier === "EXACTLY" ? specs.minimumQuantifierValue : "",
      findByKey(characters, specs.characters).label || "",
    ].join(" ")
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
    return (
      <EditableText
        onClick={this.onButtonClick}
        sentence={ConditionSentence.generateSentence(this.props.condition)}
      />
    )
  }
}

export default ConditionSentence
