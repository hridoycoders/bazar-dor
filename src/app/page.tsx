import Hero from "./components/Hero";
import Marquee from "./components/Marquee";

export default function Home() {
  return (
    <main className="w-full border-y border-gray-100 bg-white">
      <Marquee></Marquee>
      <Hero></Hero>
    </main>
  );
}
