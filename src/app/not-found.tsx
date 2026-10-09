import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f6f3] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mb-5 text-7xl">🔎</div>

        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#008744]">
          404 - Not Found
        </p>

        <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mb-8 leading-7 text-gray-600">
          আপনি যে ক্যাটাগরি বা পেজটি খুঁজছেন, সেটি পাওয়া যায়নি।
          ক্যাটাগরির ঠিকানা যাচাই করুন অথবা হোম পেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-[#008744] px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

