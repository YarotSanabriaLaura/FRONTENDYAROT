import { Routes } from '@angular/router';

import { CocinaComponent } from './cocina/cocina.component';
import { EstufaComponent } from './estufa/estufa.component';
import { NuevaCocinaComponent } from './cocina/nueva-cocina.component';
import { NuevaEstufaComponent } from './estufa/nueva-estufa.component';
import { EditarCocinaComponent } from './cocina/editar-cocina.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [

  // INICIO REAL
  { path: '', component: InicioComponent },

  // COCINAS
  { path: 'cocina', component: CocinaComponent },
  { path: 'cocina/nueva', component: NuevaCocinaComponent },
  { path: 'cocina/editar/:id', component: EditarCocinaComponent },

  // ESTUFAS
  { path: 'estufa', component: EstufaComponent },
  { path: 'estufa/nueva', component: NuevaEstufaComponent },

  // RUTA POR DEFECTO
  { path: '**', redirectTo: '' }
];
