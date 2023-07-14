import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { isValidField } from "../store/utils.jsx";

import starWarsImg from "../../img/star-wars-placeholder.jpg";

export const CharactersDetails = ({ id }) => {
    const { actions } = useContext(Context);
    const [characterData, setCharacterData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.getCharacterData(id);
            setCharacterData(data);
        };

        fetchData();
    }, []);


    if (!characterData) {
        return null;
    }

    return (
        <div className="card m-3 rounded-3" style={{ width: "18rem" }}>
            <img src={starWarsImg} className="card-img-top" alt="Star Wars" />
            <div className="card-body p-0 border-0">
                <ul className="list-group bg-dark border-0">
                    <li className="bg-dark rounded-3 list-group-item text-warning fs-3">
                        {characterData.id} - {characterData.name}
                    </li>
                    {isValidField(characterData.gender) && (
                        <li className="list-group-item border-0">
                            <span>Gender: </span>
                            {characterData.gender}
                        </li>
                    )}
                    {isValidField(characterData.eye_color) && (
                        <li className="list-group-item border-0">
                            <span>Eye color: </span>
                            {characterData.eye_color}
                        </li>
                    )}
                    {isValidField(characterData.hair_color) && (
                        <li className="list-group-item border-0">
                            <span>Hair color: </span>
                            {characterData.hair_color}
                        </li>
                    )}
                </ul>
            </div>
            <div className="border-0 d-flex justify-content-between">
                <Link to={`/cardInfo/${id}`}>
                    <button type="button" className="m-3 btn btn-outline-primary">
                        Learn more!
                    </button>
                </Link>
                <Link to="/">
                    <button
                        onClick={() => actions.addToFavorites(characterData)}
                        type="button"
                        className="m-3 btn btn-outline-warning"
                    >
                        <i className="fa fa-solid fa-heart"></i>
                    </button>
                </Link>
            </div>
        </div>
    );
};


