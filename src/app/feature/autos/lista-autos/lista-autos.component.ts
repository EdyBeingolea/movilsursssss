import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-autos',
  standalone: true,
  imports: [],
  templateUrl: './lista-autos.component.html',
  styles: ``
})
export default class ListaAutosComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);


  navegarFormularioAuto(){
    this.router.navigate(['register'],{relativeTo: this.route});
  }
}
