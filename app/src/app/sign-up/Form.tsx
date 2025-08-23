'use client';
import { FC } from 'react';
import { useAppForm } from '../form';
import { formOpts } from './form-options';
import { Button } from '../common/button/Button';

export const Form: FC = () => {
  const { AppField, handleSubmit, AppForm, FormButton } = useAppForm(formOpts);
  return (
    <div className="flex w-full flex-col">
      <form
        method="post"
        className="flex flex-col items-center"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <div className="mb-6 flex w-full flex-col items-center gap-14">
          <AppField
            name="email"
            children={({ TextInput }) => (
              <TextInput label="E-mail" placeholder="E-mail" />
            )}
          />
          <AppField
            name="username"
            children={({ TextInput }) => (
              <TextInput label="Username" placeholder="Username" />
            )}
          />
          <AppField
            name="password"
            children={({ TextInput }) => (
              <TextInput
                type="password"
                label="Password"
                placeholder="Password"
              />
            )}
          />
          <AppField
            name="repeatPassword"
            children={({ TextInput }) => (
              <TextInput
                type="password"
                label="Repeat password"
                placeholder="Repeat password"
              />
            )}
          />
        </div>
        <div className="mt-2">
          <AppForm>
            <FormButton size="lg" className="w-3xs">
              Sign Up
            </FormButton>
          </AppForm>
        </div>
      </form>
      <div className="mt-8 flex items-center justify-center text-xs font-bold">
        <p className="text-main-background-lighter mr-2 text-xs font-bold">
          Already have an account?
        </p>
        <Button
          buttonType="link"
          href="/"
          variant="linkDefault"
          className="text-xs"
        >
          Sign In
        </Button>
      </div>
      <div className="flex w-full flex-col">
        <div className="mt-6 flex items-center">
          <div
            className="bg-main-background-lighter h-[0.065rem] w-full
              items-center justify-between"
          ></div>
          <p className="text-main-background-lighter px-4 text-xs">or</p>
          <div
            className="bg-main-background-lighter h-[0.065rem] w-full
              items-center justify-between"
          ></div>
        </div>
        <div className="mt-6 flex justify-center">
          TODO: Social sign up buttons
        </div>
      </div>
    </div>
  );
};
