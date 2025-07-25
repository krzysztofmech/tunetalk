import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { TextInput } from '../common/input/TextInput';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const {} = createFormHook({
  fieldComponents: {
    TextInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
