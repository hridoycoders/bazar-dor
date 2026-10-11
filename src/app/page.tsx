import Hero from "./components/Hero";
import ProductSections from "./components/ProductSections";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <Hero />
      <section id="sob-ponno" >
        <ProductSections products={products} />
      </section>
    </main>
  );
}
