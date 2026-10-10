import ProductCard from "@/app/components/ProductCard";
import { getProducts } from "@/lib/api";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

const categoryList = [
  { slug: "chal", title: "চাল", icon: "🌾" },
  { slug: "dal", title: "ডাল", icon: "🫘" },
  { slug: "tel", title: "তেল", icon: "🫗" },
  { slug: "sobji", title: "সবজি", icon: "🥬" },
  { slug: "mach", title: "মাছ", icon: "🐟" },
  { slug: "mangsho", title: "মাংস", icon: "🥩" },
  { slug: "dim-dui", title: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", title: "মসলা", icon: "🌶️" },
];

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = categoryList.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }
  const { sort } = await searchParams;

  const allProducts = await getProducts();

  // Filter products by category slug
  const filteredProducts = allProducts.filter(
    (product) =>
      product.category?.toLowerCase() === slug.toLowerCase() ||
      product.slug?.toLowerCase().includes(slug.toLowerCase()),
  );

  const currentCategory = categoryList.find(
    (cat) => cat.slug.toLowerCase() === slug.toLowerCase(),
  );

  const categoryTitle =
    currentCategory?.title ||
    filteredProducts[0]?.categoryNameBn ||
    filteredProducts[0]?.category ||
    slug;

  const categoryIcon = currentCategory?.icon || "🛒";

  const products = [...filteredProducts];

  if (sort === "low-high") {
    products.sort((a, b) => a.today - b.today);
  } else if (sort === "high-low") {
    products.sort((a, b) => b.today - a.today);
  }

  async function handleSortChange(formData: FormData) {
    "use server";
    const selectedSort = formData.get("sort");
    if (selectedSort && selectedSort !== "default") {
      redirect(`/category/${slug}?sort=${selectedSort}`);
    } else {
      redirect(`/category/${slug}`);
    }
  }

  const formattedCount = new Intl.NumberFormat("bn-BD").format(
    filteredProducts.length,
  );

  return (
    <main className="min-h-screen bg-[#f3f5f1] px-4 py-6 sm:px-8 sm:py-8 font-sans text-gray-800">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Category Header Card */}
        <section className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-xs">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f4f6f3] text-3xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryTitle}
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              {formattedCount}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sort Bar */}
        <section className="flex justify-end rounded-2xl bg-white px-6 py-4 shadow-xs">
          <form action={handleSortChange} className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs font-medium text-gray-500">
              সাজান
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort || "default"}
              className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-green-600 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-high">কম থেকে বেশি</option>
              <option value="high-low">বেশি থেকে কম</option>
            </select>

            <button
              type="submit"
              className="rounded-xl bg-[#008744] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-800"
            >
              প্রয়োগ
            </button>
          </form>
        </section>

        {/* Total Products Count */}
        <div className="px-1 text-xs text-gray-500 font-medium">
          মোট {formattedCount}টি পণ্য দেখানো হচ্ছে
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-5 py-12 text-center shadow-xs">
            <div className="text-4xl">🔎</div>

            <h2 className="mt-3 text-lg font-bold text-gray-900">
              কোনো পণ্য পাওয়া যায়নি!
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-xl bg-[#008744] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-emerald-800"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
