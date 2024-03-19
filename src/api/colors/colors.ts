import { Color } from '../../types/Color';
import { client } from '../../fetchClient/fetchClient';

export const getColors = () => client.get<Color[]>('colors');

export const getColor = (id: number) => client.get<Color>(`colors/${id}`);
