import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';
import {HelpBlock} from 'react-bootstrap';

class ProfileEdit extends React.Component {
	constructor(props) {
		super(props);
		this.id = props.match.params.uid;
		this.ageList = [];
		for(let i = 10; i <= 85; i++) {
			this.ageList.push(i);
		}

		this.state = {
			name: this.props.profileData.name,
			name_feedback: null,
			name_status: null,
			age:this.props.profileData.age,
			age_feedback:null,
			age_status:null,
			bio:this.props.profileData.bio,
			bio_feedback:null,
			bio_status:null,
			country:this.props.profileData.country,
			country_feedback:null,
			country_status:null,
			city:this.props.profileData.city,
			city_feedback:null,
			city_status:null,
			street:this.props.profileData.street,
			street_feedback:null,
			street_status:null,
			building_number:this.props.profileData.building,
			building_number_feedback:null,
			building_number_status:null,
			postcode:this.props.profileData.postCode,
			postcode_feedback:null,
			postcode_status:null
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleEdit(e){
		fetch("localhost:1337/user/" + this.id,
			{
				method: 'PUT',
				headers: {
					Authorization: sessionStorage.getItem('token')
				},
				body: JSON.stringify({
					name: this.state.name ,
					age: this.state.age ,
					bio: this.state.bio ,
					country: this.state.country ,
					city: this.state.city ,
					street: this.state.street ,
					building_number: this.state.building_number ,
					postcode: this.state.postcode 
		      	})
			})
  		.then(res => res.json())
  		.then(
        (result) => {      
        	console.log(result)
        	if(result.status){
        		this.props.history.replace('dashboard/' + this.id)
        	}else{        		
        		this.setState({
        			name_feedback: result.fields.name.feedback,
					name_status: result.fields.name.status,

					age_feedback:result.fields.age.feedback,
					age_status:result.fields.age.status,

					bio_feedback:result.fields.bio.feedback,
					bio_status:result.fields.bio.status,

					country_feedback:result.fields.country.feedback,
					country_status:result.fields.country.status,

					city_feedback:result.fields.city.feedback,
					city_status:result.fields.city.status,

					street_feedback:result.fields.city.feedback,
					street_status:result.fields.city.status,

					building_number_feedback:result.fields.building_number.feedback,
					building_number_status:result.fields.building_number.status,

					postcode_feedback:result.fields.postcode.feedback,
					postcode_status:result.fields.postcode.status
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
				<Panel.Heading> Edit Profile</Panel.Heading>
				<Panel.Body>
				<Form align='left' >
					<FormGroup controlId='nameFormGroup' validationState={this.state.name_status}>
						<ControlLabel>Name</ControlLabel>
						<FormControl type='text'  placeholder='Enter your Name'  name="name" value={this.state.name} onChange={this.handleChange}/>
						<FormControl.Feedback />
          				<HelpBlock>{this.state.name_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='ageFormGroup' validationState={this.state.age_status}>
						<ControlLabel>Age</ControlLabel>
						<FormControl componentClass='select'  placeholder='Enter your age' name="age" value={this.state.age} onChange={this.handleChange}>
							{this.ageList.map((item) => (<option value={item}>{item} </option> ) )}
							<FormControl.Feedback />
          					<HelpBlock>{this.state.age_feedback}</HelpBlock>
						</FormControl>
					</FormGroup>
					<FormGroup controlId='biographyFormGroup' validationState={this.state.bio_status}>
						<ControlLabel>Biography</ControlLabel>
						<FormControl componentClass='textarea'  placeholder='Enter your Biography' name="bio" value={this.state.bio} onChange={this.handleChange}/>
						<FormControl.Feedback />
          				<HelpBlock>{this.state.bio_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='countryFormGroup' validationState={this.state.country_status}>
						<ControlLabel>Country</ControlLabel>
						<FormControl type='text'  placeholder='Enter your Country' name="country" value={this.state.country} onChange={this.handleChange}/>
						<FormControl.Feedback />
          				<HelpBlock>{this.state.country_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='cityFormGroup' validationState={this.state.city_status}>
						<ControlLabel>City</ControlLabel>
						<FormControl type='text'  placeholder='Enter your City' name="city"  value={this.state.city} onChange={this.handleChange}/>
						<FormControl.Feedback />
          				<HelpBlock>{this.state.city_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='streetFormGroup' validationState={this.state.street_status}>
						<ControlLabel>Street</ControlLabel>
						<FormControl type='text'  placeholder='Enter your Street' name="street" value={this.state.street} onChange={this.handleChange}/>
						<FormControl.Feedback />
          				<HelpBlock>{this.state.street_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='buildingFormGroup' validationState={this.state.building_number_status}>
						<ControlLabel>Building</ControlLabel>
						<FormControl type='text'  placeholder='Enter your Building' name="building_number" value={this.state.building_number} onChange={this.handleChange}/>
						<FormControl.Feedback />
          				<HelpBlock>{this.state.building_number_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='postCodeFormGroup' validationState={this.state.postcode_status}>
						<ControlLabel>Post Code</ControlLabel>
						<FormControl type='text'  placeholder='Enter your post code' name="postcode" value={this.state.postcode} onChange={this.handleChange}/>
						<FormControl.Feedback />
          				<HelpBlock>{this.state.postcode_feedback}</HelpBlock>
					</FormGroup>
					<div>
						<Button id='save' name='saveButton' onClick={ this.handleEdit } >Save</Button>
					</div>
				</Form>
				</Panel.Body>
			</Panel>
			
		);
	}
}

export default withRouter(ProfileEdit);