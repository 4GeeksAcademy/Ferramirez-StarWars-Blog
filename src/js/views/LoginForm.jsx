import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import starWarsImg from "../../img/star-wars-placeholder.jpg";

export const LogIn = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar la contraseña
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            await actions.login({ email, password });
            setError(""); // Clear any previous errors on successful login.
            navigate("/private");
        } catch (error) {
            setError("Error logging in. Please check your credentials and try again.");
        }
    };

    return (
        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 text-black">
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <form style={{ width: "23rem" }}>
                                <h3 className="fw-normal mb-3 pb-3 text-warning text-uppercase" style={{ letterSpacing: "15px" }}>Log in</h3>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form2Example18"
                                        className="form-control form-control-lg"
                                        placeholder="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado showPassword
                                        id="form2Example28"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {error && <p className="text-danger">{error}</p>}

                                <div className="form-check mb-4"> {/* Agrega un checkbox para mostrar/ocultar la contraseña */}
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="showPasswordCheckbox"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                    <label className="form-check-label text-light" htmlFor="showPasswordCheckbox">
                                        Show Password
                                    </label>
                                </div>

                                <div className="pt-1 mb-4">
                                    <button className="btn btn-outline-warning btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                                </div>

                                <p className="text-light">Don't have an account? <Link to={"/signup/"} className="link-info">
                                    Register Here
                                </Link></p>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-flex align-items-center"> {/* Added 'd-flex align-items-center' */}
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
