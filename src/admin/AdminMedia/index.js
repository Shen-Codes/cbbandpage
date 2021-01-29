import React, { Component } from 'react';

import './adminmedia.css';
import { withAuthorization } from '../../components/Session/index.js';
import AdminNav from '../components/adminnav.js';
import ManageYoutube from './components/youtube';
import ManageSpotify from './components/spotify';

const youtubeClientId = process.env.REACT_APP_YOUTUBE_CLIENT_ID;
const spotifyClientId = process.env.REACT_APP_SPOTIFYCLIENT_ID;

const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=consent&response_type=token&client_id=${youtubeClientId}&access_type=online&scope=https://www.googleapis.com/auth/youtube&state=youtube`;
const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=token&redirect_uri=${redirectUri}&state=spotify`;

const extractQueryParams = (url) => {
	let pieces = url.split('#');

	if (pieces.length < 2) {
		return;
	} else {
		return paramStringToObj(pieces[1]);
	}
}

const paramStringToObj = (paramString) => {
	return paramString
		.split('&').map(pair => {
			let [key, value] = pair.split('=');
			let obj = {};
			obj[key] = value;
			return obj;
		})
		.reduce((acc, current) => Object.assign(acc, current));
}




class AdminMedia extends Component {
	constructor(props) {
		super(props)

		this.state = {
			youtubeToken: null,
			spotifyToken: null,
			switchManagement: 'none'
		}
	}

	async componentDidMount() {
		if (extractQueryParams(window.location.href)) {
			let { access_token, state } = extractQueryParams(window.location.href);
			let timeStamp = Date.now() + 3590000;
			let token = { access_token, timeStamp, state };

			await this.props.firebase.dbUpdate(`tokens/${state}Token`, token);
		}

		const timeStamps = this.loadTokens();

		timeStamps.then(val => {
			let youtubeToken = val[1];
			let spotifyToken = val[0];
			return ({ spotifyToken, youtubeToken });
		})
			.then(({ spotifyToken, youtubeToken }) => {
				const sTimestamp = spotifyToken.timeStamp;
				const yTimestamp = youtubeToken.timeStamp;

				switch (true) {
					case (sTimestamp < Date.now() && yTimestamp < Date.now()):
						this.setState({
							youtubeToken: null,
							spotifyToken: null
						});
						break;
					case (yTimestamp < Date.now()):
						this.setState({
							youtubeToken: null,
							spotifyToken: spotifyToken
						});
						break;
					case (sTimestamp < Date.now()):
						this.setState({
							youtubeToken: youtubeToken,
							spotifyToken: null
						});
						break;
					default:
						this.setState({
							youtubeToken: youtubeToken,
							spotifyToken: spotifyToken
						});
				}
			});
	}

	async loadTokens() {
		const loadTokens = snap => {
			let tokens = snap.val();
			let { youtubeToken, spotifyToken } = tokens;
			let tokensArray = [spotifyToken, youtubeToken];

			return tokensArray;
		}

		const data = await this.props.firebase.dbRead('tokens', snap => snap.val());
		const tokensArray = loadTokens(data);
		window.history.pushState("", document.title, window.location.pathname + window.location.search); //not sure why this works

		return tokensArray;
	}

	switchManagement = (api, e) => {
		e.preventDefault();

		this.setState({
			...this.state,
			switchManagement: api
		});
	}


	render() {
		return (
			<div className="admin-media-div">
				<div className="admin-nav"><AdminNav /></div>
				<div className="media-management-links">
					<div>
						{this.state.youtubeToken ?
							<button className="media-management-links__links" onClick={this.switchManagement.bind(this, 'youtube')}>Manage Youtube Videos</button> :
							<a className="media-management-links__links" href={googleAuthUrl}>Get google auth token</a>
						}
						{this.state.spotifyToken ?
							<button className="media-management-links__links" onClick={this.switchManagement.bind(this, 'spotify')}>Manage Spotify Playlist</button> :
							<a className="media-management-links__links" href={spotifyAuthUrl}>Get Spotify Auth Token</a>
						}
					</div>
					{this.state.switchManagement === 'none' ? ''
						: this.state.switchManagement === 'youtube' ?
							<ManageYoutube token={this.state.youtubeToken.access_token} /> : <ManageSpotify token={this.state.spotifyToken.access_token} />
					}
				</div>
			</div>
		);
	}
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminMedia);