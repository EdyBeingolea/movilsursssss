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

  mostardatos : boolean = false;
  datosmodal: any = null;
  
  cliente: Cliente[] = [];
  private service = inject(UsuarioServiceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.service.listarTodos().subscribe(data => {
      this.cliente = data;
    });
  }

  verdatos(id: string){
    this.service.listarPorId(id).subscribe(data => {
      console.log(data);
      this.mostardatos = true;
      this.datosmodal = data;
    });
  }

  cerrardatos(){
    this.mostardatos = false;
  }

  navigateRegisterPerson(){
    this.router.navigate(['register'], { relativeTo: this.route }).then();
  }


  actualizarCliente(cliente : Cliente){
    this.service.selectCliente = cliente
    this.router.navigate([cliente.id],{relativeTo: this.route}).then();
  }



}
