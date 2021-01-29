import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import './components.css';

class FrontNav extends Component {
	render() {
		return (
			<ul className="nav__ul">
				<li className="nav__navlink">
					<NavLink to='/about'>
						About
			</NavLink>
				</li>
				<li className="nav__navlink">
					<NavLink to='/media'>
						Media
			</NavLink>
				</li>
				<li className="nav__navlink">
					<NavLink to='/schedule'>
						Schedule
			</NavLink>
				</li>
			</ul>
		);
	}
}

export default FrontNav;