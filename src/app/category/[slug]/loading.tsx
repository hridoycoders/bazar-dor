export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f4f6f3] px-4 py-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 h-9 w-52 rounded-lg bg-gray-200" />

        <div className="mb-6 h-11 w-full max-w-xs rounded-xl bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex gap-3">
                <div className="h-14 w-14 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-3 pt-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-6 h-5 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

