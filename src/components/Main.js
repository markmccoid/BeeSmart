import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Import Components
import Navbar from './Navbar';
import MainDisplay from './MainDisplay';

const Main = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/settings" render={()=> <div>Future Home of Settings</div>} />
				<Route path="/" component={MainDisplay} />
			</Switch>
		</div>
	);
};

export default Main;
