import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CocinaService } from '../services/cocina.service';
import { Cocina } from '../models/cocina';

@Component({
  selector: 'app-editar-cocina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-cocina.component.html',
  styleUrls: ['./editar-cocina.component.css']
})
export class EditarCocinaComponent implements OnInit {

  cocina: Cocina = {
    id: 0,
    nombre: '',
    ubicacion: ''
  };

  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private cocinaService: CocinaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.cocinaService.getById(id).subscribe(data => {
      this.cocina = data;
    });
  }

  guardarCambios(): void {
    this.cocinaService.update(this.cocina.id, this.cocina).subscribe(() => {
      alert('Cocina actualizada con éxito');
      this.router.navigate(['/cocina']);
    });
  }

  volver(): void {
    this.router.navigate(['/cocina']);
  }

}
