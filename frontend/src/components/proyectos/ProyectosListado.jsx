import React from "react";

export default function ProyectosListado({
    Proyectos,
    Consultar,
    Modificar,
    ActivarDesactivar,
    Eliminar,
    Agregar,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered">
                <thead>
                    <tr className="table-light">
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Descripción</th>
                        <th className="text-center">Activo</th>
                        <th className="text-center text-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Proyectos &&
                        Proyectos.map((Proyecto) => (
                            <tr key={Proyecto.IdProyecto}>
                                <td style={{ textAlign: 'left' }}>{Proyecto.Nombre}</td>
                                <td style={{ textAlign: 'left' }}>{Proyecto.Descripcion}</td>
                                <td>{Proyecto.Activo ? "SI" : "NO"}</td>
                                <td className="text-nowrap acciones">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Consultar"
                                        onClick={() => Consultar(Proyecto)}
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        title="Modificar"
                                        onClick={() => Modificar(Proyecto)}
                                    >
                                        <i className="fa-solid fa-gear"></i>
                                    </button>
                                    <button
                                        className={
                                            "btn btn-sm " +
                                            (Proyecto.Activo
                                                ? "btn btn-outline-warning"
                                                : "btn-outline-success")
                                        }
                                        title={Proyecto.Activo ? "Desactivar" : "Activar"}
                                        onClick={() => ActivarDesactivar(Proyecto)}
                                    >
                                        <i
                                            className={"fa fa-" + (Proyecto.Activo ? "times" : "check")}
                                        ></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        title="Eliminar"
                                        onClick={() => Eliminar(Proyecto)}
                                        disabled={Proyecto.Activo}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Paginador*/}
            <div className="paginador">
                <div className="row align-items-center">
                    <div className="col">
                        <span className="pyBadge">Registros: {RegistrosTotal}</span>
                    </div>
                    <div className="col text-center">
                        <span className="align-middle">Pagina: &nbsp;</span>
                        <select
                            value={Pagina}
                            onChange={(e) => {
                                Buscar(e.target.value);
                            }}
                            className="align-middle"
                        >
                            {Paginas?.map((x) => (
                                <option value={x} key={x}>
                                    {x}
                                </option>
                            ))}
                        </select>
                        &nbsp; de {Paginas?.length}
                    </div>

                    <div className="col d-flex justify-content-end align-items-center">
                        <button
                            type="button"
                            className="btn miBoton"
                            style={{ backgroundColor: "#00aeff", color: "white", fontWeight: 600}}
                            onClick={() => Agregar()}
                        >
                            <i className="fa fa-plus"> </i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
