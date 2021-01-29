import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';

import FrontNav from '../components/nav.js';
import { withFirebase } from '../../components/Firebase';
import Loader from '../../components/loader';

import SocialMedialFooter from '../components/footer';
import './media.css';



class FrontMedia extends Component {
	_isMounted = false;

	constructor(props) {
		super(props)
		this.state = {
			videoIds: [],
			playlist: '',
			active: 0,
			direction: ''
		}
	}

	async componentDidMount() {
		this._isMounted = true;

		let videoResponse;
		let videos = [];
		let musicResponse;
		let music;
		await this.props.firebase.dbRead('videos', snap => videoResponse = snap.val());
		await this.props.firebase.dbRead('playlist', snap => musicResponse = snap.val())

		if (videoResponse) {
			for (let video in videoResponse) {
				videos.push({
					id: videoResponse[video].id,
					title: videoResponse[video].title,
				});
			}
		}

		if (musicResponse) {
			music = musicResponse[0].id;
		}

		if (this._isMounted) {
			this.setState({
				...this.state,
				videoIds: videos,
				playlist: music
			});
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.props.firebase.dbRead();
	}


	render() {
		const videos = this.state.videoIds;
		const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;
		const YoutubeSlide = ({ url, isSelected }) => (
			<ReactPlayer width="100%" url={url} playing={isSelected} />
		);
		const carouselVideos = videos.map(video => {
			return (
				<YoutubeSlide key={video.id} url={`https://www.youtube.com/embed/${video.id}`} />
			)
		});


		if (!this._isMounted) {
			return (<Loader />)
		} else {
			return (
				<div>
					<header><FrontNav /></header>
					<div className="youtube-carousel" >
						<Carousel renderItem={customRenderItem} className="carousel">
							{carouselVideos}
						</Carousel>
						<a href="https://www.youtube.com">Watch on Youtube</a>

					</div>
					<div className="spotify-play-button" >
						<iframe
							title="spotify widget"
							src={`https://open.spotify.com/embed/playlist/${this.state.playlist}`}
							frameBorder="0"
							allow="encrypted-media"
						/>
						<a href="https://www.spotify.com">Listen on Spotify</a>
					</div>
					<SocialMedialFooter />
				</div>
			);
		}
	}
}

export default withFirebase(FrontMedia);