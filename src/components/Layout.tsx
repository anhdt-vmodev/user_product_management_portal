import React from 'react';
import clsx from 'clsx';

export const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx('container mx-auto px-5 md:px-10', className)}>
      {children}
    </div>
  );
};
