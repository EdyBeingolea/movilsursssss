import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private url = 'http://18.189.235.228:8081/api/client';
  private http = inject(HttpClient);

  selectCliente!: Cliente | null;

  listarTodos() {
    return this.http.get<Cliente[]>(`${this.url}/active`);
  }

  listarPorId(id: number) {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  guardar(cliente: Cliente) {
    return this.http.post<Cliente>(`${this.url}/register`, cliente);
  }

  actualizar(id: number, cliente: Cliente) {
    return this.http.put<Cliente>(`${this.url}/${id}`, cliente);
  }



}
