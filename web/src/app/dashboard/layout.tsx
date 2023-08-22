export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-screen flex-col p-2.5">{children}</div>;
}
