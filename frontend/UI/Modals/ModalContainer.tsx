import React from 'react';
import { MdClose } from 'react-icons/md';
import { Modal } from '@mui/material';

type ModalContainerProps = {
  open: boolean;
  onClose: (value: React.SetStateAction<boolean>) => void;
  children: JSX.Element;
};

function ModalContainer({ open, onClose, children }: ModalContainerProps) {
  return (
    <Modal
      open={Boolean(open)}
      onClose={() => onClose(false)}
      className="flex justify-center items-center bg-rgba(0,0,0,0.3) p-3 "
    >
      <div className="bg-white rounded-md p-5">
        <div
          className="w-full flex justify-end cursor-pointer "
          onClick={() => onClose(false)}
        >
          <MdClose className="text-2xl text-black cursor-pointer" />
        </div>
        {children}
      </div>
    </Modal>
  );
}

export default ModalContainer;
