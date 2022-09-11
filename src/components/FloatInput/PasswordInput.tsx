import { EyeClosedIcon } from 'icons/EyeClosedIcon';
import { EyeIcon } from 'icons/EyeIcon';
import React, { ChangeEvent, FC, useState } from 'react';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
};

export const PasswordInput: FC<Props> = ({ value, onChange, name }) => {
  const [hidden, setHidden] = useState(true);

  function handleClick() {
    setHidden((prevState) => !prevState);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      <input
        type={hidden ? 'password' : 'text'}
        value={value || ''}
        onInput={onChange}
        name={name}
        autoComplete="none"
        id={name}
        style={{ flex: 1 }}
      />
      <div style={{ cursor: 'pointer' }} onClick={handleClick}>
        {hidden ? <EyeClosedIcon /> : <EyeIcon />}
      </div>
    </div>
  );
};
