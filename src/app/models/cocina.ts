import { Estufa } from './estufa';

export interface Cocina {
  id: number;
  nombre: string;
  ubicacion: string;
  estufas?: Estufa[];   
}
