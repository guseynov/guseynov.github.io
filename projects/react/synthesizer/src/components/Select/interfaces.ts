export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
