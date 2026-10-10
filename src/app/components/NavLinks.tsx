"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLinks = () => {
  const [data, setData] = useState<Product[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
      );
      const categories: Product[] = await res.json();
      setData(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-10 md:px-10">
        <div className="flex items-center gap-8 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {data.map((n) => {
            const isActive = pathname === `/category/${n.slug}`;
            return (
              <Link
                key={n.id}
                href={`/category/${n.slug}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {n.icon && <span className="text-base">{n.icon}</span>}
                <span>{n.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
