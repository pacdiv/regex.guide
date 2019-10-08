import { anchors, characters } from "./data"

const getAnchorsWithoutUsedEdges = (dataSource, anchors, edges) => {
  return edges.reduce(
    (acc, anchor) =>
      dataSource.some(({ specs }) => specs.anchor === anchor)
        ? acc.filter(item => item.key !== anchor)
        : acc,
    anchors
  )
}

export function getAvailableAnchors(targetIndex, position) {
  const chunksLength = this.chunks.length

  if (!chunksLength) return Array.from(anchors)

  const data = getAnchorsWithoutUsedEdges(this.chunks, anchors, [
    "STARTS_WITH",
    "ENDS_WITH",
  ])

  if (position === "before") {
    return targetIndex === 0
      ? data.filter(item => item.key !== "ENDS_WITH")
      : data.filter(item => item.key === "CONTAINS")
  } else if (position === "after") {
    return targetIndex === chunksLength - 1
      ? data.filter(item => item.key !== "STARTS_WITH")
      : data.filter(item => item.key === "CONTAINS")
  }

  return data.filter(item => item.key === "CONTAINS")
}

export function getAvailableBackReferences(targetIndex, position) {
  if (targetIndex < 0) return []

  return this.capturedChunks.filter(
    chunk =>
      (!position && chunk.index < targetIndex) ||
      (position === "before" && chunk.index < targetIndex) ||
      (position === "after" && chunk.index <= targetIndex)
  )
}

export function getAvailableDefaultCharacters(targetIndex, position) {
  return !getAvailableBackReferences.call(this, targetIndex, position).length
    ? characters.filter(item => item.key !== "BACK_REFERENCES")
    : characters
}

export const insertNewChunk = (dataSource, targetIndex, chunk) => {
  if (!dataSource.length) return [chunk]
  if (targetIndex === dataSource.length) return dataSource.concat(chunk)

  return dataSource.reduce(
    (acc, item, index) => acc.concat(targetIndex === index ? chunk : [], item),
    []
  )
}

export const updateExistingChunk = (dataSource, targetIndex, chunk) => {
  return dataSource.reduce(
    (acc, item, index) => acc.concat(targetIndex === index ? chunk : item),
    []
  )
}
