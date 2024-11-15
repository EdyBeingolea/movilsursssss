export interface Cliente {
    user_Id:          number;
    firstName:        string;
    lastName:         string;
    documentType:     string;
    documentNumber:   string;
    email:            string;
    username:         string;
    password:         string;
    phone:            string;
    userPhoto:        null | string;
    address:          string;
    birthDate:        string | Date;
    registrationDate: Date | null;
    lastUpdate:       null | Date;
    userType:         string;
    userStatus:       string;
}


