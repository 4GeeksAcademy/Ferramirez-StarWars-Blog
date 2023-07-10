import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import starWarsLogo from "../../img/star-wars.jpg"

const CharacterCard = ({ id }) => {
    const { actions } = useContext(Context);
    const [characterData, setCharacterData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.getCharacterData(id);
            setCharacterData(data);
        };

        fetchData();
    }, []);

    const addToFavorites = () => {
        actions.addToFavorites(characterData);
    };

    const isValidField = (field) => {
        return field && field !== "n/a";
    };

    return (
        characterData && (
            <div className="card m-3" style={{ width: '20rem' }}>
                <img src={starWarsLogo} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{characterData.name}</h5>
                    <ul className="list-group list-group-flush">
                        {isValidField(characterData.gender) && (
                            <li className="list-group-item">
                                <span>Gender: </span>
                                {characterData.gender}
                            </li>
                        )}
                        {isValidField(characterData.eye_color) && (
                            <li className="list-group-item">
                                <span>Eye color: </span>
                                {characterData.eye_color}
                            </li>
                        )}
                        {isValidField(characterData.hair_color) && (
                            <li className="list-group-item">
                                <span>Hair color: </span>
                                {characterData.hair_color}
                            </li>
                        )}
                    </ul>
                    <Link to={`/cardInfo/${id}`}>
                        <button type="button" className="m-3 btn btn-outline-primary">
                            Learn more!
                        </button>
                    </Link>
                    <Link to="/">
                        <button onClick={addToFavorites} type="button" className="m-3 btn btn-outline-warning">
                            Favorites <i className="fa fa-solid fa-heart"></i>
                        </button>
                    </Link>
                </div>
            </div>
        )
    );
};


export default CharacterCard;
