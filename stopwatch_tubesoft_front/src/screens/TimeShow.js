import React from 'react';
import api from '../api';

const TimeShow = ({ time, addedClass, setMoreData }) => {
	const { id, title, description, time: registeredTime } = time;

	const handleDelete = () => {
		const deleteConfirmation = window.confirm(
			'Are you sure to delete this item?'
		);
		if (deleteConfirmation) {
			try {
				api.times.delete(id).then(() => {
					setMoreData((m) => !m);
				});
			} catch (error) {
				alert('Ops, something happened. Try it again');
			}
		}
	};

	return (
		<div className={`d-flex ${addedClass}`}>
			<div className="w-25">{title}</div>
			<div className="w-50">{description}</div>
			<div className="w-25">
				<p>
					{registeredTime}
					{!addedClass && (
						<span
							onClick={handleDelete}
							className="btn btn-outline-danger btn-rounded float-right"
						>
							X
						</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default TimeShow;
