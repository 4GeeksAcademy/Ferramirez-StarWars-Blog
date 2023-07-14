import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { isValidField } from "../store/utils.jsx";

import starWarsImg from "../../img/star-wars-placeholder.jpg";

export const PlanetsList = ({ id }) => {
    const { actions } = useContext(Context);
    const [planetData, setPlanetData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.getPlanetData(id);
            setPlanetData(data);
        };

        fetchData();
    }, []);

    return (
        <div className="card m-3 rounded-3" style={{ width: "18rem" }}>
            <img src={starWarsImg} className="card-img-top" alt="Star Wars" />
            <div className="card-body p-0 border-0">
                <ul className="list-group bg-dark border-0">
                    <li className="bg-dark rounded-3 list-group-item text-warning fs-3">
                        {planetData.id} - {planetData.name}
                    </li>
                    {isValidField(planetData.population) && (
                        <li className="list-group-item border-0">
                            <span>Population: </span>
                            {planetData.population}
                        </li>
                    )}
                </ul>
            </div>
            <div className="border-0 d-flex justify-content-between">
                <Link to={`/planetInfo/${id}`}>
                    <button type="button" className="m-3 btn btn-outline-primary">
                        Learn more!
                    </button>
                </Link>
                <Link to="/">
                    <button
                        onClick={() => actions.addToFavorites(planetData)}
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