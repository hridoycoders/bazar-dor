import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import Link from "next/link";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

async function ProductDetailsContent({ params }: ProductDetailsPageProps) {
  // URL থেকে product slug নেওয়া
  const { slug } = await params;

  // API থেকে products আনা
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  // Market-wise price calculation
  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const avgPrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : product.today;

  return (
    <main className="min-h-screen bg-[#f3f5f1] px-4 py-6 font-sans text-gray-800 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm"
        >
          <Link href="/" className="text-green-700 hover:underline">
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href={`/category/${product.category}`}
            className="text-green-700 hover:underline"
          >
            {product.categoryNameBn || "ক্যাটাগরি"}
          </Link>

          <span aria-hidden="true">›</span>

          <span aria-current="page" className="font-semibold text-gray-700">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
              {product.categoryIcon || "🌾"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit} - {product.categoryNameBn}
              </p>

              <p className="mt-2 text-xs font-medium text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-semibold text-emerald-700">বেড়েছে</span> •
                ২ টাকা
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex min-w-35 flex-col items-center justify-center rounded-2xl bg-[#f2f4f1] p-4 text-center">
            <span className="text-xs text-gray-500">আজকের দাম</span>

            <span className="mt-1 text-3xl font-black text-gray-900">
              {formatPrice(product.today)}
            </span>

            <span className="text-xs text-gray-500">টাকা / {product.unit}</span>

            <span className="mt-2 inline-flex items-center text-xs font-semibold text-rose-600">
              ▲ ৩.১%
            </span>
          </div>
        </section>

        {/* Price Summary */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {formatPrice(minPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-400">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
              <p className="text-xs text-gray-500">সর্বাধিক দাম</p>

              <p className="mt-2 text-2xl font-bold text-rose-600">
                {formatPrice(maxPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-400">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
              <p className="text-xs text-gray-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-bold text-emerald-700">
                {formatPrice(avgPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-400">
                প্রতি {product.unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        {/* Market-wise Price Table */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="rounded-2xl bg-white p-4 shadow-xs">
            {markets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-1.5 text-left text-xs text-gray-700">
                  <thead>
                    <tr className="font-medium text-gray-500">
                      <th scope="col" className="px-4 pb-2">
                        বাজার
                      </th>

                      <th scope="col" className="px-4 pb-2">
                        বিভাগ
                      </th>

                      <th
                        scope="col"
                        className="px-4 pb-2 text-right sm:text-left"
                      >
                        সর্বনিম্ন
                      </th>

                      <th
                        scope="col"
                        className="px-4 pb-2 text-right sm:text-left"
                      >
                        সর্বাধিক
                      </th>

                      <th scope="col" className="px-4 pb-2 text-right">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => {
                      const marketAvg = (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market}-${market.division}-${index}`}
                          className="bg-[#f8faf7] transition-colors hover:bg-[#f1f4ee]"
                        >
                          <td className="rounded-l-xl px-4 py-3 font-semibold text-gray-800">
                            {market.market}
                          </td>

                          <td className="px-4 py-3 text-gray-600">
                            {market.division}
                          </td>

                          <td className="px-4 py-3 text-right font-medium text-gray-800 sm:text-left">
                            {formatPrice(market.min)} টাকা
                          </td>

                          <td className="px-4 py-3 text-right font-medium text-gray-800 sm:text-left">
                            {formatPrice(market.max)} টাকা
                          </td>

                          <td className="rounded-r-xl px-4 py-3 text-right font-bold text-gray-900">
                            {formatPrice(marketAvg)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-gray-500">
                এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-96 animate-pulse rounded-xl bg-gray-100" />
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}
