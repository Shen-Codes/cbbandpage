import React, { Component } from 'react';
import './adminshows.css';
import { withAuthorization } from '../../components/Session/index.js';
import 'firebase/database';

import AdminNav from '../components/adminnav.js';
import DatePick from './components/datepicker.js';


class AdminShows extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showDate: {
				id: '',
				date: new Date(),
				venue: '',
				address: '',
				edit: false
			},
			showsList: [],
			deletedShows: [],
			edit: true,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.loadState = this.loadState.bind(this);
	}

	componentDidMount() {
		const result = this.loadState();

		result.then((val) => this.setState({
			...this.state,
			showsList: val
		}));
	}

	async loadState() {
		const loadShowsList = snap => {
			let shows = snap.val();
			let newShowsList = [];
			for (let show in shows) {
				let showDate = shows[show].date;
				let showDateAgain = new Date(showDate);
				newShowsList.push({
					id: show,
					date: showDateAgain,
					venue: shows[show].venue,
					address: shows[show].address,
					edit: shows[show].edit
				});
			}
			return newShowsList;
		}

		const data = await this.props.firebase.dbRead('shows', snap => snap.val());
		const shows = loadShowsList(data);

		return shows;
	}


	async handleSubmit(e) {
		e.preventDefault();
		let { id, date, venue, address, edit } = this.state.showDate;
		date = date.toString();
		const initialShowdate = {
			id: '',
			date: new Date(),
			venue: '',
			address: '',
			edit: false
		};

		await this.props.firebase.dbCreate('shows', { id, date, venue, address, edit });

		const result = this.loadState();

		result.then(val => this.setState({
			...this.state,
			showDate: initialShowdate,
			showsList: val
		}));
	}


	async handleSaveEdit(id, e) {
		e.preventDefault();

		const [show] = this.state.showsList.filter(show => show.id === id);
		show.edit = false;

		await this.props.firebase.dbUpdate(`shows/${id}`, show);
		const result = this.loadState();

		result.then(val => this.setState({
			...this.state,
			showsList: val
		}));
	}


	async handleDelete(id, e) {
		e.preventDefault();

		await this.props.firebase.dbDelete(`shows/${id}`)
		const result = this.loadState();

		result.then(val => this.setState({
			...this.state,
			showsList: val
		}));
	}

	handleChange = e => {
		e.preventDefault();

		this.setState({
			...this.state,
			showDate: {
				...this.state.showDate,
				[e.target.name]: e.target.value,
			}
		});
	}


	toggleEdit = (id, e) => {
		e.preventDefault();

		this.setState(state => {
			const showsList = state.showsList.map(show => {
				if (show.id === id && !show.edit) {
					return show = { ...show, edit: true };
				} else {
					return show = { ...show, edit: false };
				}
			});

			return {
				...state,
				showsList
			};
		});
	}

	handleEdit = (id, date, e) => {
		e.persist();

		this.setState(state => {
			const showsList = state.showsList.map(show => {
				if (show.id === id) {
					return show = { ...show, [e.target.name]: e.target.value };
				} else {
					return show;
				}
			});

			return {
				...state,
				showsList
			};
		});
	}

	handleEditDate = (id, date, e) => {
		this.setState(state => {
			const showsList = state.showsList.map(show => {
				if (show.id === id) {
					console.log(show)
					return show = { ...show, date: date };
				} else {
					return show;
				}
			});

			return {
				...state,
				showsList
			};
		});

	}

	handleDateChange(date) {

		this.setState(state => {
			const showDate = {
				...state.showDate,
				date: date
			};
			return {
				...state,
				showDate
			};
		});

	}

	render() {
		const shows = this.state.showsList;
		const showsList = shows.map(show => {
			if (show.edit) {
				return (
					<li key={show.id}>
						<form onSubmit={this.handleSaveEdit.bind(this, show.id)}>
							<DatePick selected={show.date} onChange={this.handleEditDate.bind(this, show.id)}
							/>
							<input
								type="text"
								name="venue"
								value={show.venue || ''}
								onChange={this.handleEdit.bind(this, show.id, show.date)}
							/>
							<input
								type="text"
								name="address"
								value={show.address || ''}
								onChange={this.handleEdit.bind(this, show.id, show.date)}
							/>
							<button onClick={this.handleSaveEdit.bind(this, show.id)}>Save</button>
							<button onClick={this.toggleEdit.bind(this, show.id)}>Cancel Edit</button>
							<button onClick={this.handleDelete.bind(this, show.id)}>Delete</button>
						</form>
					</li>
				)
			} else {
				let showDate = new Date(show.date).toString();
				return (
					<li className="shows-list__list-item" key={show.id}>
						<p className="shows-list__list-item--showdate">{showDate}</p>
						<p className="shows-list__list-item--venue">{show.venue}</p>
						<p className="shows-list__list-item--address">{show.address}</p>
						<button onClick={this.toggleEdit.bind(this, show.id)}>Edit</button>
						<button onClick={this.handleDelete.bind(this, show.id)}>Delete</button>
					</li>
				)
			}
		});

		return (
			<div>
				<header><AdminNav /></header>
				<h3 className="showdates-header">Enter Show Details</h3>
				<div className="venue-input">
					<form className="venue-input__form">
						<DatePick selected={this.state.showDate.date} onChange={this.handleDateChange} />
						<input
							type="text"
							placeholder="type in venue name"
							name="venue"
							value={this.state.showDate.venue || ''}
							onChange={this.handleChange}
						/>
						<input
							type="text"
							placeholder="type in venue address"
							name="address"
							value={this.state.showDate.address || ''}
							onChange={this.handleChange}
						/>
						<button
							onClick={this.handleSubmit}
							type="submit"
							waves="light"
						>
							Submit
						</button>
					</form>
				</div>
				<h3>List of shows</h3>
				<div className="shows-list">
					<ul>{showsList}</ul>
				</div>
			</div>
		);
	}
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminShows);