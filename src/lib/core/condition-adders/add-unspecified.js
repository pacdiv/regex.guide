export default function addUnspecified(specs) {
  return Promise.resolve({
    regex: specs.quantifier === 'ONE_OR_MORE' ? '+' : '*',
    specs: {
      anchor: specs.anchor,
      quantifier: specs.quantifier
    }
  })
}
