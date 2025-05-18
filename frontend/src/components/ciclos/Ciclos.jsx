import React, { useState, useEffect } from "react";
import moment from "moment";
import CiclosBuscar from "./CiclosBuscar";
import CiclosListado from "./CiclosListado";
import CiclosRegistro from "./CiclosRegistro";
import { ciclosService } from "../../services/ciclos.service";
import { proyectosService } from "../../services/proyectos.service";
import modalDialogService from "../../services/modalDialog.service";


function Ciclos() {
    const TituloAccionABMC = {
        A: "Registrar Ciclo",
        B: "Eliminar Ciclo",
        M: "Modificar Ciclo",
        C: "Consultar Ciclo",
        L: "Ciclos",
    };
    const [AccionABMC, setAccionABMC] = useState("L");

    const [Proyecto, setProyecto] = useState("");
    const [Activo, setActivo] = useState("");

    const [Ciclos, setCiclos] = useState(null);
    const [Ciclo, setCiclo] = useState(null); 
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);

    const [ProyectosDisponibles, setProyectosDisponibles] = useState([]);
    //const [Asignaciones, setAsignaciones] = useState([]);
    //const [Tareas, setTareas] = useState([]);

    
    useEffect(() => {
        async function cargarProyectos() {
            try {
                const data = await proyectosService.Buscar();
                setProyectosDisponibles(data.Proyectos || []);
            } catch (error) {
                console.error("Error al cargar proyectos:", error);
            }
        } 

        cargarProyectos();
    }, []);
    
    
    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        }
        else {
            _pagina = Pagina;
        }

        const data = await ciclosService.Buscar(Proyecto, Activo, _pagina);
        setCiclos(data.Ciclos);
        setRegistrosTotal(data.RegistrosTotal);

        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }

    async function BuscarPorId(ciclo, accionABMC) {
        const data = await ciclosService.BuscarPorId(ciclo);
        setCiclo(data);
        setAccionABMC(accionABMC);
    }


    function Consultar(ciclo) {
        BuscarPorId(ciclo, "C"); 
    }

    function Modificar(ciclo) {
        if (!ciclo.activo) {
            modalDialogService.Alert("No puede modificarse un registro Inactivo.");
            return;
        }
        BuscarPorId(ciclo, "M"); 
    }

    async function Agregar() {
        setAccionABMC("A");
        setCiclo({
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

    async function ActivarDesactivar(ciclo) {
        modalDialogService.Confirm(
            "¿Está seguro que quiere " +
            (ciclo.activo ? "desactivar" : "activar") +
            " el ciclo?",
            undefined,
            undefined,
            undefined,
            async () => {
                await ciclosService.ActivarDesactivar(ciclo);
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

    async function Grabar(ciclo) {
        try {
            await ciclosService.Grabar(ciclo);
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

            {AccionABMC === "L" && <CiclosBuscar
                Proyecto={Proyecto}
                setProyecto={setProyecto}
                Activo={Activo}
                setActivo={setActivo}
                Buscar={Buscar}
                proyectos={ProyectosDisponibles}
            />}

            {AccionABMC === "L" && Ciclos?.length > 0 &&
                <CiclosListado
                    {...{
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
                    }}
                />
            }

            {AccionABMC === "L" && Ciclos?.length === 0 &&
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            }

            {AccionABMC !== "L" &&
                <CiclosRegistro
                    {...{ AccionABMC, Ciclo, ProyectosDisponibles, Grabar, Volver }}
                />
            }

        </div>
    );
}

Ciclos.NombreComponenteNoOfuscado = "ciclos";

export { Ciclos };
