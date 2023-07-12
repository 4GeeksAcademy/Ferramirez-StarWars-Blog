import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css"

import { CharactersDetails } from "../component/CharactersList.jsx";
import { PlanetsList } from "../component/PlanetsList.jsx";


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

	return (

		<div className="container-fuid mt-3">
			<div className="container my-2 horizontal-scrollable">
				<h2 className="font-weight-light text-danger">Characters</h2>
				<div className="row flex-row flex-nowrap ">
					{
						store.characterList.map((character) => (
							<CharactersDetails key={character.uid} id={character.uid} name={character.name} />
						))
					}

				</div>
			</div>
			<div className="container my-2 horizontal-scrollable">
				<h2 className="font-weight-light text-danger">Planets</h2>
				<div className="row flex-row flex-nowrap ">
					{
						store.planetsList.map((planet) => (
							<PlanetsList key={planet.uid} id={planet.uid} name={planet.name} />
						))
					}

				</div>
			</div>
			{/* <div className="container my-2 horizontal-scrollable">
				<h2 className="font-weight-light text-danger">Vehicles</h2>
				<div className="row flex-row flex-nowrap ">
					{
						store.characterList.map((character) => (
							<CharactersDetails key={character.uid} id={character.uid} name={character.name} />
						))
					}

				</div>
			</div> */}
		</div>

	);
};
