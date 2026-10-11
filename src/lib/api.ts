import type { Product } from "@/types/product";

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  const result = await res.json();

  return Array.isArray(result) ? result : result.data;
}
