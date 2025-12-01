import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CocinaService } from '../services/cocina.service';
import { Cocina } from '../models/cocina';

@Component({
  selector: 'app-nueva-cocina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-cocina.component.html',
  styleUrls: ['./nueva-cocina.component.css']
})
export class NuevaCocinaComponent {

  cocina: Cocina = {
    id: 0,
    nombre: '',
    ubicacion: ''
  };

  constructor(
    private cocinaService: CocinaService,
    private router: Router
  ) {}

  guardar(): void {
    this.cocinaService.create(this.cocina).subscribe({
      next: () => this.router.navigate(['/cocina']),
      error: (err) => console.error('Error al guardar cocina:', err)
    });
  }

  volver(): void {
    this.router.navigate(['/cocina']);
  }
}
