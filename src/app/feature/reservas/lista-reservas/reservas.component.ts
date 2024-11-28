import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [],
  templateUrl: './reservas.component.html',
  styles: ``
})
export default class ReservasComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  navegarFormularioReserva(){
    this.router.navigate(['register'], {relativeTo: this.route});
  }


}
