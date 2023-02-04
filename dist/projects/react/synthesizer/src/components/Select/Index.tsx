import React from 'react';
import { SelectProps } from './interfaces';
import './styles.scss';

const Select = ({ options, value, onChange }: SelectProps) => {
  return (
    <select className="select" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
