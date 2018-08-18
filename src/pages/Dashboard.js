import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Profile from './components/Profile';
import UsersList from './components/UsersList';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.id = props.match.params.uid;

		this.state = {
			profileData: {
				name: "",
				age:"",
				bio:"",
				country:"",
				city:"",
				street:"",
				building:"",
				postCode:"",
				image: "",
				id:""
			}
		}

		this.handleProfileChange = this.handleProfileChange.bind(this)
	}

	handleProfileChange(id){
		fetch("localhost:1337/user/" + id,
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
        				profileData:{
	        				name: result.data.name,
							age: result.data.age,
							bio: result.data.bio,
							country: result.data.address.country,
							city:result.data.address.city,
							street:result.data.address.street,
							building:result.data.address.building_number,
							postCode:result.data.address.postcode,
							id: result.data.id,
							image: result.data.image ? result.data.image : require('./components/person.png')
						}
        			}
        		)
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

	componentDidMount(){
		this.handleProfileChange(this.id)
	}

	render() {
		return (
			<React.Fragment>
			<Col md={6} >
				<Profile profileData={this.state.profileData}/>
			</Col>
			<Col md={6} >
				<UsersList handleProfileChange={this.handleProfileChange}/>
			</Col>
			</React.Fragment>
		);
	}
}

export default Dashboard;