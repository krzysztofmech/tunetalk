import { formOptions } from '@tanstack/react-form';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z
  .object({
    email: z.email('Invalid email address'), // TODO: add async validation to check if email is already in use (need backend)
    username: z.string().min(3, 'Username must be at least 3 characters long'), // TODO: add async validation to check if username is already in use (need backend)
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    repeatPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export const formOpts = formOptions({
  defaultValues: {
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  },
  validators: {
    onSubmit: schema,
  },
  onSubmit: async () => {
    return new Promise((resolve) => {
      // TODO: replace with actual api call
      setTimeout(() => {
        redirect('/dashboard');
      }, 1000);
    });
  },
});
