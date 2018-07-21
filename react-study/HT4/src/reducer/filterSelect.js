import {CHANGE_FILTER_SELECT} from '../constants'

export default (count = 0, action) => {
    const {type} = action

    switch (type) {
        case CHANGE_FILTER_SELECT: return count + 1
    }

    return count
}