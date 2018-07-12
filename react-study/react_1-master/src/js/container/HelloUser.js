import React, { Fragment } from 'react';
import Hello from '../presentational/Hello';
import HelloInput from '../presentational/HelloInput';

let idGenerator = 0;

class HelloUser extends React.Component {
    state = {
        name: '',
        users: []
    };

    handleChange = (evt) => {
        this.setState({
            name: evt.target.value
        });
    }

    addUserHandler = () => {
        this.setState({users: [...this.state.users, {id: idGenerator++, name: this.state.name}]});
    }

    render() {
        const users = this.state.users;
        const helloUsersElements = users.map((user)=> (
            <Hello key={user.id} name={user.name}/>
        ));

        return (
            <Fragment>
                <HelloInput handleChange={this.handleChange} addUserHandler={this.addUserHandler}/>
                {
                    helloUsersElements
                }
            </Fragment>
        )
    }
}

export default HelloUser;