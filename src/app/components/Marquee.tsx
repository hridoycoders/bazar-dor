import { Product } from "@/types/product";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data: Product[] = await res.json();
  return (
    <div className="w-full border-y border-gray-100 bg-white">
      <MarqueeText direction="right" duration={15}>
        {" "}
        {data.map((product: Product) => (
          <div key={product.id} className="flex items-center gap-2 px-5">
            {" "}
            <span>{product.categoryIcon}</span> <h2>{product.nameBn}</h2>{" "}
            <p>
              {product.today} টাকা/{product.unit}
            </p>{" "}
            <p
              className={
                product.change.dir === "down"
                  ? "text-red-600 font-bold"
                  : product.change.dir === "up"
                    ? "text-green-600 font-bold"
                    : "text-gray-500 font-bold"
              }
            >
              {" "}
              {product.change.dir === "down"
                ? "▼"
                : product.change.dir === "up"
                  ? "▲"
                  : "—"}{" "}
              {product.change.pct}%{" "}
            </p>{" "}
          </div>
        ))}{" "}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
