export type Product = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  category: string;
  unit: string;
  price: number;
  nameBn: string;
  icon: string;
  today: string;
  categoryIcon: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};
