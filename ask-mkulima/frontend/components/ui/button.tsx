// ask-mkulima/frontend/components/ui/button.tsx

import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', className }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
