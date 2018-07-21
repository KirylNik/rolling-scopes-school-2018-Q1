import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import {connect} from 'react-redux'
import { changeSelection } from '../../AC'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        //connect:
        selected: PropTypes.array,
        changeSelection: PropTypes.func,

        articles: PropTypes.array.isRequired
    };

    handleChange = selected => this.props.changeSelection({selected})

    render() {
        const { selected, articles } = this.props

        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={selected}
            multi={true}
            onChange={this.handleChange}
        />
    }
}

export default connect((state) => ({
    selected: state.filterDateRange.selected,
    articles: state.articles
}), {changeSelection})(SelectFilter)