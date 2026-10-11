import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthControls from "./auth/AuthControls";
import BanglaDate from "./BanglaDate";
import { Suspense } from "react";

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#008744] p-2">
            <Image
              src="/logo.png"
              alt="BazarDor Logo"
              width={28}
              height={28}
              priority
              className="h-auto w-auto object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold leading-tight text-gray-900">
              বাজার দর
            </span>
            <Suspense fallback={<span className="text-xs text-gray-500" />}>
              <BanglaDate />
            </Suspense>
          </div>
        </Link>
        {/* login side*/}
        <AuthControls></AuthControls>
      </div>
      <NavLinks></NavLinks>
    </header>
  );
};

export default Navbar;
