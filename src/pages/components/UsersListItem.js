import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Image from 'react-bootstrap/lib/Image';
import {Media} from 'react-bootstrap';
// import gg from './groups.jpg';
import {withRouter} from 'react-router-dom';

class UsersListItem extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e){
		this.props.handleProfileChange(this.props.userID)
        this.props.history.replace('/dashboard/' + this.props.userID )
	}

	render() {
		let name = this.props.name;
		let email = this.props.email;
		let age = this.props.age;
		let image = this.props.image?this.props.image:require('./person.png');
		let history = this.props.history;

	return (
		<ListGroupItem 
				key={this.props.userID}
				onClick={ this.handleClick }
				 >
				<Row>
					<Col xs={4} sm={4} >
						<Image src={image} alt='Group'  responsive />
					</Col>
					<Col xs={8} sm={8} align='left' >
						<div>name: {name}</div>
						<div>email: {email}</div>
						<div>age: {age}</div>
					</Col>
				</Row>
			</ListGroupItem>
		);
	}
}

export default withRouter(UsersListItem);