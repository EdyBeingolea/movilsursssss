import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private url = 'https://670fb779a85f4164ef2b9edc.mockapi.io/api/v1/cliente';
  private http = inject(HttpClient);

  selectCliente!: Cliente | null;

  listarTodos() {
    return this.http.get<Cliente[]>(this.url);
  }

  listarPorId(id: string) {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  guardar(cliente: Cliente) {
    return this.http.post<Cliente>(this.url, cliente);
  }

  actualizar(id: string, cliente: Cliente) {
    return this.http.put<Cliente>(`${this.url}/${id}`, cliente);
  }



}
