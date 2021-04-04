import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import LinkBtn from '../components/LinkBtn';
import TimeForm from './TimeForm';
import api from '../api';

const basicTime = {
	title: '',
	description: '',
	time: '',
};

const TimeNew = () => {
	const history = useHistory();

	const handleCreateRequest = (values) => {
		const { time } = values;
		try {
			api.times.create(time).then((response) => {
				alert('Time Registered!');
				history.push('/');
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Row>
				<Col md={8} className="mx-auto">
					<Row className="mt-4">
						<Col md={10}>
							<h2 className="text-uppercase mb-4">Register New Time</h2>
						</Col>
						<Col md={2}>
							<LinkBtn variant="primary" block to="/">
								Go Back
							</LinkBtn>
						</Col>
					</Row>
					<Row>
						<Col>
							<TimeForm
								action="new"
								time={basicTime}
								formRequest={handleCreateRequest}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default TimeNew;
