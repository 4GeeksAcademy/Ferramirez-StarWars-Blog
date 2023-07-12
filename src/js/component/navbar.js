import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import starWarsLogo from "../../img/star-wars-logo2.png"

export const Navbar = () => {
	// Contexto y acciones

	return (
		<nav className="navbar navbar-dark bg-black ps-4 pe-3">
			{/* Logo */}
			<Link className="" to="/">
				<img src={starWarsLogo} className="p-0 ps-2" alt="" width="120" height="50" />
			</Link>

			{/* Favoritos */}
			<div className="btn-group">
				<button className="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
					<span className="fa fa-solid fa-heart"></span>
				</button>

				{/* Panel de favoritos */}
				<div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Favorites</h5>
						<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						<div className="d-flex">
							<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
								<li className="nav-item">
									Something
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

