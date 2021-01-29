import React, { Component } from 'react';
import { withFirebase } from '../../../components/Firebase'
import '../adminmedia.css';

const apiKey = process.env.REACT_APP_API_KEY;
const playListUploads = process.env.REACT_APP_YOUTUBE_UPLOADS;


class ManageYoutube extends Component {
	constructor(props) {
		super(props)

		this.state = {
			videosList: [],
			selectedVideos: []
		}
	}

	async	componentDidMount() {
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?&part=snippet&playlistId=${playListUploads}&key=${apiKey}&mine=true`;

		let response = await fetch(url, {
			headers: {
				'Authorization': `Bearer ${this.props.token}`,
				'Accept': 'application/json',
			}
		});


		let data = await this.props.firebase.dbRead('videos', snap => snap.val());
		let selectedVideos = this.loadSelectedVideos(data);


		response.json()
			.then(data => {
				let videosList = [];
				for (let video of data.items) {
					const id = video.snippet.resourceId.videoId;
					const title = video.snippet.title;
					const thumbnail = video.snippet.thumbnails.default.url
					const vidObj = { id, title, thumbnail };

					videosList.push(vidObj);
				}
				return videosList
			})
			.then(videosList => {
				let reconciledVideos = this.reconcileVideos(videosList, selectedVideos)
				return reconciledVideos
			})
			.then(reconciledVideos => {
				this.setState({
					videosList: reconciledVideos,
					selectedVideos: selectedVideos
				})
			});
	};

	loadSelectedVideos = data => {
		const loadSelectedVideos = snap => {
			let videos = snap.val();
			let newVideosList = [];
			for (let video in videos) {
				newVideosList.push({
					fbId: video,
					id: videos[video].id,
					title: videos[video].title,
					thumbnail: videos[video].thumbnail
				});
			}
			return newVideosList;
		}

		let selectedVideos = loadSelectedVideos(data);

		return selectedVideos;
	}

	reconcileVideos = (videosList, selectedVideos) => {
		let reconciledVideos = videosList.filter(video =>
			!selectedVideos.some(selectedVideo => video.id === selectedVideo.id)
		);

		return reconciledVideos;
	}

	async resetState(selectedVideo) {
		let data = await this.props.firebase.dbRead('videos', snap => snap.val());

		let selectedVideos = this.loadSelectedVideos(data);

		console.log(selectedVideos)

		let reconciledVideos = this.reconcileVideos(this.state.videosList, selectedVideos);
		if (selectedVideo) {
			this.setState({
				videosList: [...reconciledVideos, selectedVideo],
				selectedVideos: selectedVideos
			});
		} else {
			this.setState({
				videosList: reconciledVideos,
				selectedVideos: selectedVideos
			});
		}
	}

	async handleSelect(id, e) {
		e.preventDefault();
		let selectedVideo;

		for (let video of this.state.videosList) {
			if (video.id === id) {
				selectedVideo = {
					id: id,
					title: video.title,
					thumbnail: video.thumbnail,
				}
			}
		}

		await this.props.firebase.dbCreate('videos', selectedVideo)

		this.resetState(null);
	}

	async handleDelete(fbId, e) {
		e.preventDefault();
		let selectedVideo;
		let selectedVideos = this.state.selectedVideos;

		for (let video of selectedVideos) {
			if (video.fbId === fbId) {
				selectedVideo = {
					id: video.id,
					title: video.title,
					thumbnail: video.thumbnail,
				}
			}
		}

		await this.props.firebase.dbDelete(`videos/${fbId}`)

		this.resetState(selectedVideo);
	}



	render() {
		const vidList = this.state.videosList;
		const selectedVideos = this.state.selectedVideos;

		const selectableList = vidList.map(video => {
			return (
				<div className="selectable-videos__video" key={video.id}>
					<p>{video.title}</p>
					<img src={video.thumbnail} alt="video thumbnail" onClick={this.handleSelect.bind(this, video.id)} />
				</div>
			)
		});
		const selectedList = selectedVideos.map(video => {
			if (selectedVideos.length >= 1) {
				return (
					<div className="selected-videos__video" key={video.id}>
						<p>{video.title}</p>
						<img src={video.thumbnail} alt="video thumbnail" onClick={this.handleDelete.bind(this, video.fbId)} />
					</div>
				)
			} else { return [] };
		});


		return (
			<div className="youtube-div">
				<h3>Selectable Videos</h3>
				<div className="selectable-videos">
					{selectableList}
				</div>
				<h3>Selected Videos</h3>
				<div className="selected-videos">
					{selectedList}
				</div>
			</div>
		);
	}
}



export default withFirebase(ManageYoutube);
