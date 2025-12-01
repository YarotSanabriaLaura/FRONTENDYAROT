import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EstufaService } from '../services/estufa.service';
import { CocinaService } from '../services/cocina.service';
import { Estufa } from '../models/estufa';
import { Cocina } from '../models/cocina';

@Component({
  selector: 'app-nueva-estufa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-estufa.component.html',
  styleUrls: ['./nueva-estufa.component.css']
})
export class NuevaEstufaComponent implements OnInit {

  // Objeto base que se enviará al backend
  estufa: Estufa = {
    id: 0,
    descripcion: '',
    marca: '',
    modelo: '',
    potencia: 0,
    tipo: '',
    // Inicializamos con un objeto Cocina vacío. El ID será sobreescrito en guardar().
    cocina: {
      id: 0,
      nombre: '',
      ubicacion: ''
    }
  };

  // Variable vinculada al <select> del HTML para capturar el ID de la cocina.
  selectedCocinaId: number | null = null; 

  // Listado para llenar el <select> de cocinas
  cocinas: Cocina[] = [];

  // Mensaje para mostrar al usuario (éxito o error)
  mensaje = '';

  constructor(
    private estufaService: EstufaService,
    private cocinaService: CocinaService,
    private router: Router
  ) {}

// --- Lifecycle Hooks ---

  /**
   * Se ejecuta al iniciar el componente. 
   * Su objetivo principal es cargar la lista de cocinas.
   */
  ngOnInit(): void {
    this.cargarCocinas();
  }

// --- Métodos de Lógica ---

  /**
   * Obtiene todas las cocinas del servicio y las asigna a la lista 'cocinas'.
   */
  cargarCocinas(): void {
    this.cocinaService.getAll().subscribe({
      next: (data) => {
        // Asignamos la lista de cocinas para el <select>
        this.cocinas = data;
        console.log('Cocinas cargadas:', this.cocinas);
      },
      error: (err) => {
        console.error('Error al cargar las cocinas:', err);
        this.mensaje = 'Error al cargar las cocinas disponibles.';
      }
    });
  }


  /**
   * Método principal para guardar la estufa. 
   * Llamado por el (ngSubmit) del formulario.
   */
  guardar(): void {
    // 1. Validación de la selección de cocina
    if (this.selectedCocinaId === null || this.selectedCocinaId === 0) {
      this.mensaje = 'Por favor, seleccione una cocina.';
      return;
    }

    // 2. Asociar el ID seleccionado al objeto estufa.cocina
    // Creamos un objeto Cocina simple para establecer la relación en el backend.
    this.estufa.cocina = {
      id: this.selectedCocinaId,
      nombre: '', // Se envían vacíos si el backend solo necesita el ID
      ubicacion: '' 
    };

    // 3. Llamada al servicio para crear (guardar) la estufa
    this.estufaService.create(this.estufa).subscribe({
      next: (response) => {
        console.log('Estufa guardada con éxito', response);
        this.mensaje = '¡Estufa creada exitosamente!';
        
        // 4. Redirección (ej. a la lista de estufas)
        // Asegúrate de cambiar '/estufas' por la ruta real de tu lista
        setTimeout(() => {
          this.router.navigate(['/estufas']); 
        }, 1000); // Pequeño retraso para que el usuario vea el mensaje
      },
      error: (err) => {
        // 5. Manejo de errores
        console.error('Error al guardar la estufa:', err);
        // Intentamos obtener un mensaje de error legible de la respuesta del backend
        this.mensaje = 'Error al guardar la estufa. ' + (err.error?.message || 'Verifique la conexión y los datos.');
      }
    });
  }

  /**
   * Navega de vuelta a la lista de estufas (o la página anterior).
   */
  volver(): void {
    // Asegúrate de cambiar '/estufas' por la ruta real de tu lista
    this.router.navigate(['/estufas']);
  }
}
