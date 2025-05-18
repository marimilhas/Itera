import { config } from "../config/config";
import httpService from "./http.service";
const urlResource = config.urlResourceProyectos;

async function Buscar(nombre, activo, pagina) {
    const resp = await httpService.get(urlResource, {
        params: { nombre, activo, pagina }
    });
    return resp.data;
  }

async function BuscarPorId(proyecto) {
    const resp = await httpService.get(urlResource + "/" + proyecto.id);
    return resp.data;
}

async function ActivarDesactivar(proyecto) {
    await httpService.delete(urlResource + "/" + proyecto.id + "?bajaFisica=false");
}

async function Eliminar(proyecto) {
    await httpService.delete(urlResource + "/" + proyecto.id + "?bajaFisica=true");
}

async function Grabar(proyecto) {
    if (proyecto.id === 0) {
        await httpService.post(urlResource, proyecto);
    } else {
        await httpService.put(urlResource + "/" + proyecto.id, proyecto);
    }
}
export const proyectosService = {
    Buscar, BuscarPorId, ActivarDesactivar, Eliminar, Grabar
};
