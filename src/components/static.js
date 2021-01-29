import lead from '../assets/lead-cat.jpg';
import guitarist from '../assets/guitarist-cat.jpg';
import bassist from '../assets/bassist-cat.jpg';
import drummer from '../assets/drummer-cat.jpg';
import pharoah from '../assets/pharoah-group-pic.jpg';

export const HOME = '/';
export const ABOUT = '/about';
export const MEDIA = '/media';
export const SHOWs = '/shows';
export const ADMIN = '/admin';
export const ADMIN_MEDIA = '/admin/media';
export const ADMIN_SHOWS = '/admin/shows';
export const apiKey = process.env.REACT_APP_YOUTUBE_APIKEY;
export const youtubeClientId = process.env.REACT_APP_YOUTUBE_CLIENT_ID;
export const spotifyClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const youtubeUploads = process.env.REACT_APP_YOUTUBE_UPLOADS;

export const bandMates = [
	{
		name: 'Freddy Purrcury',
		role: 'lead',
		blurb: 'I am a cat. I like pets and harassing the bird',
		img: lead
	},
	{
		name: 'Buttons May',
		role: 'guitar',
		blurb: 'I prefer it if all glass objects were on the ground',
		img: guitarist
	},
	{
		name: 'Paws Deacon',
		role: 'bassist',
		blurb: 'Here, take a look at my butt',
		img: bassist
	},
	{
		name: 'Rascal Meadows',
		role: 'drummer',
		blurb: 'Pet me, I may purr, I may bite your hand',
		img: drummer
	}
];

export const bandInfo = {
	header: "We are Pharoah",
	bandSection: "Meet the band!",
	p: "We are a bunch of cats. Our group is derivative of Queen. None of us can actually play an instrument and Freddy Purrcury only meows a lot.",
	img: pharoah
};

export const socialMediaLinks = [
	{
		link: 'https://www.facebook.com',
		src: "Facebook",
	},
	{
		link: 'https://www.twitter.com',
		src: "Twitter",
	},
	{
		link: 'https://www.instagram.com',
		src: "Instagram",
	},
	{
		link: 'https://www.spotify.com',
		src: "Spotify",
	},
	{
		link: 'https://www.youtube.com',
		src: "Youtube",
	}
];
