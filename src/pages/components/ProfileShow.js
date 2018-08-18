import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom';
import {Col, Row, Image} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';
import pp from "./person.png";

class ProfileShow extends React.Component {
	constructor(props) {
		super(props);
		
		this.id = props.match.params.uid;
		
		this.state = {
			name: "",
			age:"",
			bio:"",
			country:"",
			city:"",
			street:"",
			building:"",
			postCode:""
		}
	}

	componentDidMount(){
		fetch("localhost:1337/user/" + this.id,
			{
				method: 'GET',
				headers: {
					Authorization: sessionStorage.getItem('token')
				}
			})
  		.then(res => res.json())
  		.then(
        (result) => {
        	console.log(result)       
        	if(result.status){        		
        		this.setState(
        			{        				
        				name: result.data.name,
						age: result.data.age,
						biography: result.data.bio,
						country: result.data.address.country,
						city:result.data.address.city,
						street:result.data.address.street,
						building:result.data.address.building_number,
						postCode:result.data.address.postcode
        			})
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
 		return (
			
			<Panel>
				<Panel.Heading>Profile</Panel.Heading>
				<Panel.Body>
				
				<Row>
					<Col md={4}> Name</Col>
					<Col md={8}>{this.props.profileData.name}</Col>
				</Row>
				<Row>
					<Col md={4}> Age</Col>
					<Col md={8}>{this.props.profileData.age}</Col>
				</Row>
				<Row>
					<Col md={4}> Biography</Col>
					<Col md={8}>{this.props.profileData.bio}</Col>
				</Row>
				<Row>
					<Col md={4}> Country</Col>
					<Col md={8}>{this.props.profileData.country}</Col>
				</Row>
				<Row>
					<Col md={4}> City</Col>
					<Col md={8}>{this.props.profileData.city}</Col>
				</Row>
				<Row>
					<Col md={4}> Street</Col>
					<Col md={8}>{this.props.profileData.street}</Col>
				</Row>
				<Row>
					<Col md={4}> Building</Col>
					<Col md={8}>{this.props.profileData.building}</Col>
				</Row>
				<Row>
					<Col md={4}> Post Code</Col>
					<Col md={8}>{this.props.profileData.postCode}</Col>
				</Row>
				<div>
					<Button id='editButton' name='editButton'  onClick={() => this.props.history.push(this.id+'/edit') } >Edit</Button>
				</div>
				</Panel.Body>
			</Panel>
		);
	}
}

export default withRouter(ProfileShow);