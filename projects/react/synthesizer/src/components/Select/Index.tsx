import React from 'react';
import { SelectProps } from './interfaces';
import './styles.scss';

const Select = ({ options, label, value, onChange }: SelectProps) => {
  return (
    <label className="select-field">
      <span className="select-field__label">{label}</span>
      <select className="select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
