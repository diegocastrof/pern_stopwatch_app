import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

import TimeShow from './TimeShow';
import api from '../api';

const TimeList = () => {
	const [times, setTimes] = useState([]);
	const [moreData, setMoreData] = useState(false);

	const fetchTimes = () => {
		try {
			api.times.fetchAll().then((response) => setTimes(response.data.times));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(fetchTimes, [moreData]);

	return (
		<>
			<Row className="mt-4">
				<Col>
					<ListGroup>
						<ListGroup.Item className="list-group-item-primary">
							<TimeShow
								time={{
									title: 'Title',
									description: 'Description',
									time: 'Time Registered',
								}}
								addedClass={'font-weight-bold'}
							/>
						</ListGroup.Item>
						{times.map((time) => (
							<ListGroup.Item
								key={time.id}
								className={time.id % 2 === 0 ? '' : 'list-group-item-light'}
							>
								<TimeShow time={time} setMoreData={setMoreData} />
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default TimeList;
