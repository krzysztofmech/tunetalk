import { FC, InputHTMLAttributes } from 'react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { useField } from '@/form';
import { cn } from '@/lib/utils/cn';

const textInputStyles = {
  main: 'appearance-none outline-none peer rounded-md px-5 py-5 text-sm font-bold text-white placeholder:text-main-white transition-all duration-100 focus:outline-none w-full',
  default: {
    noError: 'ring-1 ring-main-white focus:ring-orange hover:ring-white',
    hasError: 'ring-1 ring-alert',
  },
  borderless: {
    noError: 'ring-0 hover:bg-main-background-less-transparent px-2',
    hasError: 'text-alert',
  },
};

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password';
  borderless?: boolean;
  placeholder?: string;
  label?: string;
  icon?: IconName;
  disabled?: boolean;
  smaller?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
  type = 'text',
  borderless = false,
  smaller = false,
  placeholder,
  label,
  icon,
  disabled,
}) => {
  const { errorMessages, state, name, handleChange, handleBlur } =
    useField<string>();

  const hasError = !state.meta.isValid && state.meta.isTouched;

  const textInputClasses = cn(
    textInputStyles.main,
    borderless
      ? textInputStyles.borderless[hasError ? 'hasError' : 'noError']
      : textInputStyles.default[hasError ? 'hasError' : 'noError'],
    icon ? 'pr-13' : '',
    smaller ? 'py-3' : '',
  );

  const labelClasses = cn(
    `peer-focus:text-orange text-sm font-bold text-white transition-colors duration-100`,
    borderless ? 'px-2' : 'px5',
  );

  return (
    <>
      <div className={'flex w-full items-center'}>
        <div className="flex w-full flex-col-reverse items-start gap-2">
          <div
            className={`overflow-hidden transition-all duration-100 ease-in-out
              ${hasError ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div
              className={`transform transition-all duration-100 ease-in-out ${
                hasError ? 'translate-y-0' : '-translate-y-2'
              }`}
            >
              <span
                className="text-alert mt-1 flex items-center px-5 text-sm
                  font-bold"
              >
                {errorMessages[0]}
              </span>
            </div>
          </div>
          <div className="relative w-full">
            <input
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              name={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={textInputClasses}
            />
            {icon && (
              <div
                className="pointer-events-none absolute top-1/2 right-3
                  -translate-1/2 transform"
              >
                <DynamicIcon name={icon} size={16} className="text-white" />
              </div>
            )}
          </div>
          {label && (
            <label htmlFor={name} className={labelClasses}>
              {label}
            </label>
          )}
        </div>
      </div>
    </>
  );
};
