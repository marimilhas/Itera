import httpService from "./http.service";
import { config } from "../config/config";
import modalService from "./modalDialog.service";
const urlResource = config.urlResourceLogin;

const login = async (usuario, clave, navigateToComponent) => {
    let resp = await httpService.post(urlResource, {
        usuario,
        clave,
    });

    if (resp.data?.accessToken) {
        sessionStorage.setItem("usuarioLogueado", usuario);
        sessionStorage.setItem("accessToken", resp.data.accessToken);
        sessionStorage.setItem("refreshToken", resp.data.refreshToken);
        if (CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);
        {
            navigateToComponent();
        }

    } else {
        if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
        modalService.Alert("Usuario o clave incorrectos");
    }
};

const logout = () => {
    sessionStorage.removeItem("usuarioLogueado");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
};

const getUsuarioLogueado = () => {
    return sessionStorage.getItem("usuarioLogueado");
};

let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);

const AuthService = {
    login,
    logout,
    getUsuarioLogueado,
    subscribeUsuarioLogueado
};

export default AuthService;