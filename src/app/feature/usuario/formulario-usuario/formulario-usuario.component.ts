import { Component, inject, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Cliente } from '../../../core/interfaces/cliente';
import { Login } from '../../../core/interfaces/login';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario.component.html',
  styles: ``
})
export default class FormularioUsuarioComponent implements OnInit {

  clienteFrom: FormGroup = new FormGroup<any>({});
  loginFrom: FormGroup = new FormGroup<any>({});
  cliente: Cliente[] = [];
  login: Login[] = [];
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(UsuarioServiceService);


  ngOnInit(): void {
    this.initClienteFrom();
    this.initLoginFrom();
  }

  initClienteFrom() {
    this.clienteFrom = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fotoPerfil: ['', Validators.required],
    })
  }

  initLoginFrom() {
    this.loginFrom = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      categoria: ['CLI', Validators.required],
      fecha: [new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy')],
    })
  }

  guardarCliente() {
    const cli: Cliente = {
      ...this.clienteFrom.value,
      login: [this.loginFrom.value]
    };

    this.cliente.push(cli);
    this.service.guardar(cli).subscribe(data => {
      console.log(data);
      alert(`Examen creado con exito`);

      this.navegarCliente();
    });
  }


  navegarCliente() {
    this.router.navigate(['/sidebar/usuario'], { relativeTo: this.route });
  }


}






