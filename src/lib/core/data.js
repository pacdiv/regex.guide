export const anchors = [
  { key: "CONTAINS", label: "contain" },
  { key: "ENDS_WITH", label: "end with", suffix: "$" },
  { key: "STARTS_WITH", label: "start with", prefix: "^" },
]

export const captures = [
  { key: "YES", label: "yes", value: true },
  { key: "NO", label: "no", value: false },
]

export const characters = [
  {
    key: "ALPHANUMERIC_CHARACTERS",
    label: "alphanumeric characters",
    value: "\\w",
  },
  { key: "BACK_REFERENCES", label: "back references" },
  { key: "UPPER_LETTERS", label: "capital letters", value: "[A-Z]" },
  { key: "CHARACTERS_SUCH_AS", label: "characters like" },
  { key: "CHARACTERS_EXCEPT", label: "characters except" },
  { key: "NUMBERS", label: "numbers", value: "\\d" },
  { key: "ANYTHING", label: "random characters", value: "." },
  { key: "LOWER_LETTERS", label: "small letters", value: "[a-z]" },
  { key: "WORDS_SUCH_AS", label: "words like" },
]

export const customCharacters = characters.filter(
  ({ value }) => typeof value === "undefined"
)

export const quantifiers = [
  { key: "AT_LEAST", label: "at least" },
  { key: "BETWEEN", label: "between" },
  { key: "EXACTLY", label: "exactly" },
  { key: "NONE_OR_ONE", label: "zero or one" },
  { key: "ONE_OR_MORE", label: "one or many" },
  { key: "NONE_OR_MORE", label: "zero or many" },
]
