import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TimeIndex from './screens/TimeIndex';
import TimeNew from './screens/TimeNew';

class App extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={TimeIndex} />
				<Route path="/new_time" component={TimeNew} />
			</div>
		);
	}
}

export default App;
