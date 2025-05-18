import { config } from "../config/config";
import httpService from "./http.service";
const urlResource = config.urlResourceCiclos;

async function Buscar(Nombre, Activo, Pagina) {
    const resp = await httpService.get(urlResource, {
        params: { Nombre, Activo, Pagina },
    });
    return resp.data;
}

async function BuscarPorId(proyecto) {
    const resp = await httpService.get(urlResource + "/" + proyecto.IdProyecto);
    return resp.data;
}

async function ActivarDesactivar(proyecto) {
    await httpService.delete(urlResource + "/" + proyecto.IdProyecto + "?bajaFisica=false");
}

async function Eliminar(proyecto) {
    await httpService.delete(urlResource + "/" + proyecto.IdProyecto + "?bajaFisica=true");
}

async function Grabar(proyecto) {
    if (proyecto.IdProyecto === 0) {
        await httpService.post(urlResource, proyecto);
    } else {
        await httpService.put(urlResource + "/" + proyecto.IdProyecto, proyecto);
    }
}
export const proyectosService = {
    Buscar, BuscarPorId, ActivarDesactivar, Eliminar, Grabar
};
