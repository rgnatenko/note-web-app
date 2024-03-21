/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
  type: string
  inputClass: string,
  placeholder?: string,
  value?: string,
  onChange?: any
  onClick?: any
};

export const Input: React.FC<Props> = ({
  type,
  inputClass,
  placeholder,
  value,
  onChange,
  onClick
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={inputClass}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
};
