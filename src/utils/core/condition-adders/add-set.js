function addCharacters(specs) {
  if (!specs.setValue.trim()) {
    return Promise.reject(new Error("Characters must be defined."))
  }

  const prefix = specs.characters === "CHARACTERS_EXCEPT" ? "^" : ""
  return Promise.resolve(`[${prefix}${specs.setValue}]`)
}

function addWords(specs) {
  const { wordList } = specs

  if (!wordList.length || (wordList.length === 1 && wordList[0].value === "")) {
    return Promise.reject(new Error("The word list cannot be empty."))
  }

  return Promise.resolve(wordList.map(({ value }) => value).join("|"))
}

const mapper = {
  CHARACTERS_EXCEPT: addCharacters,
  CHARACTERS_SUCH_AS: addCharacters,
  WORDS_SUCH_AS: addWords,
}

export default function addSet(specs) {
  return mapper[specs.characters](specs)
}
