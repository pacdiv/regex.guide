export default function addBetween(specs) {
  const {
    minimumQuantifierValue: minimum,
    maximumQuantifierValue: maximum
  } = specs

  if (minimum && maximum) {
    if (maximum && Number(minimum) >= Number(maximum)) {
      return Promise.reject(new Error('Minimum must be lower than maximum.'))
    }

    return Promise.resolve({
      regex: '{'.concat(minimum, ',', maximum, '}'),
      specs: {
        anchor: specs.anchor,
        minimumQuantifierValue: minimum,
        maximumQuantifierValue: maximum,
        quantifier: specs.quantifier
      }
    })
  }

  return Promise.reject(new Error('Minimum and maximum values must be defined.'))
}
