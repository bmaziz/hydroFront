// src/app/models/navire.ts
import { Pays } from './pays';

export interface Navire {
  codeNavire: string;
  nomNavire: string;
  longueur: string;
  puissance: string;
  tonnage: string;
  pay: Pays;
}
