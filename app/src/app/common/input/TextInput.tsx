import { FC, InputHTMLAttributes } from 'react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { useField, useFieldContext } from '@/app/form';
import { cn } from '@/app/utils/cn';

const textInputStyles = {
  main: 'peer rounded-md px-5 py-3 text-sm font-bold text-white placeholder:text-main-background-lighter transition-colors duration-100 focus:outline-none',
  default: {
    noError:
      'border-1 border-main-background-lighter focus:border-orange hover:border-white',
    hasError: 'border-1 border-alert',
  },
  borderless: {
    noError: 'ring-0 hover:bg-main-background-lighter',
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
}

export const TextInput: FC<TextInputProps> = ({
  type = 'text',
  borderless = false,
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
  );

  return (
    <>
      <div className={'flex items-center justify-center'}>
        <div className="flex flex-col-reverse items-start gap-2">
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
                className="text-alert mt-1 flex items-center text-sm font-bold"
              >
                {errorMessages[0]}
              </span>
            </div>
          </div>
          <div className="relative">
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
                <DynamicIcon
                  name={icon}
                  size={16}
                  className="text-white"
                />
              </div>
            )}
          </div>
          {label && (
            <label
              htmlFor={name}
              className={`text-sm font-bold transition-colors duration-100 peer-focus:text-orange text-white`}
            >
              {label}
            </label>
          )}
        </div>
      </div>
    </>
  );
};
