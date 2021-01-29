import React from 'react';

import '../media/media.css';


const Item = props => {
	const className = `item level${props.level}`;
	const iframeSize = `level ${props.level}`;
	console.log(props.id)
	return (
		<div className={className}>
			<h4>{props.title}</h4>
			<iframe
				title="youtube video"
				className={iframeSize}
				src={`https://www.youtube.com/embed/${props.id}`}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen={true}>
			</iframe>
		</div>
	)
}

export default Item;