import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";

function Menu() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(
        AuthService.getUsuarioLogueado()
    );

    function CambioUsuarioLogueado(_usuarioLogueado) {
        setUsuarioLogueado(_usuarioLogueado);
    }

    useEffect(() => {
        AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
        return () => {
            AuthService.subscribeUsuarioLogueado(null);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="/logo.png" alt="Icono" style={{ maxWidth: "50px", marginRight: "5px", marginLeft: '10px' }} />
                    <span className="logo">Itera</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/inicio">
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pdca">
                                Entendé el PDCA
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/proyectos">
                                Proyectos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ciclos">
                                Ciclos
                            </NavLink>
                        </li>
                    </ul>

                    
                    <ul className="navbar-nav ms-auto">
                        {usuarioLogueado && (
                            <li className="nav-item">
                                <a className="nav-link"  
                                href="#!">¡Bienvenido {usuarioLogueado}!</a>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login/inicio">
                                <span className={"text-light"}>
                                    <i
                                        className={
                                            usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                                        }
                                    ></i>
                                </span>
                                {usuarioLogueado ? " Logout" : " Login"}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export { Menu };
