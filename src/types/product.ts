export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  price: number;
  today: number;
  nameBn: string;
  icon: string;
  product?: string;
  markets: Market[];
  change: {
    dir: "up" | "down" | "flat";
    amount?: number;
    pct: number; 
  };
};
