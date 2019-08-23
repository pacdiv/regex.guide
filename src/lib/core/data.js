export const anchors = [
  { key: 'CONTAINS', label: 'contain' },
  { key: 'ENDS_WITH', label: 'end with', suffix: '$' },
  { key: 'STARTS_WITH', label: 'start with', prefix: '^' },
]

export const characters = {
  DEFAULT: [
    { key: 'ALPHANUMERIC_CHARACTERS', label: 'alphanumeric characters', value: '\\w' },
    { key: 'UPPER_LETTERS', label: 'capital letters', value: '[A-Z]' },
    { key: 'NUMBERS', label: 'numbers', value: '\\d' },
    { key: 'ANYTHING', label: 'random characters', value: '.' },
    { key: 'LOWER_LETTERS', label: 'small letters', value: '[a-z]' }
  ],
  SET: [
    { key: 'CHARACTERS', label: 'characters' },
    { key: 'WORDS_SUCH_AS', label: 'words' }
  ]
}

export const quantifiers = [
  { key: 'SET', label: 'a set of' },
  { key: 'BETWEEN', label: 'between' },
  { key: 'EXACTLY', label: 'exactly' },
  { key: 'ONE_OR_MORE', label: 'one or many' },
  { key: 'NONE_OR_MORE', label: 'zero or many' }
]
