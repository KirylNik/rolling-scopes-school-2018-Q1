import { CHANGE_DATE_RANGE, CHANGE_SELECTION, DELETE_ARTICLE } from '../constants'

const defaultFilters = {
    selected: [],
    dateRange: {
        from: null,
        to: null
    }
}

// export default (filters = defaultFilters, action) => {
//     const { type, payload } = action

//     switch (type) {
//         case CHANGE_DATE_RANGE:
//             return Object.assign({}, filters, { dateRange: payload.dateRange })
//             // return {...filters, dateRange: payload.dateRange}

//     }

//     return filters
// }

export default (filters = defaultFilters, action) => {
    const {type, payload} = action

    switch (type) {
        case CHANGE_DATE_RANGE: 
            return payload
            //            return Object.assign({}, filters, { dateRange: payload.dateRange })
            // return {...filters, dateRange: payload.dateRange}

    }

    return filters
}