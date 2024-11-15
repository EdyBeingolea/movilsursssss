import { Component, inject, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../../core/services/usuario-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario.component.html',
  styles: ``
})
export default class FormularioUsuarioComponent implements OnInit {
  ngOnInit(): void {
    this.initForm();
  }

  userForm: FormGroup = new FormGroup<any>({});
  private service = inject(UsuarioServiceService);
  private fb = inject(FormBuilder);


  initForm() {
    this.userForm = this.fb.group({
      firstName: ['',],
      lastName: ['',],
      documentType: ['',],
      documentNumber: ['',],
      email: ['',],
      username: ['',],
      password: ['',],
      phone: ['',],
      userPhoto: ['',],
      address: ['',],
      birthDate: ['',],
      userType: ['CLI'],
    })
  }


  /*register() {
    console.log(this.userForm.value);
    this.service.registrar(this.userForm.value)
      .subscribe(res => {
        console.log('Persona:', res);
        alert('Persona agregada');
      });
  }*/

  register() {
    if (this.userForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const formValue = {
      ...this.userForm.value,
      birthDate: this.formatDate(this.userForm.value.birthDate), // Formateamos la fecha
    };

    this.service.registrar(formValue).subscribe({
      next: (res) => {
        console.log('Persona registrada:', res);
        alert('Usuario registrado exitosamente.');
        this.userForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Ocurrió un error al registrar el usuario. Intenta nuevamente.');
      },
    });
  }

  formatDate(date: string): string {
    const parsedDate = new Date(date); // Creamos un objeto Date
    const day = String(parsedDate.getDate()).padStart(2, '0'); // Día (con ceros iniciales)
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Mes (0-based, por eso sumamos 1)
    const year = parsedDate.getFullYear(); // Año

    return `${day}/${month}/${year}`;
  }






}
