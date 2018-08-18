import React from 'react';
import {  Navbar } from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';
import './logout.css'
class AppNavbar extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Navbar>
				<Navbar.Header >					
					<Navbar.Brand>
						UsersApp
					</Navbar.Brand>					
				</Navbar.Header>
				<Navbar.Collapse>
					<Route path="/dashboard" render={()=>{ 						
						return <Link className="logout" pullRight to="/" replace onClick={() => {
							sessionStorage.removeItem('token')
							sessionStorage.removeItem('id')
						}}> Logout </Link>
					}} />
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default AppNavbar;