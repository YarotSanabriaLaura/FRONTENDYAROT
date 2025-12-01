import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { CocinaService } from '../services/cocina.service';
import { Cocina } from '../models/cocina';

@Component({
  selector: 'app-cocina',
  standalone: true,
  imports: [CommonModule, RouterModule],   // NECESARIO PARA routerLink
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {

  cocinas: Cocina[] = [];

  constructor(
    private cocinaService: CocinaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCocinas();
  }

  // Cargar lista desde backend
  cargarCocinas(): void {
    this.cocinaService.getAll().subscribe(data => {
      console.log('Cocinas desde backend:', data);
      this.cocinas = data;
    });
  }

  // Navegar a ver estufas de una cocina
  verEstufas(id: number): void {
    this.router.navigate(['/cocina', id, 'estufas']);
  }

  // Navegar a nueva cocina
  nuevaCocina(): void {
    console.log("Redirigiendo a /cocina/nueva ...");
    this.router.navigate(['/cocina/nueva']);
  }

  // Navegar a editar cocina
  editarCocina(id: number): void {
    console.log("Editando cocina con ID:", id);
    this.router.navigate(['cocina/editar', id]);
  }

  // Método llamado desde el HTML: (click)="eliminar(c.id)"
  eliminar(id: number): void {
    this.eliminarCocina(id);
  }

  // Eliminar cocina con confirmación
  eliminarCocina(id: number): void {
    if (confirm("¿Seguro que deseas eliminar esta cocina?")) {
      this.cocinaService.delete(id).subscribe(() => {
        alert("Cocina eliminada");
        this.cargarCocinas(); // Recargar la lista
      });
    }
  }
}
