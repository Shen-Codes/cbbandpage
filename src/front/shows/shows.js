import React, { Component } from 'react';
import FrontNav from '../components/nav.js';
import { withFirebase } from '../../components/Firebase';
import ShowDate from '../components/showdate.js';
import SocialMediaFooter from '../components/footer.js';
import './shows.css';


class Shows extends Component {
	state = {
		schedule: []
	};

	async componentDidMount() {
		const loadShowsList = snap => {
			let shows = snap.val();
			let newShowsList = [];

			for (let show in shows) {
				let showDate = new Date(shows[show].date);
				newShowsList.push({
					id: show,
					date: showDate,
					venue: shows[show].venue,
					address: shows[show].address,
				});
			}
			this.setState({
				schedule: newShowsList
			});
		}

		const data = await this.props.firebase.dbRead('shows', snap => snap.val());

		loadShowsList(data);
	};


	render() {
		const schedule = this.state.schedule;
		const tableData = schedule.map(show => {
			return (
				<tr className="showdates-table__row" key={show.date}>
					<ShowDate showtime={show.date} />
					<td>{show.venue}</td>
					<td>{show.address}</td>
				</tr>
			)
		});

		return (
			<div>
				<header><FrontNav /></header>
				<div className="showdates">
					<h1 className="showdates__title">Upcoming Shows</h1>
					<div className="showdates-table">
						<table className="showdates-table__table">
							<tbody className="showdates-table__body">
								<tr className="showdates-table__label">
									<th className="showdates-table__labels">Date and Time</th>
									<th className="showdates-table__labels">Venue</th>
									<th className="showdates-table__labels">Address</th>
								</tr>
								{tableData}
							</tbody>
						</table>
					</div>
				</div>
				<SocialMediaFooter />
			</div>
		);
	}
}

export default withFirebase(Shows);