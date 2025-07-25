import { FC, InputHTMLAttributes } from 'react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { useFieldContext } from '@/app/form';

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
  const { name, state, handleChange, handleBlur } = useFieldContext<string>();

  const hasError = !state.meta.isValid && state.meta.isTouched;

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
                className="text-alert mt-1 flex items-center pl-5 text-sm
                  font-bold"
              >
                {hasError && state.meta.errors[0].message}
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
              className={`${
                borderless
                  ? 'hover:bg-main-background-lighter ring-0'
                  : 'ring-1'
                } ${
                hasError
                  ? 'ring-alert'
                  : `ring-main-background-lighter focus:ring-orange
                    hover:border-white`
                } ${icon ? 'pr-13' : ''} peer rounded-md px-5 py-3 text-sm
                font-bold text-white transition-colors duration-100
                focus:outline-none`}
            />
            {icon && (
              <div
                className="pointer-events-none absolute top-1/2 right-3
                  -translate-1/2 transform"
              >
                <DynamicIcon
                  name={icon}
                  size={16}
                  className={`${hasError ? 'text-alert' : 'text-white'} `}
                />
              </div>
            )}
          </div>
          {label && (
            <label
              htmlFor={name}
              className={`${hasError ? 'text-alert' : 'peer-focus:text-orange text-white'}
              pl-5 text-sm font-bold transition-colors duration-100`}
            >
              {label}
            </label>
          )}
        </div>
      </div>
    </>
  );
};
