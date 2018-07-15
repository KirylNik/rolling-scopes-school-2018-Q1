import React, {Component} from 'react'
import Comment from './Comment'

export default class CommentsList extends Component {

    constructor (props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    render () {
        const {isOpen} = this.state;
        const {comments = []} = this.props;
        const commentElements = comments.map(comment => <Comment comment = {comment}/>);

        return (
            <div>
                {commentElements.length > 0 && 
                <button onClick = {this.toggleOpen}>
                {isOpen ? 'hide comments' : 'show comments'}
                </button>
                }
                {this.state.isOpen ? commentElements : null}
            </div>
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