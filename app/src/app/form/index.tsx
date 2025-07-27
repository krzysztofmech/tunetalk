import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { TextInput } from '@/app/common/input/TextInput';
import { ZodError } from 'zod';

type Errors = (ZodError | string)[];

export const errorsMap = (errors: Errors): string[] => {
  return errors.map((error) => {
    if (typeof error === 'object') {
      return error.message;
    }

    return error;
  });
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export function useField<T>() {
  const { name, state, handleChange, handleBlur } = useFieldContext<T>();
  return {
    errorMessages: errorsMap(state.meta.errors),
    name,
    state,
    handleChange,
    handleBlur,
  };
}
