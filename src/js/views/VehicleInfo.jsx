import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { isValidField } from "../store/utils.jsx";

import starWarsImg from "../../img/star-wars-placeholder.jpg";

export const VehicleInfo = () => {
    const { actions } = useContext(Context);
    const [vehicleData, setVehicleData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.getVehicleData(id);
            setVehicleData(data);
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
                            {vehicleData ? (
                                <>
                                    <h5 className="card-title">{vehicleData.name}</h5>
                                    {isValidField(vehicleData.description) ? (
                                        <p className="card-text">{vehicleData.description}</p>
                                    ) : (
                                        <p className="card-text">
                                            <small className="text-muted">No description available</small>
                                        </p>
                                    )}

                                    {Object.entries(vehicleData).map(([key, value]) => {
                                        if (key !== "name" && key !== "description") {
                                            return (
                                                <p key={key} className="card-text">
                                                    <strong>{key}: </strong>
                                                    {value}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </>
                            ) : (
                                <p>Loading vehicle data...</p>
                            )}
                        </div>
                    </div>
                    <Link to="/">
                        <button type="button" className="btn btn-link">
                            Back to Contact List
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
