import React from 'react';

interface ContainerProps {
  children?: any;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="p-4 mt-4 max-w-[1000px] mx-auto w-full">{children}</div>
  );
};

export { Container };
