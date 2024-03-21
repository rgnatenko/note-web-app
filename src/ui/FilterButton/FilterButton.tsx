/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
  children: React.ReactNode,
  btnClass: string,
  onClick: any
}

export const FilterButton: React.FC<Props> = ({
  children,
  btnClass,
  onClick
}) => {
  return (
    <button
      className={btnClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
