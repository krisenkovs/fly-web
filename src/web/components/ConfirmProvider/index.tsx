import { Confirm } from 'components/Confirm';
import React, { useContext, createContext, PropsWithChildren, useState } from 'react';

type ProviderProps = {
  open: (options: ModalProps) => void;
};

type ModalProps = {
  content: React.ReactNode;
  onCancel?: () => void;
  onOk: () => void;
};

export const useConfirmModal = () => useContext<ProviderProps>(ConfirmContext);

const ConfirmContext = createContext<ProviderProps>({
  open: () => null,
});

export function ConfirmProvider({ children }: PropsWithChildren) {
  const [isOpen, setState] = useState(false);
  const [options, setOptions] = useState<ModalProps | null>(null);

  function handleClose() {
    options?.onCancel && options?.onCancel();
    setState(false);
  }

  function handleConfirm() {
    options?.onOk && options?.onOk();
    setState(false);
  }

  function handleOpen(options: ModalProps) {
    setOptions(options);
    setState(true);
  }

  return (
    <ConfirmContext.Provider
      value={{
        open: handleOpen,
      }}
    >
      <>{children}</>
      <Confirm visible={isOpen} onClose={handleClose} onOk={handleConfirm}>
        {options?.content}
      </Confirm>
    </ConfirmContext.Provider>
  );
}
