import { Component, inject, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { ActivatedRoute, Router, RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { Cliente } from '../../../core/interfaces/cliente';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
})
export default class UsuarioComponent implements OnInit {
  
  cliente: Cliente[] = [];
  private http = inject(UsuarioServiceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.http.listarTodos().subscribe(data => {
      this.cliente = data;
    });
  }

  navigateRegisterPerson(){
    this.router.navigate(['register'],  { relativeTo: this.route }).then();
  }

}
