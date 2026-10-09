import { Product } from "@/types/product";
import Link from "next/link";
const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data: Product[] = await res.json();
  return (
    <div className="w-full border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-10 md:px-10">
        <div className="flex items-center gap-8 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {data.map((n) => (
            <Link key={n.id} href={`/category/${n.slug}`}>
              {n.icon && <span className="text-base">{n.icon}</span>}
              <span>{n.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
