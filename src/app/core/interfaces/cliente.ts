import { Login } from "./login";

export interface Cliente {
    clientId:         number;
    code:             string;
    firstName:        string;
    lastName:         string;
    documentType:     string;
    documentNumber:   string;
    phone:            string;
    email:            string;
    address:          string;
    birthDate:        string;
    registrationDate: Date;
    profilePicture?:   null;
    lastUpdate:       null;
    clientStatus:     string;
    login:            Login;
}
