import { FC } from 'react';
import { Button, SubmitButtonProps } from './Button';
import { useFormContext } from '@/app/form';

interface FormButtonProps extends Omit<SubmitButtonProps, 'buttonType'> {}

export const FormButton: FC<FormButtonProps> = (props) => {
  const { Subscribe } = useFormContext();
  return (
    <Subscribe
      selector={(state) => state.isSubmitting}
      children={(isSubmitting) => (
        <Button {...props} buttonType="submit" loading={isSubmitting} />
      )}
    />
  );
};
