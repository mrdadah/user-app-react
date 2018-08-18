import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom';
import {Col, Row, Image} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import pp from "./person.png";

class ProfilePhoto extends React.Component {
	constructor(props) {
		super(props);
		console.log("^^^")
		console.log(props.profileData)
		this.id = props.match.params.uid;

		this.state = {		
			image: ""
		}
	 	this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt)
    {
        console.log("Uploading");
	    var self = this;
	    var reader = new FileReader();
	    var file = evt.target.files[0];

	    reader.onload = function(upload) {
	        self.setState({
	            image: upload.target.result
	        });
	    };
	    reader.readAsDataURL(file);
	    setTimeout(function() {

		  fetch("localhost:1337/user/" + self.id + "/upload",
			{
				method: 'POST',
				headers: {
					Authorization: sessionStorage.getItem('token')
				},
				body: JSON.stringify({
					img: self.state.image
		      	})
			})
	  		.then(res => res.json())
	  		.then(
	        (result) => {      
	        	console.log(result)
	        	if(result.status){
	        		//this.props.history.replace('dashboard/' + this.id)
	        	}
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          console.log(error)
	        }
	      )

		}, 1000);	    
    }

	render() {
 		return (
			
			<Panel>
				<Panel.Heading>Profile Photo</Panel.Heading>
				<Panel.Body>
				<Row>
					<Col md={6}>
						<Image src={this.props.profileData.image} alt='Group' responsive />				
					</Col>
					<Col md={6}>
					<Form align="left">
						<FormGroup controlId='imageFormGroup'>
							<ControlLabel>Change Profile Image</ControlLabel>
							<FormControl type='file' placeholder='Choose Image' name="image" onChange={ this.handleChange} />
						</FormGroup>
					</Form>
					</Col>
				</Row>
				</Panel.Body>
			</Panel>
		);
	}
}

export default withRouter(ProfilePhoto);