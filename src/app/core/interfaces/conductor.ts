import { Login } from "./login";

export interface Drivers {
    message: string;
    drivers: Driver[];
}

export interface Driver {
    driverId:              number;
    code:                  string;
    firstName:             string;
    lastName:              string;
    documentType:          string;
    documentNumber:        string;
    phone:                 string;
    profilePicture:        string;
    email:                 string;
    license:               string;
    licenseExpirationDate: string;
    licenseIssueDate:      string;
    yearsOfExperience:     number;
    driverStatus:          string;
    registrationDate:      string;
    lastUpdate:            null;
    login:                 Login;
}

