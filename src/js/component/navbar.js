import React from "react";
import { Link } from "react-router-dom";

import logInIcon from "../../img/logIn.png";

import starWarsLogo from "../../img/star-wars-logo1.png";

export const Navbar = () => {

	return (
		<div>
			<nav className="navbar navbar-expand-md navbar-dark shadow-5-strong">
				<div className="container-fluid">
					<div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"></div>
					<div className="mx-auto mt-2 order-0">
						{/* Logo */}
						<Link className="navbar-brand" to="/">
							<img src={starWarsLogo} className="p-0 ps-2" alt="Star Wars Logo" width="120" height="50" />
						</Link>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
							<span className="navbar-toggler-icon"></span>
						</button>
					</div>
					<div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
						<ul className="navbar-nav ms-auto me-4">
							<li className="nav-item">
								<Link to={"/login"}>
									<button className="btn btn-outline-warning btn-lg btn-block">
										<img src={logInIcon} alt="Log In" className="mb-1" style={{ width: "20px", height: "20px", marginRight: "5px" }} />
										Log In
									</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};
