import { connection } from "next/server";

export default async function BanglaDate() {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return <span className="text-xs font-medium text-gray-500">{date}</span>;
}

