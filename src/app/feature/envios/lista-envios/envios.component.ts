import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [],
  templateUrl: './envios.component.html',
  styles: ``
})
export default class EnviosComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);



  navegacionEnvios() {
    this.router.navigate(['register'], { relativeTo: this.route });
  }
}
