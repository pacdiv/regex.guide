export default function addExactly(specs) {
  const { minimumQuantifierValue: minimum } = specs

  if (minimum && Number(minimum) > 0) {
    return Promise.resolve({
      regex: `{${minimum}}`,
      specs: {
        anchor: specs.anchor,
        minimumQuantifierValue: minimum,
        quantifier: specs.quantifier
      }
    })
  }

  return Promise.reject(new Error('A quantity bigger than 0 must be set.'))
}
