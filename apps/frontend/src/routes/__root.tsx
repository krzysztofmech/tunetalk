import appCss from './globals.css?url';
import { ClientProviders } from '@/providers/ClientProviders';
import { Toaster } from 'sonner';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { ReactNode } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Tunetalk' },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}


function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <ClientProviders>
        <body>
          {children}
          <Scripts />
          <Toaster expand={true} visibleToasts={100} />
        </body>
      </ClientProviders>
    </html>
  );
}
