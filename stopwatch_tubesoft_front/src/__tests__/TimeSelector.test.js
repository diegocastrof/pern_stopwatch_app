import React from 'react';
import { shallow } from 'enzyme';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import TimeSelector from '../components/TimeSelector';

describe('Time Selector Component', () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(cleanup);

	// Component mounting test
	it('should render correctly', () => {
		const wrapper = shallow(
			<TimeSelector setFieldValue={() => {}} setIsDisabled={() => {}} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('timer should start at 00:00:00', () => {
		const { getByTestId } = render(
			<TimeSelector setFieldValue={() => {}} setIsDisabled={() => {}} />
		);
		expect(getByTestId('timer').textContent).toBe('00 : 00 : 00');
	});

	// DOM Show / hide elements test
	it('should hide start button & show pause button when running', () => {
		const { getByText, queryByText } = render(
			<TimeSelector setFieldValue={() => {}} setIsDisabled={() => {}} />
		);

		expect(queryByText('Pause')).toBeNull();

		fireEvent.click(getByText('Start'));
		expect(getByText('Pause')).toBeInTheDocument();
		expect(queryByText('Start')).toBeNull();

		fireEvent.click(getByText('Pause'));
		expect(getByText('Continue')).toBeInTheDocument();
		expect(queryByText('Pause')).toBeNull();
	});
	// Stopwatch functionality test
	it('should start timer on Start click event', () => {
		const { getByText, getByTestId } = render(
			<TimeSelector setFieldValue={() => {}} setIsDisabled={() => {}} />
		);

		fireEvent.click(getByText('Start'));
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		expect(getByTestId('timer').textContent).toBe('00 : 00 : 05');
	});

	it('should add times if there is a pause between timetakes', () => {
		const { getByText, getByTestId } = render(
			<TimeSelector setFieldValue={() => {}} setIsDisabled={() => {}} />
		);

		// 1st Timetake
		fireEvent.click(getByText('Start'));
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		fireEvent.click(getByText('Pause'));
		// 2nd Timetake
		fireEvent.click(getByText('Continue'));
		act(() => {
			jest.advanceTimersByTime(3000);
		});
		fireEvent.click(getByText('Pause'));

		expect(getByTestId('timer').textContent).toBe('00 : 00 : 08');
	});

	it('should should register when clock is paused after running', () => {
		const mockedSetFieldValue = jest.fn();
		const { getByText } = render(
			<TimeSelector
				setFieldValue={mockedSetFieldValue}
				setIsDisabled={() => {}}
			/>
		);

		fireEvent.click(getByText('Start'));
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		fireEvent.click(getByText('Pause'));
		expect(mockedSetFieldValue).toBeCalledWith('time[time]', '00 : 00 : 05');
	});

	it('should unregister time when Reset', () => {
		const mockedSetFieldValue = jest.fn();
		const { getByText, getByTestId } = render(
			<TimeSelector
				setFieldValue={mockedSetFieldValue}
				setIsDisabled={() => {}}
			/>
		);

		fireEvent.click(getByText('Start'));
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		fireEvent.click(getByText('Reset'));
		expect(getByTestId('timer').textContent).toBe('00 : 00 : 00');
		expect(mockedSetFieldValue).toBeCalledWith('time[time]', '');
	});

	it('should unregister time when Reset', () => {
		const mockedSetFieldValue = jest.fn();
		const { getByText, getByTestId } = render(
			<TimeSelector
				setFieldValue={mockedSetFieldValue}
				setIsDisabled={() => {}}
			/>
		);

		fireEvent.click(getByText('Start'));
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		fireEvent.click(getByText('Reset'));
		expect(getByTestId('timer').textContent).toBe('00 : 00 : 00');
		expect(mockedSetFieldValue).toBeCalledWith('time[time]', '');
	});

	it('should disable submit button when a time is registered', () => {
		const mockedSetIsDisabled = jest.fn();
		const { getByText } = render(
			<TimeSelector
				setFieldValue={() => {}}
				setIsDisabled={mockedSetIsDisabled}
			/>
		);

		fireEvent.click(getByText('Start'));
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		fireEvent.click(getByText('Pause'));
		expect(mockedSetIsDisabled).toBeCalledWith(false);
	});
});
