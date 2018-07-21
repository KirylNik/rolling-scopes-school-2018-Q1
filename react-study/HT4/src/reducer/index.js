import {combineReducers} from 'redux'
import counterReducer from './counter'
import articles from './articles'
import filterDateRange from './filterDateRange'

export default combineReducers({
    count: counterReducer,
    articles,
    filterDateRange
})