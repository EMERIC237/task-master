import { signal, effect, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  media = signal(window.matchMedia("(min-width: 600px)").matches);

  constructor(private authService: AuthService) {
    window.matchMedia("(min-width: 600px)").addEventListener('change', e => {
      this.media.set(e.matches);
    });
  }


  logout(): void {
    this.authService.logout();
  }
}
