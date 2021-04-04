import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LinkBtn from '../components/LinkBtn';
import TimeList from './TimeList';

const TimeIndex = () => (
	<>
		<Row>
			<Col md={8} className="mx-auto">
				<Row className="mt-4">
					<Col md={10}>
						<h2 className="text-uppercase mb-4">Times Registered</h2>
					</Col>
					<Col md={2}>
						<LinkBtn variant="primary" block to="/new_time">
							Add New Time
						</LinkBtn>
					</Col>
				</Row>
				<Row>
					<Col>
						<TimeList />
					</Col>
				</Row>
			</Col>
		</Row>
	</>
);

export default TimeIndex;
