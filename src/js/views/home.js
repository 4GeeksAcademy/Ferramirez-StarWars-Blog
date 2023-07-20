import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css"

import { CharactersList } from "../component/CharactersList.jsx";
import { PlanetsList } from "../component/PlanetsList.jsx";
import { VehiclesList } from "../component/VehiclesList.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		getCharacterList();
	}, []);

	const getCharacterList = () => {
		actions.getCharacters();
	}

	useEffect(() => {
		getPlanetsList();
	}, []);

	const getPlanetsList = () => {
		actions.getPlanets();
	}

	useEffect(() => {
		getVehicleList();
	}, []);

	const getVehicleList = () => {
		actions.getVehicles();
	}

	return (

		<div className="container-fuid mt-3">
			<div className="container my-2 horizontal-scrollable">
				<h2 className="font-weight-light text-light">Characters</h2>
				<div className="row flex-row flex-nowrap ">
					{
						store.characterList.map((character) => (
							<CharactersList key={character.uid} id={character.uid} name={character.name} />
						))
					}

				</div>
			</div>
			{/* <div className="container my-2 horizontal-scrollable">
				<h2 className="font-weight-light text-danger">Planets</h2>
				<div className="row flex-row flex-nowrap ">
					{
						store.planetsList.map((planet) => (
							<PlanetsList key={planet.uid} id={planet.uid} name={planet.name} />
						))
					}

				</div>
			</div>
			<div className="container my-2 horizontal-scrollable">
				<h2 className="font-weight-light text-danger">Vehicles</h2>
				<div className="row flex-row flex-nowrap ">

					{
						store.vehiclesList.map((vehicle) => (
							<VehiclesList key={vehicle.uid} id={vehicle.uid} name={vehicle.name} />
						))
					}


				</div>
			</div> */}
		</div>

	);
};
