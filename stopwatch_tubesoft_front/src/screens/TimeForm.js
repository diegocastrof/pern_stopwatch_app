import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { withFormik, Field, Form, getIn } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../components/FormikInput';
import TimeSelector from '../components/TimeSelector';

const TimeForm = (props) => {
	const [isDisabled, setIsDisabled] = useState(true);
	const { action, errors, setFieldValue, touched } = props;

	const btnMessage = action === 'new' ? 'Register Time' : 'Save';

	return (
		<Form>
			<Row>
				<Col md={12}>
					<Field name="time[title]">
						{({ field }) => (
							<FormikInput
								{...field}
								abbr
								label="Title"
								error={getIn(errors, field.name)}
								touched={getIn(touched, field.name)}
							/>
						)}
					</Field>
				</Col>
				<Col md={12}>
					<Field name="time[description]">
						{({ field }) => (
							<FormikInput
								{...field}
								label="Description"
								error={getIn(errors, field.name)}
								touched={getIn(touched, field.name)}
							/>
						)}
					</Field>
				</Col>
				<Col md={12}>
					<Field name="time[time]">
						{({ field }) => (
							<FormikInput
								{...field}
								abbr
								label="Time"
								error={getIn(errors, field.name)}
								touched={getIn(touched, field.name)}
							/>
						)}
					</Field>
				</Col>
				<Col className="mx-auto" md={6}>
					<TimeSelector
						setFieldValue={setFieldValue}
						setIsDisabled={setIsDisabled}
					/>
				</Col>
			</Row>
			<Row className="d-flex justify-content-end mb-3">
				<Col md={2}>
					<Button disabled={isDisabled} type="submit" variant="secondary" block>
						{btnMessage}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

const setInitialValues = (props) => {
	const { time } = props;
	return { time };
};

const validationSchema = Yup.object().shape({
	time: Yup.object().shape({
		title: Yup.string().required('Please add a title'),
		businessActivity: Yup.string().nullable(),
		time: Yup.string().required('Please add a time'),
	}),
});

const handleSubmit = (values, { props }) => {
	const { formRequest } = props;
	formRequest(values);
};

export default withFormik({
	mapPropsToValues: setInitialValues,
	validationSchema,
	handleSubmit,
	enableReinitialize: true,
	validateOnMount: (props) => props.action !== 'new',
})(TimeForm);
