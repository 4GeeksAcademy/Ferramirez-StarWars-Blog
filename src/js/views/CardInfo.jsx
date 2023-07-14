import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { isValidField } from "../store/utils.jsx";

import starWarsImg from "../../img/star-wars-placeholder.jpg";


export const CardInfo = () => {
    const { actions } = useContext(Context);
    const [itemData, setItemData] = useState(null);
    const { type, name } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let data;

            if (type === "characters") {
                data = await actions.getCharacterData(name);
            } else if (type === "planets") {
                data = await actions.getPlanetData(name);
            } else if (type === "vehicles") {
                data = await actions.getVehicleData(name);
            }
            setItemData(data);
        };

        fetchData();
    }, [type, name]);

    return (
        <div className="container">
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={starWarsImg} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            {itemData ? (
                                <>
                                    <h5 className="card-title">{itemData.name}</h5>
                                    {isValidField(itemData.description) ? (
                                        <p className="card-text">{itemData.description}</p>
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
