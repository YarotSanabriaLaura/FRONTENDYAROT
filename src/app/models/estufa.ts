import { Cocina } from './cocina';

export interface Estufa {
  id: number;
  descripcion: string;
  marca: string;
  modelo: string;
  potencia: number;
  tipo: string;
  cocina?: Cocina;  
}
