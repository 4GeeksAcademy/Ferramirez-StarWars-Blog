import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import Image from "../img/StormTrooperBg.jpg";

import { Home } from "./views/home";
import injectContext from "./store/appContext";

import { CardInfo } from "./views/CardInfo.jsx";
import { PlanetInfo } from "./views/PlanetInfo.jsx";
import { VehicleInfo } from "./views/VehicleInfo.jsx";

import { Signup } from "./views/SignUp.jsx";
import { LogIn } from "./views/LoginForm.jsx"
import { PrivatePage } from "./views/PrivatePage.jsx"

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

// create your first component
const Layout = () => {
	const basename = process.env.BASENAME || "";


	return (
		<div
			style={{
				backgroundImage: `url(${Image})`, backgroundSize: "cover", // Ajustar para que la imagen cubra todo el contenedor
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center", // Centrar la imagen vertical y horizontalmente
			}}
		>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cardInfo/:id" element={<CardInfo />} />
						<Route path="/planetInfo/:id" element={<PlanetInfo />} />
						<Route path="/login/" element={<LogIn />} />
						<Route path="/signup/" element={<Signup />} />
						<Route path="/private/" element={<PrivatePage />} />
						<Route path="/vehicleInfo/:id" element={<VehicleInfo />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
