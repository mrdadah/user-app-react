import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import {Link, withRouter} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import {HelpBlock} from 'react-bootstrap';
class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	      error: null,
	      username: '',
	      username_status:null,
	      username_feedback:null,
	      email: '',
	      email_status:null,
	      email_feedback:null,
	      password: '',
	      password_status:null,
	      password_feedback:null
	    };
	    this.handleChange = this.handleChange.bind(this)
	    this.handleRegister = this.handleRegister.bind(this)
	}

	componentDidMount(){
		let token = sessionStorage.getItem('token'); 
		let userId = sessionStorage.getItem('id'); 
		if( token && userId ){
			sessionStorage.setItem('id', userId); 
        	this.props.history.push('dashboard/' + userId)
		}
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleRegister(e){
		fetch("localhost:1337/register",
			{
				method: 'POST',
				body: JSON.stringify({
			        username: this.state.username,
			        email: this.state.email, 
			        password: this.state.password, 
		      	})
			})
  		.then(res => res.json())
  		.then(
        (result) => {
        	      
        	if(result.status){
        		let userId = result.data.id;
        		sessionStorage.setItem('token', result.data.token); 
        		sessionStorage.setItem('id', userId); 
        		this.props.history.replace('dashboard/' + userId)
        	}else{        		
        		this.setState({
        			
			      	username_status:result.fields.username.status,
			      	username_feedback:result.fields.username.feedback,
			      	
			      	email_status:result.fields.email.status,
			      	email_feedback:result.fields.email.feedback,
			      	
			      	password_status:result.fields.password.status,
			      	password_feedback:result.fields.password.feedback
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
			<Col xs={12} md={6} mdOffset={3} >
				<h4>Registraion Form</h4>
				<Form align='left' >
					<FormGroup controlId='usernameFormGroup' validationState={this.state.username_status} >
						<ControlLabel>Username</ControlLabel>
						<FormControl type='text' name="username" value={this.state.username} onChange={this.handleChange} placeholder='Enter your username' />
						<FormControl.Feedback />
          				<HelpBlock>{this.state.username_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='emailFormGroup' validationState={this.state.email_status}>
						<ControlLabel>Email</ControlLabel>
						<FormControl type='email' name="email" value={this.state.email} onChange={this.handleChange} placeholder='Enter your email' />
						<FormControl.Feedback />
          				<HelpBlock>{this.state.email_feedback}</HelpBlock>
					</FormGroup>
					<FormGroup controlId='passwordFormGroup' validationState={this.state.password_status} >
						<ControlLabel>Password</ControlLabel>
						<FormControl type='password' name="password" value={this.state.password} onChange={this.handleChange} placeholder='Enter your password' />
						<FormControl.Feedback />
          				<HelpBlock>{this.state.password_feedback}</HelpBlock>
					</FormGroup>
					<div>
						<Button id='registerButton' onClick={this.handleRegister} >Register</Button>
					</div>
				</Form>
			</Col>
		);
	}
}

export default withRouter(RegistrationForm);





// headers: {
//     'Authorization': bearer,
//     'X-FP-API-KEY': 'iphone',
//     'Content-Type': 'application/json'}
// }