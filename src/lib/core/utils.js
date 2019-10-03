export const getAnchorsWithoutUsedEdges = (dataSource, anchors, edges) => {
  return edges.reduce(
    (acc, anchor) =>
      dataSource.some(({ specs }) => specs.anchor === anchor)
        ? acc.filter(item => item.key !== anchor)
        : acc,
    anchors
  )
}

export const getLabelFromKey = (dataSource, targetKey, withCap = false) => {
  const { label } = dataSource.find(({ key }) => targetKey === key) || {}

  if (!label) return ""

  return withCap ? label[0].toUpperCase().concat(label.slice(1)) : label
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
