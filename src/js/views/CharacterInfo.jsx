import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { isValidField } from "../store/utils.jsx";

import starWarsImg from "../../img/star-wars-placeholder.jpg";


export const CardInfo = () => {
    const { actions } = useContext(Context);
    const [characterData, setCharacterData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.getCharacterData(id);
            setCharacterData(data);
        };

        fetchData();
    }, [actions, id]);

    return (
        <div className="container">
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={starWarsImg} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            {characterData ? (
                                <>
                                    <h5 className="card-title">{characterData.name}</h5>
                                    {isValidField(characterData.description) ? (
                                        <p className="card-text">{characterData.description}</p>
                                    ) : (
                                        <p className="card-text"><small className="text-muted">No description available</small></p>
                                    )}
                                </>
                            ) : (
                                <p>Loading character data...</p>
                            )}
                        </div>
                    </div>
                    <Link to="/">
                        <button type="button" className="btn btn-link">Back to Contact List</button>
                    </Link>
                </div>
            </div>
        </div>
    );

};
