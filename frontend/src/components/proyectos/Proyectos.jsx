import React, { useState, useEffect } from "react";
import moment from "moment";
import ProyectosBuscar from "./ProyectosBuscar";
import ProyectosListado from "./ProyectosListado";
import ProyectosRegistro from "./ProyectosRegistro";
import { proyectosService } from "../../services/proyectos.service";
import modalDialogService from "../../services/modalDialog.service";
//import { asignacionesService } from "../../services/asignaciones.service";
//import { tareasService } from "../../services/tareas.service";

function Proyectos() {
    const TituloAccionABMC = {
        A: "Registrar Proyecto",
        B: "Eliminar Proyecto",
        M: "Modificar Proyecto",
        C: "Consultar Proyecto",
        L: "Proyectos",
    };
    const [AccionABMC, setAccionABMC] = useState("L");

    const [Nombre, setNombre] = useState("");
    const [Activo, setActivo] = useState("");

    const [Proyectos, setProyectos] = useState(null);
    const [Proyecto, setProyecto] = useState(null); 
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);

    const [Asignaciones, setAsignaciones] = useState([]);
    const [Tareas, setTareas] = useState([]);

    /*
    useEffect(() => {
        async function BuscarAsignaciones() {
            try {
                let data = await asignacionesService.Buscar();
                setAsignaciones(data.Asignaciones);
            } catch (error) {
                console.error("Error al buscar asignaciones:", error);
            }
        }

        async function BuscarTareas() {
            try {
                let data = await tareasService.Buscar();
                setTareas(data.Tareas);
            } catch (error) {
                console.error("Error al buscar tareas:", error);
            }
        }

        BuscarAsignaciones();
        BuscarTareas();
    }, []);
    */
    
    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        }
        else {
            _pagina = Pagina;
        }

        const data = await proyectosService.Buscar(Nombre, Activo, _pagina);
        setProyectos(data.Proyectos);
        setRegistrosTotal(data.RegistrosTotal);

        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }

    async function BuscarPorId(proyecto, accionABMC) {
        const data = await proyectosService.BuscarPorId(proyecto);
        setProyecto(data);
        setAccionABMC(accionABMC);
    }


    function Consultar(proyecto) {
        BuscarPorId(proyecto, "C"); 
    }

    function Modificar(proyecto) {
        if (!proyecto.Activo) {
            modalDialogService.Alert("No puede modificarse un registro Inactivo.");
            return;
        }
        BuscarPorId(proyecto, "M"); 
    }

    async function Agregar() {
        setAccionABMC("A");
        setProyecto({
            IdProyecto: 0,
            Nombre: "",
            Descripcion: "",
            FechaInicio: moment(new Date()).format("YYYY-MM-DD"),
            FechaFin: moment(new Date()).format("YYYY-MM-DD"),
            Presupuesto: "",
            Activo: true,
        });
        modalDialogService.Alert("Preparando el alta...");
    }

    async function ActivarDesactivar(proyecto) {
        const asignacionesActivas = Asignaciones.filter(asignacion => asignacion.IdProyecto === proyecto.IdProyecto && asignacion.Activo);
        const tareasActivas = Tareas.filter(tarea => tarea.IdProyecto === proyecto.IdProyecto && tarea.Activo);

        if (asignacionesActivas.length > 0 || tareasActivas.length > 0) {
            modalDialogService.Alert("No se puede desactivar un proyecto con tareas o asignaciones activas.");
            return;
        }

        modalDialogService.Confirm(
            "¿Está seguro que quiere " +
            (proyecto.Activo ? "desactivar" : "activar") +
            " el proyecto?",
            undefined,
            undefined,
            undefined,
            async () => {
                await proyectosService.ActivarDesactivar(proyecto);
                await Buscar();
            }
        );
    }

    async function Eliminar(proyecto) {
        const asignacionesRegistradas = Asignaciones.filter(asignacion => asignacion.IdProyecto === proyecto.IdProyecto);
        const tareasRegistradas = Tareas.filter(tarea => tarea.IdProyecto === proyecto.IdProyecto);

        if (asignacionesRegistradas.length > 0 || tareasRegistradas.length > 0) {
            modalDialogService.Alert("No se puede eliminar un proyecto con tareas o asignaciones registradas.");
            return;
        }

        modalDialogService.Confirm(
            "¿Está seguro que quiere eliminar el proyecto?",
            undefined,
            undefined,
            undefined,
            async () => {
                await proyectosService.Eliminar(proyecto);
                await Buscar();
            }
        );
    }

    async function Grabar(proyecto) {
        try {
            await proyectosService.Grabar(proyecto);
        }
        catch (error) {
            modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
            return;
        }
        await Buscar();
        Volver();

        setTimeout(() => {
            modalDialogService.Alert(
                "Registro " +
                (AccionABMC === "A" ? "agregado" : "modificado") +
                " correctamente.");
        }, 0);
    }

    // Volver/Cancelar desde Agregar/Modificar/Consultar
    function Volver() {
        setAccionABMC("L");
    }

    return (
        <div>
            <div className="tituloPagina">
                {TituloAccionABMC[AccionABMC]}
            </div>

            {AccionABMC === "L" && <ProyectosBuscar
                Nombre={Nombre}
                setNombre={setNombre}
                Activo={Activo}
                setActivo={setActivo}
                Buscar={Buscar}
            />
            } 

            {AccionABMC === "L" && Proyectos?.length > 0 &&
                <ProyectosListado
                    {...{
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
                    }}
                />
            }

            {AccionABMC === "L" && Proyectos?.length === 0 &&
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            }

            {AccionABMC !== "L" &&
                <ProyectosRegistro
                    {...{ AccionABMC, Proyecto, Grabar, Volver }}
                />
            }

        </div>
    );
}

Proyectos.NombreComponenteNoOfuscado = "proyectos";

export { Proyectos };
