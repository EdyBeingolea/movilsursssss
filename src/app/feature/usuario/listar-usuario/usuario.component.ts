import { Component, inject, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../core/interfaces/cliente';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
})
export default class UsuarioComponent implements OnInit {
  mostardatos: boolean = false;
  datosmodal: any = null;

  cliente: Cliente[] = [];
  private service = inject(UsuarioServiceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listarTodos().subscribe(data => {
      this.cliente = data;
    });
  }

  // New method to export to Excel
  exportToExcel() {
    // Prepare data for Excel export
    const exportData = this.cliente.map(cli => ({
      'ID': cli.clientId,
      'codigoCliente': cli.code,
      'Nombres': cli.firstName,
      'Apellidos': cli.lastName,
      'Tipo Documento': cli.documentType,
      'Número Documento': cli.documentNumber,
      'Teléfono': cli.phone,
      'Correo': cli.email,
      'Dirección': cli.address,
      'Fecha Nacimiento': cli.birthDate,
      'Fecha Registro': cli.registrationDate,
      'Estado Cliente': cli.clientStatus,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    // Generate and save Excel file
    XLSX.writeFile(workbook, 'Listado_Clientes.xlsx');
  }

  // Existing methods remain the same...
  verdatos(id: number) {
    this.service.listarPorId(id).subscribe(data => {
      console.log(data);
      this.mostardatos = true;
      this.datosmodal = data;
    });
  }

  cerrardatos() {
    this.mostardatos = false;
  }

  navigateRegisterPerson() {
    this.router.navigate(['register'], { relativeTo: this.route }).then();
  }

  actualizarCliente(cliente: Cliente) {
    this.service.selectCliente = cliente
    this.router.navigate([cliente.clientId], { relativeTo: this.route }).then();
  }
}