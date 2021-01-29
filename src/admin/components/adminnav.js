import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOutButton from '../../components/signout';
import './adminnav.css';
import { AuthUserContext } from '../../components/Session';



const NavigationAuth = () => {
	return (
		<ul className="navigation">
			<li className="navigation__link">
				<NavLink to='/admin/media'>
					MediaEdit
				</NavLink>
			</li>
			<li className="navigation__link">
				<NavLink to='/admin/shows'>
					ScheduleEdit
				</NavLink>
			</li>
			<li className="navigation__link">
				<SignOutButton />
			</li>
		</ul>

	);
}

const NavigationNonAuth = () => {
	return (
		<div className="signin">
			<NavLink to='/admin'>
				Sign In
			</NavLink>
		</div>
	);
}

const AdminNav = () => {
	return (
		<div>
			<AuthUserContext.Consumer>
				{authUser =>
					authUser ? <NavigationAuth /> : <NavigationNonAuth />
				}
			</AuthUserContext.Consumer>
		</div>
	);
}



export default AdminNav;