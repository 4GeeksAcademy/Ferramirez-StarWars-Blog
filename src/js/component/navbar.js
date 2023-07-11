import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import starWarsLogo from "../../img/star-wars.jpg"

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		// Recuperar los favoritos almacenados localmente al cargar la página
		const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
		actions.setFavorites(favorites);
	}, []);

	const handleRemoveFromFavorites = (character) => {
		actions.removeFromFavorites(character);
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-3">
			<Link className="navbar-brand" to="/">
				<img src={starWarsLogo} alt="" width="80" height="60" />
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						id="dropdownMenuButton1"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
						{store.favorites.map((favorite, index) => (
							<li key={index}>
								<a className="dropdown-item" href="#">
									{favorite.name}<button type="button" className="m-3 btn btn-outline-danger" onClick={() => handleRemoveFromFavorites(favorite)}><i className="fa fa-solid fa-trash"></i></button>
								</a>	
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
