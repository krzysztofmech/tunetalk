export default function Dashboard() {
  return (
    <div
      className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center
        justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20"
    >
      <main
        className="row-start-2 flex flex-col items-center gap-[32px]
          sm:items-start"
      >
        <h1 className="text-orange text-3xl font-bold">dashboard</h1>
      </main>
      <footer
        className="row-start-3 flex flex-wrap items-center justify-center
          gap-[24px]"
      ></footer>
    </div>
  );
}
