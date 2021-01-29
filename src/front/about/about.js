import React, { Component } from 'react';

import './about.css';
import FrontNav from '../components/nav.js';
import { bandMates, bandInfo } from '../../components/static';
import SocialMediaFooter from '../components/footer';


class FrontAbout extends Component {
	render() {
		const { header, bandSection, p } = bandInfo;

		const bandMatesMembers = bandMates.map((member) => {
			return (
				<div className="band-mates__band-mate-container">
					<img className="band-mates__band-mate-pic" src={member.img} alt='smiley' />
					<h4 className="band-mates__band-mate-role">{member.role}</h4>
					<h4 className="band-mates__band-mate-name">{member.name}</h4>
					<p className="band-mates__band-mate-about">{member.blurb}</p>
				</div>
			)
		});

		return (
			<div>
				<header className="background">
					<div className="background__title">
						<h1 className="background__title--title">Pharoah</h1>
					</div>
				</header>
				<div className="background__nav"><FrontNav /></div>
				<div className="about-band">
					<h1 className="about-band__title">{header}</h1>
					<p className="about-band__p">{p}</p>
				</div>
				<div className="band-mates">
					<h3 className="band-mates__section-title">{bandSection}</h3>
					{bandMatesMembers}
				</div>
				<SocialMediaFooter />
			</div>
		);
	}
}

export default FrontAbout;