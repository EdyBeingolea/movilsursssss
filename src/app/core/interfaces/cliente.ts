import { Login } from "./login";

export interface Cliente {
    codigo:          string;
    nombres:         string;
    apellidos:       string;
    tipoDocumento:   string;
    numeroDocumento: number;
    telefono:        number;
    correo:          string;
    direccion:       string;
    fechaNacimiento: string;
    fechaRegistro?:   string;
    fotoPerfil:      string;
    estadoCliente:   string;
    id:              string;
    login:           Login[];
}


