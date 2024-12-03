import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Cliente } from '../../../core/interfaces/cliente';
import { Login } from '../../../core/interfaces/login';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { LoginServicesService } from '../../../core/services/login-services.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario.component.html',
  styles: ``
})
export default class FormularioUsuarioComponent implements OnInit {

  clienteId!: string;
  clienteFrom: FormGroup = new FormGroup<any>({});
  loginFrom: FormGroup = new FormGroup<any>({});
  cliente!: Cliente | null;
  login!: Login | null;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public usuarioService = inject(UsuarioServiceService);
  public loginService = inject(LoginServicesService);

  constructor() {
    this.route.params.subscribe(param => {
      this.clienteId = param['id'];
      if (this.clienteId) {
        this.buscarId(this.clienteId);
      }
    });
  }

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
    });
  }

  initLoginFrom() {
    this.loginFrom = this.fb.group({
      usuario: [''],
      password: [''],
      categoria: ['CLI', Validators.required],
    });
  }

  buscarId(id: string) {
    forkJoin({
      cliente: this.usuarioService.listarPorId(id),
      logins: this.loginService.listarTodos() // Busca todos los logins para relacionarlos con el cliente
    }).subscribe({
      next: ({ cliente, logins }) => {
        this.cliente = cliente;
        this.clienteFrom.patchValue(cliente);

        // Buscar el login relacionado con el cliente por clienteId
        const relatedLogin = logins.find(l => l.clienteId === cliente.id);
        if (relatedLogin) {
          this.login = relatedLogin;
          this.loginFrom.patchValue(relatedLogin);
        }
      },
      error: (err) => {
        console.error('Error al buscar cliente o login:', err);
      }
    });
  }

  guardarCliente() {
    if (!this.clienteFrom.valid || !this.loginFrom.valid) {
      alert('Por favor, completa los formularios correctamente.');
      return;
    }
  
    const cliente: Cliente = { ...this.clienteFrom.value };
    const login: Login = { ...this.loginFrom.value };
  
    let saveOrUpdate$;
  
    if (this.clienteId) {
      // Actualiza si el cliente ya existe
      saveOrUpdate$ = this.usuarioService.actualizar(this.clienteId, cliente).pipe(
        switchMap((updatedCliente: Cliente) => {
          login.clienteId = updatedCliente.id;
          if (this.login?.id) {
            return this.loginService.actualizar(this.login.id, login);
          }
          return this.loginService.guardar(login); // En caso de que no haya un login asociado
        })
      );
    } else {
      // Crea un nuevo cliente
      saveOrUpdate$ = this.usuarioService.guardar(cliente).pipe(
        switchMap((savedCliente: Cliente) => {
          login.clienteId = savedCliente.id;
          return this.loginService.guardar(login);
        })
      );
    }
  
    saveOrUpdate$.subscribe({
      next: () => {
        alert('Cliente y Login guardados correctamente.');
        this.navegarCliente();
      },
      error: (err) => {
        console.error('Error al guardar o actualizar cliente/login:', err);
        alert('Ocurrió un error al procesar los datos.');
      }
    });
  }
  

  actualizarCliente() {
    if (!this.clienteFrom.valid || !this.loginFrom.valid) {
      alert('Por favor, completa los datos correctamente.');
      return;
    }
  
    const cliente: Cliente = { ...this.clienteFrom.value };
    const login: Login = { ...this.loginFrom.value };
  
    const updateRequests = [
      this.usuarioService.actualizar(this.clienteId, cliente)
    ];
  
   
  
    forkJoin(updateRequests).subscribe({
      next: () => {
        alert('Cliente y Login actualizados correctamente.');
        this.navegarCliente();
      },
      error: (err) => {
        console.error('Error al actualizar cliente o login:', err);
        alert('Ocurrió un error al actualizar los datos.');
      }
    });
  }
  

  navegarCliente() {
    this.router.navigate(['/sidebar/usuario'], { relativeTo: this.route });
  }
}
