import addAtLeast from './add-at-least'
import addBetween from './add-between'
import addExactly from './add-exactly'
import addSet from './add-set'
import addUnspecified from './add-unspecified'
import addZeroOrOne from './add-zero-or-one'

export default {
  AT_LEAST: addAtLeast,
  BETWEEN: addBetween,
  EXACTLY: addExactly,
  ONE_OR_MORE: addUnspecified,
  NONE_OR_ONE: addZeroOrOne,
  NONE_OR_MORE: addUnspecified,
  SET: addSet
}
