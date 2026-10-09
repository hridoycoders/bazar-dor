import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type ProductSectionsProps = {
  products: Product[];
};

export default function ProductSections({ products }: ProductSectionsProps) {
  // Today's top 6 price increases
  const topRisers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  // Today's top 6 price decreases
  const topFallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const sections = [
    {
      id: "dam-bereche",
      title: "আজ দাম বেড়েছে ▲",
      products: topRisers,
      titleColor: "text-red-600",
    },
    {
      id: "dam-komeche",
      title: "আজ দাম কমেছে ▼",
      products: topFallers,
      titleColor: "text-green-600",
    },
    {
      id: "sob-panno",
      title: "সব পণ্য",
      products: products,
      titleColor: "text-gray-900",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f6f3] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2
                className={`text-lg font-bold sm:text-xl ${section.titleColor}`}
              >
                {section.title}
              </h2>

              <span className="rounded-full bg-white px-3 py-1 text-sm text-gray-500 shadow-sm">
                {new Intl.NumberFormat("bn-BD").format(section.products.length)}{" "}
                টি
              </span>
            </div>

            {section.products.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
                এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
              </p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
