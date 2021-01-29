import React, { Component } from 'react';
import { withFirebase } from '../../../components/Firebase';
import '../adminmedia.css';

class ManageSpotify extends Component {
	constructor(props) {
		super(props)

		this.state = {
			playlists: [],
			chosenPlaylist: { id: 'n/a', name: 'n/a' }
		}
	}

	async	componentDidMount() {
		const url = `https://api.spotify.com/v1/me/playlists`;

		let response = await fetch(url, {
			headers: {
				'Authorization': `Bearer ${this.props.token}`,
				'Accept': 'application/json',
			}
		});

		this.loadChosenPlayList();

		response.json()
			.then(data => {
				let playlists = [];
				for (let playlist of data.items) {
					const id = playlist.id;
					const name = playlist.name;
					const playlistObj = { id, name };

					playlists.push(playlistObj);
				}
				return playlists;
			})
			.then(playlists => {
				this.setState({
					...this.state,
					playlists: playlists
				})
			})
	}

	async loadChosenPlayList() {
		const loadSelectedVideos = snap => {
			let playlist = snap.val();
			let thePlayList;
			if (playlist) {
				const id = playlist[0].id;
				const name = playlist[0].name;
				thePlayList = { id, name };
			}
			return thePlayList;
		}

		let data = await this.props.firebase.dbRead('playlist', snap => snap.val());
		let chosenPlaylist = loadSelectedVideos(data);

		this.setState({
			...this.state,
			chosenPlaylist: chosenPlaylist
		});
	}

	async handleChoose(id, e) {
		e.preventDefault();

		let choosen = this.state.playlists.filter(playlist => playlist.id === id);
		let chosePlaylist = [...choosen];

		await this.props.firebase.dbSet('playlist', chosePlaylist);

		this.loadChosenPlayList();
	}


	render() {
		const playlists = this.state.playlists;
		const renderPlaylists = playlists.map(playlist => {
			if (playlist.id === this.state.chosenPlaylist.id) {
				return (
					<div key={playlist.id}>
						<h4>{playlist.name} -chosen</h4>
					</div>
				)
			} else {
				return (
					<div key={playlist.id}>
						<button onClick={this.handleChoose.bind(this, playlist.id)}>{playlist.name}</button>
					</div>
				)
			}
		});


		return (
			<div>
				{renderPlaylists}
			</div>
		)
	}
}

export default withFirebase(ManageSpotify);