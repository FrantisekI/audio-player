import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        px-4 py-2
        bg-gray-800 hover:bg-gray-700
        text-white font-bold
        text-lg md:text-xl
        rounded-md
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};