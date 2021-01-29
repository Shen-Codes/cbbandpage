import React, { Component } from 'react';
import AdminNav from './components/adminnav.js';
import SignInForm from '../components/signin.js';
import { withAuthentication, AuthUserContext } from '../components/Session';

class AdminHome extends Component {
	render() {
		return (
			<div>
				<AuthUserContext.Consumer>
					{authUser =>
						!authUser ? <SignInForm /> : <AdminNav />}
				</AuthUserContext.Consumer>
			</div>
		);
	}
}


export default withAuthentication(AdminHome);