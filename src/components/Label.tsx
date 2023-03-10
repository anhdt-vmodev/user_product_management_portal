import React from 'react';

interface LabelProps {
  children?: Element;
  htmlFor: string;
  text: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return (
    <label className="block mb-3 mt-6" htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export { Label };
