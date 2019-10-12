export default function addZeroOrOne(specs) {
  return Promise.resolve({
    regex: "?",
    specs: {
      anchor: specs.anchor,
      quantifier: specs.quantifier,
    },
  })
}
