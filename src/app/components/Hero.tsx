import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="w-full bg-[#f4f7f4] py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        {/* Main Card Container */}
        <div className="flex flex-col items-center justify-between rounded-3xl border border-gray-100 bg-[#f8faf7] p-6 shadow-sm md:flex-row md:p-12">
          {/* Left Content */}
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-[#e2f1e7] px-3.5 py-1 text-xs font-semibold text-[#008744] md:text-sm">
              {date}
            </span>

            {/* Title */}
            <h1 className="mt-4 text-2xl font-black text-gray-900 md:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="mt-4 text-xs leading-relaxed text-gray-600 md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <Link
              href="#products"
              className="mt-6 inline-block rounded-xl bg-[#008744] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#007038] hover:shadow-md md:text-sm"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Image */}
          <div className="mt-8 flex justify-center md:mt-0 md:justify-end">
            <Image
              src="/bazar-hero.png"
              alt="bazar hero "
              width={260}
              height={260}
              priority
              className="h-auto w-48 object-contain md:w-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
