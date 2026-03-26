import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/ui/Header';
import { ControlPanel, RoomsList } from '@/features/dashboard/components';

export const Route = createFileRoute('/dashboard')({
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <div className="flex min-h-screen flex-col p-2.5">
      <Header />
      <main className="grid h-fit flex-1 grid-cols-5 gap-2.5">
        <ControlPanel />
        <div className="col-span-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
