import { anchors, characters } from './data'
import conditionAdders from './condition-adders'
import {
  getAnchorsWithoutUsedEdges,
  insertNewChunk,
  updateExistingChunk
} from './utils'

async function addCondition(specs, insertAtIndex = 0, newItem = true) {
  const { prefix = '', suffix = '' } = anchors.find(
    item => item.key === specs.anchor
  ) || {}

  try {
    let chunk = await conditionAdders[specs.quantifier](specs)

    const { value = '' } =
      (characters[specs.quantifier] || characters.DEFAULT)
      .find(item => item.key === specs.characters) || {}

    chunk = {
      regex: prefix.concat(value, chunk.regex, suffix),
      specs: { ...chunk.specs, characters: specs.characters }
    }

    const insertChunk = newItem ? insertNewChunk : updateExistingChunk
    this.chunks = insertChunk(this.chunks, insertAtIndex, chunk)

    this.regexChunks = this.chunks.map(({ regex }) => regex)
    return Promise.resolve()
  }
  catch (err) {
    return Promise.reject(err)
  }
}

function deleteCondition(targetIndex) {
  if (!this.chunks[targetIndex]) {
    return Promise.reject(new Error('This index is undefined and cannot be removed.'))
  }

  this.chunks = this.chunks.filter((chunk, index) => targetIndex !== index)
  this.regexChunks = this.chunks.map(({ regex }) => regex)
  return Promise.resolve()
}

function getAvailableAnchors(targetIndex, position) {
  const chunksLength = this.chunks.length

  if (!chunksLength) return Array.from(anchors)

  const data = getAnchorsWithoutUsedEdges(
    this.chunks,
    anchors,
    ['STARTS_WITH', 'ENDS_WITH']
  )

  if (position === 'before') {
    return targetIndex === 0
      ? data.filter(item => item.key !== 'ENDS_WITH')
      : data.filter(item => item.key === 'CONTAINS')
  }
  else if (position === 'after') {
    return targetIndex === chunksLength - 1
      ? data.filter(item => item.key !== 'STARTS_WITH')
      : data.filter(item => item.key === 'CONTAINS')
  }

  return data.filter(item => item.key === 'CONTAINS')
}

function getChunks() {
  return Array.from(this.chunks)
}

function getFlags() {
  return JSON.parse(JSON.stringify(this.flags))
}

function getRegexChunks() {
  return Array.from(this.regexChunks)
}

function setFlag(entry, value) {
  this.flags = {
    ...this.flags,
    [entry]: value
  }
}

const core = {
  addCondition,
  chunks: [],
  deleteCondition,
  flags: {
    global: false
  },
  getAvailableAnchors,
  getChunks,
  getFlags,
  getRegexChunks,
  regexChunks: [],
  setFlag
}

export default core
