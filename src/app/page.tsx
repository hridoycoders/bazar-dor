import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProductSections from "./components/ProductSections";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <Marquee></Marquee>
      <Hero></Hero>
      <ProductSections products={products} />
    </main>
  );
}
