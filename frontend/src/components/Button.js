import React from 'react';
import '../styles/Button.css'; // Als je extra styling daar hebt

export default function Button({
  children,
  variant = 'default',
  onClick,
  className = '',
}) {
  const baseClass = 'custom-btn';
  const variantClass =
    variant === 'hero' ? 'custom-btn-hero' : 'custom-btn-default';

  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
