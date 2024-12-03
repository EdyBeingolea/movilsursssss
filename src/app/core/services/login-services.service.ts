import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  private url = 'https://670fb779a85f4164ef2b9edc.mockapi.io/api/v1/login';
  private http = inject(HttpClient);

  listarTodos(){
    return this.http.get<Login[]>(this.url);
  }

  listarPorId(id: string){
    return this.http.get<Login>(`${this.url}/${id}`);
  }

  guardar(login: Login){
    return this.http.post<Login>(this.url, login);
  }

  actualizar(id: string, login: Login) {
    return this.http.put<Login>(`${this.url}/${id}`, login);
  }

 
  
}
