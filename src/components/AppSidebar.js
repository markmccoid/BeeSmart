import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import _ from 'lodash';

const AppSidebar = (props) => {
	return (
		<ul className="content-nav-menu">
			{
				_.map(props.wordListIndex, (data, key) => {
					return <li key={key}>
							<NavLink to={`/wordlist/${key}`}>{`${key} - ${data.numberOfWords}`}</NavLink>
						</li>
				})
			}
		</ul>
	)
};

AppSidebar.propType = {
	wordListIndex: PropTypes.object
};

export default AppSidebar;
