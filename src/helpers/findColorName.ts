import { Color } from '../types/Color';

const findColorName = (colorsArr: Color[], id: number) => {
  return colorsArr.find(color => color.id === id)?.name || 'purple';
};

export default findColorName;
