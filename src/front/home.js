import React, { Component } from 'react';
import FrontNav from './components/nav.js';
import 'materialize-css';

const divStyle = {
	display: "flex",
	position: "relative",
	height: "95vh",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column"
}

const h1Style = {
	position: "relative",
	textAlign: "center",
	fontSize: "6rem"
}


class FrontHome extends Component {
	render() {
		return (
			<div style={divStyle}>
				<div>
					<h1 style={h1Style}>We are Pharaoh</h1>
				</div>
				<div>
					<FrontNav />
				</div>
			</div>
		);
	}
}

export default FrontHome;