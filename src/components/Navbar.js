import React from 'react';
import { NavLink } from 'react-router-dom';

var Navbar = (props) => {
	return (
	  <header className="header-container">
			<div className="head-col1-container">
	        <div className="header-image">
	          <img src="./images/bee.png" />
						<h4>Bee Smart</h4>
	        </div>

					{
	        // <div className="header-search">
	        //   <input type="text" name="search" id="search" />
	        // </div>
					}
	    </div>

			<div className="head-col2-container">
				<ul className="header-menu header-menu-left">
					<li>
						<NavLink exact to="/" activeClassName="active">Home</NavLink>
					</li>
		      <li>
						<NavLink to="/settings" activeClassName="active">Settings</NavLink>
					</li>
				</ul>

				<ul className="header-menu header-menu-right">
					<li><a href="#" ></a></li>

				</ul>
	    </div>
	  </header>
	);
};

// Navbar.propTypes = {
// 	onLogout: React.PropTypes.func,
// 	isLoggedIn: React.PropTypes.bool
// };

export default Navbar;
