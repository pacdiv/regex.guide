export default function addBetween(specs) {
  const { minimumQuantifierValue, maximumQuantifierValue } = specs

  if (
    typeof minimumQuantifierValue !== "undefined" &&
    typeof maximumQuantifierValue !== "undefined"
  ) {
    const minimum = Number(minimumQuantifierValue)
    const maximum = Number(maximumQuantifierValue)

    if (minimum < 0 || maximum < 0) {
      return Promise.reject(
        new Error("Minimum and maximum must be positive integers.")
      )
    }
    if (minimum >= maximum) {
      return Promise.reject(new Error("Minimum must be lower than maximum."))
    }

    return Promise.resolve({
      regex: "{".concat(minimum, ",", maximum, "}"),
      specs: {
        anchor: specs.anchor,
        minimumQuantifierValue: minimum,
        maximumQuantifierValue: maximum,
        quantifier: specs.quantifier,
      },
    })
  }

  return Promise.reject(
    new Error("Minimum and maximum values must be defined.")
  )
}
