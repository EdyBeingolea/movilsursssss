import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cliente } from '../../feature/usuario/item-usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private url = 'http://18.225.3.240:8081/api/users/all';
  private url2 = 'http://18.225.3.240:8081/api/users';
  private http = inject(HttpClient);

  listar(){
    return this.http.get<Cliente[]>(this.url);
  }

  registrar(Cliente:Cliente){
    return this.http.post<Cliente>(this.url2, Cliente);
  }
}
