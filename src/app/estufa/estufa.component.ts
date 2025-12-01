
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { EstufaService } from '../services/estufa.service';
import { Estufa } from '../models/estufa';

@Component({
  selector: 'app-estufa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estufa.component.html',
  styleUrls: ['./estufa.component.css'],
})
export class EstufaComponent implements OnInit {
  estufas: Estufa[] = [];

  constructor(
    private estufaService: EstufaService,
    private route: ActivatedRoute,
    private router: Router        
  ) {}

  ngOnInit(): void {
    const cocinaId = this.route.snapshot.paramMap.get('id');

    if (cocinaId) {
    
      this.estufaService.getByCocina(Number(cocinaId)).subscribe((data) => {
        console.log('Estufas filtradas:', data);
        this.estufas = data;
      });
    } else {
     
      this.estufaService.getAll().subscribe((data) => {
        console.log('Estufas desde backend:', data);
        this.estufas = data;
      });
    }
  }

  nuevaEstufa(): void {
    this.router.navigate(['/estufa/nueva']);
  }
}
