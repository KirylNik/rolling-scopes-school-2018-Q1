import {normalizedArticles} from '../fixtures'
import {DELETE_ARTICLE} from '../constants'
console.dir(normalizedArticles);
const articlesMap = normalizedArticles.reduce((acc, articles) => {
    acc[articles.id] = articles
    return acc
}, {})

const articleArr = Object.values(articlesMap);

export default (articleState = articleArr, action) => {
    const {type, payload} = action

    switch (type) {
        case DELETE_ARTICLE: return articleState.filter(article => article.id !== payload.id)
    }

    return articleState
}