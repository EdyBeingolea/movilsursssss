import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../../core/interfaces/cliente';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';

@Component({
  selector: 'app-formulario-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-editar.component.html',
  styles: ``
})
export class FormularioEditarComponent implements OnInit {

  clienteForm: FormGroup = new FormGroup({});
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clienteService = inject(UsuarioServiceService);

  clienteId!: number; // ID del cliente a editar

  ngOnInit(): void {
    // Obtener ID del cliente desde la ruta y cargar datos
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.initCliente();
    this.cargarDatosCliente(this.clienteId);
  }

  // Inicializar formulario vacío
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

  // Cargar datos del cliente desde el servicio
  cargarDatosCliente(id: number) {
    this.clienteService.listarPorId(id).subscribe((cliente: Cliente) => {
      this.clienteForm.patchValue({
        firstName: cliente.firstName,
        lastName: cliente.lastName,
        documentType: cliente.documentType,
        documentNumber: cliente.documentNumber,
        phone: cliente.phone,
        email: cliente.email,
        address: cliente.address,
        birthDate: cliente.birthDate,
        username: cliente.login.username,
        password: cliente.login.password,
      });
    });
  }

  // Método para editar cliente
  editarCliente() {
    if (this.clienteForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const cli = this.clienteForm.value;
    const licenseExpirationDate = new Date(cli.birthDate);
    const formattedBirthDate = this.formatDate(licenseExpirationDate);

    const updatedCliente: Cliente = {
      ...cli,
      clientId: this.clienteId, // ID del cliente
      birthDate: formattedBirthDate,
      login: {
        username: cli.username,
        password: cli.password,
      },
    };

    this.clienteService.actualizar(this.clienteId, updatedCliente).subscribe(
      () => {
        console.log('Cliente actualizado correctamente');
        this.volverLista();
      },
      error => {
        console.error('Error al actualizar cliente:', error);
      }
    );
  }

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
