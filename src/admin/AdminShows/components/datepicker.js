import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePick = props => {
	return (
		<DatePicker
			todayButton="Today"
			selected={props.selected}
			onChange={props.onChange}
			showTimeSelect
			timeFormat="HH:mm"
			timeIntervals={15}
			timeCaption="time"
			dateFormat="MMMM d, yyyy h:mm aa"
		/>
	);
}

export default DatePick;