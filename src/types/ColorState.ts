import { Color } from './Color';

export interface ColorState {
  data: Color[],
  colorsAreLoading: boolean,
  error: string,
  selectedColorId: null | number
}
