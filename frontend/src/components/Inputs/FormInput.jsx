import { cn } from '../../utils/helpers';

const FormInput = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        className={cn(
          'w-full px-4 py-3 rounded-xl',
          'bg-gray-50 dark:bg-white/5',
          'border transition-all duration-200',
          'text-gray-900 dark:text-white',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
          error
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-gray-200 dark:border-white/10 focus:border-indigo-500'
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-rose-500 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;
