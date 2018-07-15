import React, {Component} from 'react'
import CommentsList from './CommentsList'

export default class Article extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: true,
        }
    }

    render() {
        const {article} = this.props
        const {isOpen} = this.state.isOpen
        return (
            <div>
                <h3>{article.title}</h3>
                <button onClick = {this.toggleOpen}>
                    {isOpen ? 'close' : 'open'}
                </button>
                {this.getBody()}
                {this.getComments()}
            </div>
        )
    }

    getBody() {
        if (!this.state.isOpen) return null
        const {article} = this.props
        return (
            <section>
                {article.text}
            </section>
        )
    }

    getComments() {
        if (!this.state.isOpen) return null;
        const {article} = this.props
        return (
            <CommentsList comments = {article.comments}/>
        )
    }


    toggleOpen = (ev) => {
        ev.preventDefault()
        console.log('---', ev.nativeEvent)
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}