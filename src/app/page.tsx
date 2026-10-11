import { Suspense } from "react";
import Hero from "./components/Hero";
import ProductSections from "./components/ProductSections";
import { getProducts } from "@/lib/api";

async function ProductsContent() {
  const products = await getProducts();

  return (
    <section id="sob-ponno">
      <ProductSections products={products} />
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100" />}>
        <Hero />
      </Suspense>

      <Suspense
        fallback={<div className="min-h-64 animate-pulse bg-gray-100" />}
      >
        <ProductsContent />
      </Suspense>
    </main>
  );
}
