import { UUID } from 'crypto';

export interface Note {
  id: UUID,
  text: string,
  date: string,
  colorId: number,
  highlighted: boolean,
}
