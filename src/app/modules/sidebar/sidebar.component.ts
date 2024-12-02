import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isIdentificationActive: boolean = false;
  @Input() isRiskAssessmentActive: boolean = false;
  @Input() isVisualizationActive: boolean = false;

  constructor(private router: Router) {}

  // Método para redirigir condicionalmente
  navigateTo(route: string, isActive: boolean): void {
    if (isActive) {
      this.router.navigate([`/${route}`]); // Redirige a la ruta si está activa
    } else {
      alert('Esta opción no está habilitada.'); // O cualquier otra acción
    }
  }

  // Método para regresar a módulos
  goToModules(): void {
    this.router.navigate(['/']); // Redirige a la página principal
  }
}
