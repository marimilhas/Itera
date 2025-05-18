import { config } from "../config/config";
import httpService from "./http.service";
const urlResource = config.urlResourceCiclos;

async function Buscar(idProyecto, activo, pagina) {
    const resp = await httpService.get(urlResource, {
        params: { idProyecto, activo, pagina },
    });
    return resp.data;
}

async function BuscarPorId(ciclo) {
    const resp = await httpService.get(urlResource + "/" + ciclo.id);
    return resp.data;
}

async function ActivarDesactivar(ciclo) {
    await httpService.delete(urlResource + "/" + ciclo.id + "?bajaFisica=false");
}

async function Eliminar(ciclo) {
    await httpService.delete(urlResource + "/" + ciclo.id + "?bajaFisica=true");
}

async function Grabar(ciclo) {
    if (ciclo.id === 0) {
        await httpService.post(urlResource, ciclo);
    } else {
        await httpService.put(urlResource + "/" + ciclo.id, ciclo);
    }
}
export const ciclosService = {
    Buscar, BuscarPorId, ActivarDesactivar, Eliminar, Grabar
};
