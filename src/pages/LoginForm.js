import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import './loginForm.css'

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

		this.state = {
			username:"",
			password:"",
			validationFeedback:null
		}
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
			[e.target.name] : e.target.value
		})
	}

	handleLogin(e){
		fetch("localhost:1337/login",
			{
				method: 'POST',
				body: JSON.stringify({
			        username: this.state.username,			         
			        password: this.state.password
		      	})
			})
  		.then(res => res.json())
  		.then(
        (result) => {
        	console.log(result)       
        	if(result.status){
        		console.log(result.status)  
        		let userId = result.data.id;
        		let token = result.data.token;
        		sessionStorage.setItem('token', token); 
        		sessionStorage.setItem('id', userId); 
        		this.props.history.push('dashboard/' + userId)
        	}else{        		
        		this.setState({        			
			      	validationFeedback:result.feedback
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
				<h4>Login Form</h4>
				<p className='error'>
					{this.state.validationFeedback}
				</p>
				<Form align='left' >
					<FormGroup controlId='emailUsernameFormGroup'>
						<ControlLabel>Email Or Username</ControlLabel>
						<FormControl type='text'  placeholder='Enter your email or username' name="username" onChange={this.handleChange} value={this.state.username}/>
					</FormGroup>
					<FormGroup controlId='passwordFormGroup'>
						<ControlLabel>Password</ControlLabel>
						<FormControl type='password' placeholder='Enter your password' name="password" onChange={this.handleChange} value={this.state.password}/>
					</FormGroup>					
					<div>
						<Button id='loginButton' 
								onClick={ this.handleLogin } >Login</Button>
						<Link to='/registration'> Register as new user</Link>
					</div>
				</Form>
				
			</Col>
		);
	}
}

export default withRouter(LoginForm);