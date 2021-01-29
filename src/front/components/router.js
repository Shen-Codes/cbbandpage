import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FrontAbout from '../about/about.js';
import FrontHome from '../home.js';
import Shows from '../shows/shows.js';
import FrontMedia from '../media/media.js';
import Admin from '../../Admin/admin.js'

class MainRouter extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={FrontHome} />
					<Route path="/about" component={FrontAbout} />
					<Route path="/media" component={FrontMedia} />
					<Route path="/schedule" component={Shows} />
					<Route path="/admin" component={Admin} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default MainRouter;