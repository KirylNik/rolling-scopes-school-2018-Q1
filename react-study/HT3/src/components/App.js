import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArticleList from './ArticleList'
import ArticlesChart from './ArticlesChart'
import DayPicker from './DayPicker'
import FormNewComment from './FormNewComment'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class App extends Component {
    static propTypes = {

    };

    state = {
        selection: null
    }

    render() {
        const {articles} = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))
        const modifiers = {
            thursdays: { daysOfWeek: [4] },
            birthday: new Date(2018, 7, 3),
        }
        const modifiersStyles = {
            birthday: {
                color: 'white',
                backgroundColor: '#ffc107',
            },
            thursdays: {
                color: '#ffc107',
                backgroundColor: '#fffdee',
            }
        }

        return (
            <div>
                <FormNewComment action = {'123321'}/>
                <Select options = {options} value = {this.state.selection} onChange = {this.changeSelection} multi />
                <DayPicker />
                <ArticleList articles = {articles} defaultOpenId = {articles[0].id}/>
                <ArticlesChart articles = {articles} />
            </div>
        )
    }

    changeSelection = selection => this.setState({ selection })
}

export default App