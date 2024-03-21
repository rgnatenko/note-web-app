import { Filter } from '../types/Filter';

export const getFilterBtnColor = (filters: Filter[], filter: Filter) => {
  const filterClass = `header__filter header__filter--${filter.toLowerCase()}`;

  if (filters.includes(filter)) {
    return `${filterClass} header__filter--${filter.toLowerCase()}-active`;
  }

  return filterClass;
};
