import {
  getAnchorsWithoutUsedEdges,
  insertNewChunk,
  updateExistingChunk
} from './core-utils'

export const anchors = [
  { key: 'CONTAINS', label: 'contain' },
  { key: 'ENDS_WITH', label: 'end with', suffix: '$' },
  { key: 'STARTS_WITH', label: 'start with', prefix: '^' },
]

export const quantifiers = [
  { key: 'SET', label: 'a set of' },
  { key: 'BETWEEN', label: 'between' },
  { key: 'EXACTLY', label: 'exactly' },
  { key: 'ONE_OR_MORE', label: 'one or many' },
  { key: 'NONE_OR_MORE', label: 'zero or many' }
]

export const characters = [
  { key: 'ALPHANUMERIC_CHARACTERS', label: 'alphanumeric characters', value: '\\w' },
  { key: 'UPPER_LETTERS', label: 'capital letters', value: '[A-Z]' },
  { key: 'NUMBERS', label: 'numbers', value: '\\d' },
  { key: 'ANYTHING', label: 'random characters', value: '.' },
  { key: 'LOWER_LETTERS', label: 'small letters', value: '[a-z]' },
  { key: 'CHARACTERS', isSetQuantifier: true, label: 'characters like' },
  { key: 'WORDS_SUCH_AS', isSetQuantifier: true, label: 'words such as' }
]

function addCondition(specs, insertAtIndex = 0, newItem = true) {
  const { anchor } = specs
  let chunk = { regex: '', specs: {} }
  const { prefix = '', suffix = '' } = anchors.find(item => item.key === anchor) || {}
  const { minimumQuantifierValue: minimum, maximumQuantifierValue: maximum } = specs

  if (specs.quantifier === 'BETWEEN') {
    if (minimum && maximum) {
      if (maximum && Number(minimum) >= Number(maximum)) {
        return Promise.reject(new Error('Minimum must be lower than maximum.'))
      }

      chunk = {
        regex: '{'.concat(minimum, ',', maximum, '}'),
        specs: {
          anchor,
          minimumQuantifierValue: minimum,
          maximumQuantifierValue: maximum,
          quantifier: 'BETWEEN'
        }
      }
    } else return Promise.reject(new Error('Minimum and maximum values must be defined.'))
  } else if (specs.quantifier === 'EXACTLY') {
    if (specs.minimumQuantifierValue) {
      chunk = {
        regex: `{${specs.minimumQuantifierValue}}`,
        specs: {
          anchor,
          minimumQuantifierValue: specs.minimumQuantifierValue,
          maximumQuantifierValue: specs.maximumQuantifierValue,
          quantifier: 'EXACTLY'
        }
      }
    } else return Promise.reject(new Error('A quantity must be set.'))
  } else if (specs.quantifier === 'ONE_OR_MORE' || specs.quantifier === 'NONE_OR_MORE') {
    chunk = {
      regex: specs.quantifier === 'ONE_OR_MORE' ? '+' : '*',
      specs: {
        anchor,
        quantifier: specs.quantifier
      }
    }
  } else if (specs.quantifier === "SET") {
    if (specs.characters === "WORDS_SUCH_AS") {
      if (!specs.wordList.length || (specs.wordList.length === 1 && specs.wordList[0].value === "")) {
        return Promise.reject(new Error('The word list cannot be empty.'))
      }

      chunk = {
        regex: specs.wordList.map(({ value }) => value).join("|"),
        specs: {
          anchor,
          quantifier: specs.quantifier,
          wordList: specs.wordList
        }
      }
    } else if (specs.characters === "CHARACTERS") {
      if (!specs.setValue.trim()) return Promise.reject(new Error('Characters must be defined.'))

      chunk = {
        regex: `[${specs.setValue}]`,
        specs: {
          anchor,
          quantifier: specs.quantifier,
          setValue: specs.setValue
        }
      }
    }
  }

  const { value: chars = '' } = characters.find(item => item.key === specs.characters) || {}
  chunk = {
    regex: prefix.concat(chars, chunk.regex, suffix),
    specs: {
      ...chunk.specs,
      characters: specs.characters
    },
  }

  if (!newItem) {
    this.chunks = updateExistingChunk(this.chunks, insertAtIndex, chunk)
  } else {
    const insertChunk = newItem ? insertNewChunk : updateExistingChunk
    this.chunks = insertChunk(this.chunks, insertAtIndex, chunk)
  }

  this.regexChunks = this.chunks.map(({ regex }) => regex)
  return Promise.resolve()
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
