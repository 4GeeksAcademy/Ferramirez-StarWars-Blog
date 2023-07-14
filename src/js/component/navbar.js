import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";

import starWarsLogo from "../../img/star-wars-logo2.png"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [showModal, setShowModal] = useState(false);

	const handleRemoveFavorite = name => {
		actions.removeFromFavorites(name);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleShowModal = () => {
		setShowModal(true);
	};

	return (
		<nav className="navbar navbar-dark bg-black ps-4 pe-3">
			{/* Logo */}
			<Link className="" to="/">
				<img src={starWarsLogo} className="p-0 ps-2" alt="Star Wars Logo" width="120" height="50" />
			</Link>



			<div className="btn-group">
				{/* Modal button */}
				<button onClick={() => handleShowModal()} type="button" className=" m-2 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
					Login In
				</button>
				{/* Favoritos button */}
				<button className="btn btn-outline-warning dropdown-toggle m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
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
								{
									store.favorites.map(item => (
										<li className="nav-item d-flex justify-content-between" key={`${item.id}-${item.uid}`}>
											<Link>{item.name}</Link>
											<button
												className="btn text-danger btn-sm ms-2"
												onClick={() => handleRemoveFavorite(item.name)}
											>
												<i className="fa fa-solid fa-trash"></i>
											</button>
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Modal Login In */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Log in</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-md-6">
							<h3>Login Form 1</h3>

							<div className="form-group">
								<input type="text" className="form-control" placeholder="Your Email *" value="" />
							</div>
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Your Password *" value="" />
							</div>
							<div className="form-group">
								<a href="#" className="btnForgetPwd">Forget Password?</a>
							</div>

						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						Cancel
					</Button>
					<Button variant="success">
						Log in
					</Button>
				</Modal.Footer>
			</Modal>
		</nav>
	);
};

