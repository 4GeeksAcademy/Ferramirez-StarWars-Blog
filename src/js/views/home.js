import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css"

import CharacterCard from "../component/CharacterCard.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		getCharacterList();
	}, []);

	const getCharacterList = () => {
		actions.getCharacters();
	}

	return (

		<div className="container my-2 horizontal-scrollable">
			<h2 className="font-weight-light text-danger pb-3">Characters</h2>
			<div className="row flex-row flex-nowrap ">
				{
					store.characterList.map((character) => (
						<CharacterCard key={character.uid} id={character.uid} name={character.name} />
					))
				}

			</div>
		</div>


	);
};
