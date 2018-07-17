import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './formNewComment.css'

export default class FormNewComment extends Component {

    static PropTypes = {
        action: PropTypes.string.isRequired
    }

    state = {
        username: '',
        textMessage: '',
        usernameClassName: '',
        textMessageClassName: ''
    }

    render () {
        const {action} = this.props.action;
        return (
            <form action = {action}>
                User: <input className = {this.state.usernameClassName}
                             type = 'text' value = {this.state.username}
                             onChange = {this.handleUserChange} />
                Message: <input className = {this.state.textMessageClassName}
                                type = 'text' value = {this.state.textMessage}
                                onChange = {this.handleTextMessage} />
                <input type = "submit" value = "submit"/>
            </form>
        )
    }

    handleUserChange = (e) => {
        if (e.target.value.length < 5 || e.target.value.length > 15) {
            this.setState({
                usernameClassName: 'inputWrong'
            })
        } else {
            this.setState({
                usernameClassName: ''
            })
        }
        
        this.setState({
            username: e.target.value
        })
    }

    handleTextMessage = (e) => {
        if (e.target.value.length < 20 || e.target.value.length > 50) {
            this.setState({
                textMessageClassName: 'inputWrong'
            })
        } else {
            this.setState({
                textMessageClassName: ''
            })
        }
        
        this.setState({
            textMessage: e.target.value
        })
    }
}