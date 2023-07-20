import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Image from "../../img/StormTrooperBg.jpg";
import starWarsImg from "../../img/star-wars-placeholder.jpg";

export const Signup = () => {
    const { actions } = useContext(Context);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createUser(userData);
        navigate("/login");
    };

    return (
        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 text-black">
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                                <h3 className="fw-normal mb-3 pb-3 text-warning text-uppercase" style={{ letterSpacing: "15px" }}>
                                    Create an account
                                </h3>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example1cg"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Your Name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3cg"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="Your Email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="form3Example4cg"
                                        name="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        value={userData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                    <label className="form-check-label text-light" htmlFor="showPassword">
                                        Show Password
                                    </label>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-outline-warning btn-lg btn-block">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-flex align-items-center">
                        <img
                            src={starWarsImg}
                            alt="Login image"
                            className="w-100"
                            style={{ maxHeight: "100vh", objectFit: "cover", objectPosition: "center" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
