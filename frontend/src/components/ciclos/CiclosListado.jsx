import React from "react";

export default function CiclosListado({
    Ciclos,
    Consultar,
    Modificar,
    ActivarDesactivar,
    Eliminar,
    Agregar,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
    ProyectosDisponibles
})
{
    const obtenerNombreProyecto = (idProyecto) => {
        const proyecto = ProyectosDisponibles.find(p => p.id === idProyecto);
        return proyecto?.nombre ?? "Proyecto desconocido";
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered">
                <thead>
                    <tr className="table-light">
                        <th className="text-center">Proyecto</th>
                        <th className="text-center">Número de ciclo</th>
                        {/* <th className="text-center">Plan</th>
                        <th className="text-center">Do</th>
                        <th className="text-center">Check</th>
                        <th className="text-center">Act</th> */}
                        <th className="text-center">Activo</th>
                        <th className="text-center text-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Ciclos &&
                        Ciclos.map((Ciclo) => (
                            <tr key={Ciclo.id}>
                                <td style={{ textAlign: 'left' }}>{obtenerNombreProyecto(Ciclo.idProyecto)}</td>
                                <td style={{ textAlign: 'left' }}>{Ciclo.numeroCiclo}</td>
                                {/* <td style={{ textAlign: 'left' }}>{Ciclo.plan}</td>
                                <td style={{ textAlign: 'left' }}>{Ciclo.do}</td>
                                <td style={{ textAlign: 'left' }}>{Ciclo.check}</td>
                                <td style={{ textAlign: 'left' }}>{Ciclo.act}</td> */}
                                <td>{Ciclo.activo ? "SI" : "NO"}</td>
                                <td className="text-nowrap acciones">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        title="Consultar"
                                        onClick={() => Consultar(Ciclo)}
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        title="Modificar"
                                        onClick={() => Modificar(Ciclo)}
                                    >
                                        <i className="fa-solid fa-gear"></i>
                                    </button>
                                    <button
                                        className={
                                            "btn btn-sm " +
                                            (Ciclo.activo
                                                ? "btn btn-outline-warning"
                                                : "btn-outline-success")
                                        }
                                        title={Ciclo.activo ? "Desactivar" : "Activar"}
                                        onClick={() => ActivarDesactivar(Ciclo)}
                                    >
                                        <i
                                            className={"fa fa-" + (Ciclo.activo ? "times" : "check")}
                                        ></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        title="Eliminar"
                                        onClick={() => Eliminar(Ciclo)}
                                        disabled={Ciclo.activo}
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
