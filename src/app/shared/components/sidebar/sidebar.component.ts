import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: ``
})
export default class SidebarComponent {

}
