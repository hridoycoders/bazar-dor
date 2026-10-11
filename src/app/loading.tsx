export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-4">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-200 p-3"
          >
            <div className="mb-4 h-32 rounded-lg bg-gray-200" />
            <div className="mb-3 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-3 h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-5 w-2/5 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
