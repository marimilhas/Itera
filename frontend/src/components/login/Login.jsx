import React, { useState, useEffect } from "react";
import "./Login.css"; 
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const navigate = useNavigate();
    const { componentFrom } = useParams();

    const navigateToComponent = () => {
        navigate(`/${componentFrom}`);
    };

    const handleIngresar = async () => {
        AuthService.login(usuario, clave, navigateToComponent);
    };

    useEffect(() => {
        AuthService.logout();
    });

    return (
        <>
            <div className="divbody text-center">
                <main className="form-signin m-auto">
                    <form className="p-5" style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                        <img
                            src="/coding.png"
                            alt=""
                            width="50px"
                        />

                        <h1 className="h4 mb-3"
                            style={{ color: "#00aeff", fontWeight: 700 }}>
                            Iniciar Sesión
                        </h1>

                        <div className="form-floating">
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="usuario"
                                onChange={(e) => setUsuario(e.target.value)}
                                value={usuario}

                                className="form-control"
                                id="usuario"
                            />
                            <label className="custom-control" htmlFor="usuario">
                                Usuario
                            </label>
                        </div>

                        <div className="form-floating mt-1">
                            <input
                                type="password"
                                autoComplete="off"
                                placeholder="Clave"
                                onChange={(e) => setClave(e.target.value)}
                                value={clave}
                                className="form-control"
                                id="clave"

                            />
                            <label className="custom-control" htmlFor="clave">
                                Clave
                            </label>
                        </div>

                        <button
                            className="w-100 btn btn-lg"
                            type="button"
                            style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600 }}
                            onClick={(e) => handleIngresar()}>
                            Ingresar
                        </button>
                    </form>
                </main>
            </div>

        </>
    );
}
export { Login };
