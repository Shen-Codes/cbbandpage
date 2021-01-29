import React from 'react';
import { socialMediaLinks } from '../../components/static';

const socialMedia = socialMediaLinks.map(link => {
	return (
		<a key={link.link} className={link.src} href={link.link}>
			{link.src}
		</a>
	)
})

const SocialMediaFooter = () => {
	return (
		<footer className="social-media">
			{socialMedia}
			<p className="social-media__disclaimer">Pharoah is a trademark of none one in particular, but if you use it, we may have to commandiere your laptop while you do work.</p>
		</footer>
	);
}

export default SocialMediaFooter;