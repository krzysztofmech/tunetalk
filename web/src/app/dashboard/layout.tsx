export const dynamic = "force-dynamic";
import { getClient } from "@/client";
import { me } from "@/queries/user";
import { Header } from "./components/Header";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = await getClient().query({
    query: me,
  });
  return (
    <html lang="en">
      <body>
        <Header user={data.me!} />
        {children}
      </body>
    </html>
  );
}
