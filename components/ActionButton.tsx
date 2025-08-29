import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger' | 'primary';
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, disabled = false, variant = 'default' }) => {
  const baseClasses = "flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-amber-500",
    primary: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400",
    danger: "bg-red-900/50 text-red-300 hover:bg-red-800/70 focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <span className="w-4 h-4">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default ActionButton;
