import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminHome from '../adminhome';
import AdminMedia from '../AdminMedia';
import AdminShows from '../AdminShows';
import * as ROUTES from '../../components/static';


class AdminRoute extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path={ROUTES.ADMIN_SHOWS} component={AdminShows} />
					<Route path={ROUTES.ADMIN_MEDIA} component={AdminMedia} />
					<Route path={ROUTES.ADMIN} component={AdminHome} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default AdminRoute;