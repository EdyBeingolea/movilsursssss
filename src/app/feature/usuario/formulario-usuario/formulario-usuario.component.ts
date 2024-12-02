import { Component, inject, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Cliente } from '../../../core/interfaces/cliente';
import { Login } from '../../../core/interfaces/login';
import { LoginServicesService } from '../../../core/services/login-services.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario.component.html',
  styles: ``
})
export default class FormularioUsuarioComponent implements OnInit {

  clienteFrom: FormGroup = new FormGroup<any>('');
  loginFrom: FormGroup = new FormGroup<any>('');
  cliente: Cliente[] = [];
  login: Login[] = [];
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(UsuarioServiceService);
  private service2 = inject(LoginServicesService);


  ngOnInit(): void {
    this.initClienteFrom();
    this.initLoginFrom();
  }

  initClienteFrom() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
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
      fechaRegistro: [today, Validators.required],
      estadoCliente: ['A', Validators.required],
    })
  }

  initLoginFrom() {
    this.loginFrom = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      categoria: ['CLI', Validators.required],
    })
  }

  guardarCliente() {
    if (!this.clienteFrom.valid || !this.loginFrom.valid) {
      alert('Por favor, completa los formularios correctamente.');
      return;
    }

    const cliente: Cliente = { ...this.clienteFrom.value };
    const login: Login = { ...this.loginFrom.value };

    this.service.guardar(cliente).pipe(
      switchMap((savedCliente: Cliente) => {
        login.clienteId = savedCliente.id; // Asignar el ID del cliente al clienteId en Login
        return this.service2.guardar(login); // Retorna el observable de guardar login
      })
    ).subscribe({
      next: (savedLogin) => {
        console.log('Cliente y Login guardados:', savedLogin);
        alert('Cliente guardado con éxito');
        this.navegarCliente();
      },
      error: (err) => {
        console.error('Error al guardar cliente o login:', err);
        alert('Ocurrió un error al guardar los datos.');
      }
    });
  }





  navegarCliente() {
    this.router.navigate(['/sidebar/usuario'], { relativeTo: this.route });
  }


}






