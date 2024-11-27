import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [],
  templateUrl: './conductores.component.html',
  styles: ``
})
export default class ConductoresComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);


  navegarAFormularioConductor() {
    this.router.navigate(['register'], { relativeTo: this.route });
  }

}
