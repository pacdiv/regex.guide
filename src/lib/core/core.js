import { anchors, characters } from "./data"
import conditionAdders from "./condition-adders"
import {
  getAvailableAnchors,
  getAvailableBackReferences,
  getAvailableDefaultCharacters,
  insertNewChunk,
  updateExistingChunk,
} from "./utils"

async function addCondition(specs, insertAtIndex = 0, newItem = true) {
  const { prefix = "", suffix = "" } =
    anchors.find(item => item.key === specs.anchor) || {}

  try {
    let chunk = await conditionAdders[specs.quantifier](specs)

    let value = specs.backReference
    if (specs.characters !== "BACK_REFERENCES") {
      ;({ value = "" } =
        (characters[specs.quantifier] || characters.DEFAULT).find(
          item => item.key === specs.characters
        ) || {})
    }

    const isCaptured = specs.capturedExpression === "YES"
    chunk = {
      regex: "".concat(
        prefix,
        isCaptured ? "(" : "",
        value,
        chunk.regex,
        isCaptured ? ")" : "",
        suffix
      ),
      specs: {
        ...chunk.specs,
        capturedExpression: specs.capturedExpression,
        characters: specs.characters,
        ...(specs.backReference && { backReference: specs.backReference }),
      },
    }

    const insertChunk = newItem ? insertNewChunk : updateExistingChunk
    this.chunks = insertChunk(this.chunks, insertAtIndex, chunk)

    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}

function deleteAllConditions() {
  this.chunks = []
  this.regexChunks = []
  this.capturedChunks = []
}

function deleteCondition(targetIndex) {
  if (!this.chunks[targetIndex]) {
    return Promise.reject(
      new Error("This index is undefined and cannot be removed.")
    )
  }

  this.chunks = this.chunks.filter((chunk, index) => targetIndex !== index)
  return Promise.resolve()
}

function getAvailableData(targetIndex, position) {
  return {
    availableAnchors: getAvailableAnchors.call(this, targetIndex, position),
    availableBackReferences: getAvailableBackReferences.call(
      this,
      targetIndex,
      position
    ),
    availableDefaultCharacters: getAvailableDefaultCharacters.call(
      this,
      targetIndex,
      position
    ),
  }
}

function getChunksState() {
  return {
    chunks: Array.from(this.chunks),
    regexChunks: Array.from(this.regexChunks),
  }
}

function getFlags() {
  return JSON.parse(JSON.stringify(this.flags))
}

function setFlag(entry, value) {
  this.flags = {
    ...this.flags,
    [entry]: value,
  }
}

function execFuncWhileSyncChunksArrays(fn, args) {
  return fn
    .apply(this, args)
    .then(() => {
      this.regexChunks = this.chunks.map(({ regex }) => regex)
      this.capturedChunks = this.chunks.reduce(
        (acc, { regex, specs }, index) => {
          const key = `\\${acc.length + 1}`
          return specs.capturedExpression === "YES"
            ? acc.concat({ index, label: regex, key, regex: key })
            : acc
        },
        []
      )

      return Promise.resolve()
    })
    .catch(err => Promise.reject(err))
}

const core = {
  addCondition: function() {
    return execFuncWhileSyncChunksArrays.call(this, addCondition, arguments)
  },
  deleteCondition: function() {
    return execFuncWhileSyncChunksArrays.call(this, deleteCondition, arguments)
  },
  capturedChunks: [],
  chunks: [],
  deleteAllConditions,
  flags: {
    global: false,
  },
  getAvailableData,
  getChunksState,
  getFlags,
  regexChunks: [],
  setFlag,
}

export default core
