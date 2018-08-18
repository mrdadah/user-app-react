import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import UsersListItem from './UsersListItem';
import {Panel} from 'react-bootstrap';

class UsersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	      users: []
	    };
	}

	componentDidMount(){
		fetch("localhost:1337/user",
			{
				method: 'GET',
				headers: {
					Authorization: sessionStorage.getItem('token')
				}
			})
  		.then(res => res.json())
  		.then(
        (result) => {
        	       
        	if(result.status){        		
        		this.setState({users:result.data})
        	}
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
	}

	render() {
		//let users = this.getData();
		return (
			<Panel>
			<Panel.Heading>Users List</Panel.Heading>
			<Panel.Body>
			<ListGroup>
				{ this.state.users.map((user) => <UsersListItem key={user.id} userID={user.id} name={user.name} image={user.image} email={user.email} age={user.age} handleProfileChange={this.props.handleProfileChange}/>) }
			</ListGroup>
			</Panel.Body>
			</Panel>
		);
	}
}

export default UsersList;