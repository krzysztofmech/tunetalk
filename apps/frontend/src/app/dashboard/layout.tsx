'use client';

import { Header } from "@/components/ui/Header";
import { ControlPanel } from "./components/control-panel";


export enum DashboardMainSectionName {
  HOME = 'home',
  ROOM = 'room',
}

export type DashboardMainSection = {
  name: DashboardMainSectionName;
};

export default function Dashboard({ children }: any) {
  return (
    <div className="flex min-h-screen flex-col p-2.5">
      <Header />
      <main className="grid h-fit flex-1 grid-cols-5 gap-2.5">
        <ControlPanel />
        <div className='col-span-4'>{children}</div>
      </main>
    </div>
  );
}
