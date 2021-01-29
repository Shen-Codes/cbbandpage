import React, { Component } from 'react';
import AdminRoute from './components/adminroute';
import { withAuthentication } from '../components/Session';

class Admin extends Component {
	render() {
		return (
			<AdminRoute />
		);
	}
}

export default withAuthentication(Admin);
