import Link from "next/link";
import type { Product } from "@/types/product";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { dir, pct } = product.change;


const badgeColor =
  dir === "up"
    ? "bg-green-100 text-green-700"
    : dir === "down"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";



  const arrow =
    dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
    >
      {/* Product information */}
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
          {product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 group-hover:text-green-700">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Today's price */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500">আজকের দাম</p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-xl font-bold text-gray-900">
            {formatNumber(product.today)} টাকা
          </p>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold ${badgeColor}`}
          >
            {arrow} {formatNumber(Math.abs(pct))}%
          </span>
        </div>
      </div>
    </Link>
  );
}


