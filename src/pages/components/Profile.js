import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import ProfileShow from './ProfileShow';
import ProfileEdit from './ProfileEdit';
import ProfilePhoto from './ProfilePhoto';
class Profile extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
 		return (
			<React.Fragment>
				<Route path="/dashboard/:uid" render={() =><ProfilePhoto profileData={this.props.profileData}/>} />
				<Route path="/dashboard/:uid/edit" render={() =><ProfileEdit profileData={this.props.profileData}/>}/>
				<Route path="/dashboard/:uid" exact render={() =><ProfileShow profileData={this.props.profileData}/>}/>
			</React.Fragment>
		);
	}
}

export default Profile;