import React from "react";

export default function ProyectosBuscar({ Nombre, setNombre, Activo, setActivo, Buscar }) {
    return (
        <form name="FormBusqueda" style={{ margin: "0 auto", marginBottom: "13px" }}>
            <div className="container-fluid">
                <div className="row align-items-center">

                    {/* Campo Nombre */}
                    <div className="col-sm-2 text-center">
                        <label className="col-form-label">Nombre:</label>
                    </div>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setNombre(e.target.value)}
                            value={Nombre}
                            maxLength="55"
                            autoFocus
                        />
                    </div>

                    {/* Campo Activo */}
                    <div className="col-sm-2 text-center">
                        <label className="col-form-label">Activo:</label>
                    </div>
                    <div className="col-sm-1">
                        <select
                            className="form-control"
                            onChange={(e) => setActivo(e.target.value)}
                            value={Activo}
                        >
                            <option value={""}></option>
                            <option value={false}>NO</option>
                            <option value={true}>SI</option>
                        </select>
                    </div>
                
                    {/* Botón de búsqueda */}
                    <div className="col-sm-1 d-flex justify-content-center mt-1 mb-1">
                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600 }}
                            onClick={() => Buscar(1)}
                        >
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
