import addBetween from './add-between'
import addExactly from './add-exactly'
import addSet from './add-set'
import addUnspecified from './add-unspecified'

export default {
  BETWEEN: addBetween,
  EXACTLY: addExactly,
  ONE_OR_MORE: addUnspecified,
  NONE_OR_MORE: addUnspecified,
  SET: addSet
}
