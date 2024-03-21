import React from 'react';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';
import { useAppDispatch } from '../../redux/hooks';
import { useNotes } from '../../redux/selectors';
import { addFilter, clearFilters, removeFilter, setIsHighlighted, setQuery } from '../../redux/features/notes';
import { getFilterBtnColor } from '../../helpers/getFilterBtnColor';
import { FilterButton } from '../../ui/FilterButton';
import { Input } from '../../ui/Input';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, isHighlighted, filters } = useNotes();

  const resetAllFilters = () => {
    dispatch(setQuery(''));
    dispatch(clearFilters());
    dispatch(setIsHighlighted(false));
  };

  const setFilter = (filter: Filter) => {
    if (filters.includes(filter)) {
      dispatch(removeFilter(filter));

      return;
    }

    dispatch(addFilter(filter));
  };

  const setAll = () => {
    dispatch(clearFilters());
    dispatch(setIsHighlighted(false));
  };

  const setSeacrchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className="header">
      <Input
        type="text"
        placeholder="Search notes"
        inputClass="header__search-field"
        value={query}
        onChange={setSeacrchQuery}
      />

      <div className="header__filters-area">
        <div className="header__filters">
          <FilterButton
            btnClass={classNames('header__filter', {
              'header__filter--active': !filters.length
            })}
            onClick={setAll}
          >
            All
          </FilterButton>

          {Object.values(Filter).map((filter, index) => (
            <FilterButton
              key={index}
              btnClass={getFilterBtnColor(filters, filter)}
              onClick={() => setFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}

          <FilterButton
            btnClass={classNames('header__filter', {
              'header__filter--active': isHighlighted
            })}
            onClick={() => dispatch(setIsHighlighted(!isHighlighted))}
          >
            Highlighted
          </FilterButton>
        </div>

        <FilterButton
          btnClass="header__filter header__filter--reset"
          onClick={resetAllFilters}
        >
          Reset Filters
        </FilterButton>
      </div>
    </div>
  );
};
