import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Inicio() {
    return (
        <div>
            <header>
                <h1 style={{ color: "#00aeff", fontWeight: 700}}>Bienvenido a Itera</h1>
                <p>Tu aliado en la mejora continua: registra y controla proyectos con el poder del ciclo PDCA.</p>
            </header>

            <section className="statistics">
                <div className="row">

                    {/* Card Entendé el PDCA */}
                    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center mt-1">
                        <div className="card" style={{ width: "15rem" }}>
                            <img src="empleados.jpg" className="card-img-top" alt="empleados" />
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Entendé el PDCA</h5>
                                </div>
                                <Link
                                    to="/pdca"
                                    className="btn"
                                    style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600 }}
                                ><i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                            </div>
                        </div>
                    </div>

                    {/* Card Proyectos */}
                    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center mt-1">
                        <div className="card" style={{ width: "15rem" }}>
                            <img src="proyecto.jpg" className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Proyectos</h5>
                                    {/* <p className="card-text">Total: {ProyectosTotal}</p> */}
                                </div>
                                <Link
                                    to="/proyectos"
                                    className="btn"
                                    style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600 }}
                                ><i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                            </div>
                        </div>
                    </div>

                    {/* Card Ciclos */}
                    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center align-items-center mt-1">
                        <div className="card" style={{ width: "15rem" }}>
                            <img src="empleados.jpg" className="card-img-top" alt="empleados" />
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">Ciclos</h5>
                                </div>
                                <Link
                                    to="/ciclos"
                                    className="btn"
                                    style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600 }}
                                ><i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export { Inicio };
