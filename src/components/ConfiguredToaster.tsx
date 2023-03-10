import React from 'react';
import { Toaster } from 'react-hot-toast';

interface ConfiguredToasterProps {
  children?: Element;
}

const ConfiguredToaster: React.FC<ConfiguredToasterProps> = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        position: 'top-center',
        className: 'customtoast',
        style: {
          background: '#ffffff',
          color: '#000000',
          padding: '0px',
          boxShadow: 'none',
          borderRadius: '6px',
        },
      }}
    />
  );
};

export { ConfiguredToaster };
