import React, { ChangeEvent, FC } from 'react';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  type?: 'number' | 'text';
  className?: string;
};

export const StringInput: FC<Props> = ({ className, value, onChange, name, type }) => {
  return (
    <input
      value={value || ''}
      onInput={onChange}
      name={name}
      autoComplete="none"
      id={name}
      type={type}
      className={className}
    />
  );
};
