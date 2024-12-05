import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from '../../../core/interfaces/cliente';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-agregar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-agregar.component.html',
  styles: ``
})
export class FormularioAgregarComponent implements OnInit {


  ngOnInit(): void {
    this.initCliente();
  }

  cliente: Cliente[] = [];
  clienteForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public clienteService = inject(UsuarioServiceService);

  initCliente() {
    this.clienteForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }




  registrarCliente() {
    const cli = this.clienteForm.value;

    const licenseExpirationDate = new Date(cli.birthDate);
    const formattedBirthDate = this.formatDate(licenseExpirationDate);

    const nuevoCliente: Cliente = {
      ...cli,
      birthDate: formattedBirthDate,
      login: {
        username: cli.username,
        password: cli.password,
      },
    };
    console.log('Datos del cliente:', nuevoCliente);  // Verificar los datos antes de enviarlos

    this.clienteService.guardar(nuevoCliente).subscribe(  data => {
      console.log('Cliente registrado:', data);
      this.volverLista();
    });
  }


  // Función para formatear la fecha a dd/MM/yyyy
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  volverLista() {
    this.router.navigate(['sidebar/usuario'], { relativeTo: this.route });
  }
}
