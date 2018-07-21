import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import accordion from '../decorators/accordion'
import {connect} from 'react-redux'

class ArticleList extends Component {
    static propTypes = {
        //from connect
        articles: PropTypes.array.isRequired,
        dateRange: PropTypes.object,
        //from accordion
        openItemId: PropTypes.string,
        toggleOpenItem: PropTypes.func.isRequired
    }
    render() {
        const { from, to } = this.props.dateRange;
        const { articles, openItemId, toggleOpenItem } = this.props
        const fromAsMillSec = +(new Date(from));
        const toAsMillSec = +(new Date(to));
        const articleElements = articles.map(article => {
            const articleDateAsMillSec = +(new Date(article.date));
            if (articleDateAsMillSec > fromAsMillSec &&
                articleDateAsMillSec < toAsMillSec) {
                return (
                <li key={article.id}>
                    <Article
                        article = {article}
                        isOpen = {article.id === openItemId}
                        toggleOpen = {toggleOpenItem(article.id)}
                    />
                </li>
                )
            } else if ( !from || !to) {
                    return (
                    <li key={article.id}>
                        <Article
                            article = {article}
                            isOpen = {article.id === openItemId}
                            toggleOpen = {toggleOpenItem(article.id)}
                        />
                    </li>
                    )
                }

        })

        return (
            <ul>
                {articleElements}
            </ul>
        )
    }
}

export default connect(state => ({
    articles: state.articles,
    dateRange: state.filterDateRange.dateRange
}))(accordion(ArticleList))