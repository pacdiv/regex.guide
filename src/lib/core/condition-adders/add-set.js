function addCharacters(specs) {
  if (!specs.setValue.trim()) {
    return Promise.reject(new Error("Characters must be defined."))
  }

  const prefix = specs.characters === "CHARACTERS_EXCEPT" ? "^" : ""

  return Promise.resolve({
    regex: `[${prefix}${specs.setValue}]`,
    specs: {
      anchor: specs.anchor,
      quantifier: specs.quantifier,
      setValue: specs.setValue,
    },
  })
}

function addWords(specs) {
  const { wordList } = specs

  if (!wordList.length || (wordList.length === 1 && wordList[0].value === "")) {
    return Promise.reject(new Error("The word list cannot be empty."))
  }

  return Promise.resolve({
    regex: wordList.map(({ value }) => value).join("|"),
    specs: {
      anchor: specs.anchor,
      quantifier: specs.quantifier,
      wordList,
    },
  })
}

const mapper = {
  CHARACTERS_EXCEPT: addCharacters,
  CHARACTERS_SUCH_AS: addCharacters,
  WORDS_SUCH_AS: addWords,
}

export default function addSet(specs) {
  return mapper[specs.characters](specs)
}
