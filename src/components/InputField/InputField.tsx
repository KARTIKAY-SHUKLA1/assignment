import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

// InputField Props Interface
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  type?: string; // FIX: allow external type override
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  theme = 'light',
  type, // FIX applied
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading] = useState(false);

  // Auto-detect password OR honor explicit type
  const isPassword =
    type === 'password' ||
    placeholder?.toLowerCase().includes('password') ||
    label?.toLowerCase().includes('password');

  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type || 'text';

  const hasError = invalid || !!errorMessage;
  const hasValue = value && value.length > 0;

  // Size configs
  const sizeConfig = {
    sm: {
      input: 'px-3 py-2 text-sm h-9',
      label: 'text-sm mb-1',
      helper: 'text-xs mt-1',
      icon: 'w-4 h-4',
    },
    md: {
      input: 'px-4 py-3 text-base h-12',
      label: 'text-sm mb-2',
      helper: 'text-sm mt-2',
      icon: 'w-5 h-5',
    },
    lg: {
      input: 'px-4 py-4 text-lg h-14',
      label: 'text-base mb-2',
      helper: 'text-base mt-2',
      icon: 'w-6 h-6',
    },
  };

  // Theme classes
  const getThemeClasses = () => {
    const baseClasses =
      'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2';

    if (isLoading) {
      return theme === 'dark'
        ? `${baseClasses} ${sizeConfig[size].input} bg-gray-800 border-gray-700 text-gray-500 cursor-wait animate-pulse`
        : `${baseClasses} ${sizeConfig[size].input} bg-gray-50 border-gray-200 text-gray-400 cursor-wait animate-pulse`;
    }

    if (disabled) {
      const disabledVariants = {
        filled:
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700 text-gray-500'
            : 'bg-gray-50 border-gray-200 text-gray-400',
        outlined:
          theme === 'dark'
            ? 'bg-gray-900 border-gray-700 text-gray-500'
            : 'bg-white border-gray-200 text-gray-400',
        ghost:
          theme === 'dark'
            ? 'bg-transparent border-transparent text-gray-500'
            : 'bg-transparent border-transparent text-gray-400',
      };
      return `${baseClasses} ${sizeConfig[size].input} ${disabledVariants[variant]} cursor-not-allowed opacity-60`;
    }

    if (hasError) {
      const errorVariants = {
        filled:
          theme === 'dark'
            ? 'bg-red-900/20 border-red-500 text-red-100 focus:border-red-400 focus:ring-red-500/20'
            : 'bg-red-50 border-red-300 text-gray-900 focus:border-red-500 focus:ring-red-200',
        outlined:
          theme === 'dark'
            ? 'bg-gray-900 border-red-500 text-red-100 focus:border-red-400 focus:ring-red-500/20'
            : 'bg-white border-red-300 text-gray-900 focus:border-red-500 focus:ring-red-200',
        ghost:
          theme === 'dark'
            ? 'bg-transparent border-red-500 text-red-100 focus:border-red-400 focus:ring-red-500/20'
            : 'bg-transparent border-red-300 text-gray-900 focus:border-red-500 focus:ring-red-200',
      };
      return `${baseClasses} ${sizeConfig[size].input} ${errorVariants[variant]}`;
    }

    const normalVariants = {
  filled:
    theme === 'dark'
      ? 'bg-gray-800 border-none text-white focus:bg-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
      : 'bg-gray-100 border-none text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-blue-200',
  outlined:
    theme === 'dark'
      ? 'bg-gray-900 border border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20'
      : 'bg-white border border-gray-400 text-gray-900 focus:border-blue-500 focus:ring-blue-200',
  ghost:
    theme === 'dark'
      ? 'bg-transparent border-b border-gray-600 text-white focus:border-blue-500 focus:ring-0'
      : 'bg-transparent border-b border-gray-400 text-gray-900 focus:border-blue-500 focus:ring-0',
};


    return `${baseClasses} ${sizeConfig[size].input} ${normalVariants[variant]}`;
  };

  const getLabelClasses = () => {
    const base = `block font-medium transition-colors ${sizeConfig[size].label}`;
    if (disabled) return `${base} ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`;
    if (hasError) return `${base} ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`;
    return `${base} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`;
  };

  const getHelperClasses = () => {
    const base = sizeConfig[size].helper;
    if (hasError) return `${base} text-red-400 flex items-start space-x-1`;
    return `${base} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`;
  };

  const getIconClasses = () => {
    return theme === 'dark'
      ? 'text-gray-400 hover:text-gray-200 transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20'
      : 'text-gray-400 hover:text-gray-600 transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20';
  };

  const handleClear = () => {
    if (onChange && !disabled) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const togglePasswordVisibility = () => {
    if (!disabled) setShowPassword(!showPassword);
  };

  const inputId = React.useId();
  const showClearButton = hasValue && !disabled && !isLoading;
  const showPasswordToggle = isPassword && !isLoading;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={getLabelClasses()}>
          {label}
        </label>
      )}

      {/* Input */}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={`${getThemeClasses()} ${
            showClearButton || showPasswordToggle
              ? showClearButton && showPasswordToggle
                ? 'pr-20'
                : 'pr-12'
              : ''
          }`}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
        />

        {/* Action Icons */}
        {(showClearButton || showPasswordToggle) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className={getIconClasses()}
                aria-label="Clear input"
                tabIndex={-1}
              >
                <X className={sizeConfig[size].icon} />
              </button>
            )}

            {showPasswordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={getIconClasses()}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className={sizeConfig[size].icon} />
                ) : (
                  <Eye className={sizeConfig[size].icon} />
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper / Error */}
      {(helperText || errorMessage) && (
        <div className={sizeConfig[size].helper}>
          {hasError ? (
            <p id={`${inputId}-error`} className={getHelperClasses()} role="alert">
              <span className="flex-shrink-0 mt-0.5">⚠️</span>
              <span>{errorMessage}</span>
            </p>
          ) : helperText ? (
            <p id={`${inputId}-helper`} className={getHelperClasses()}>
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export { InputField };
export type { InputFieldProps };
