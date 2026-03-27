import { Form } from '@/features/sign-up/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-up/')({
  component: SignUp,
});

function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-xl items-center justify-center">
        <Form />
      </div>
    </div>
  );
}
