export type ColorName = 'purple' | 'yellow' | 'red' | 'blue' | 'orange';
export type ColorHash = '#B488F8' | '#E5F699' | '#F5957A' | '#26E6FA' | '#F9CA7C';

export interface Color {
  id: number,
  name: ColorName,
  hash: ColorHash
}
