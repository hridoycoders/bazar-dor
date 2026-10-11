import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthControls from "./auth/AuthControls";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

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
            <span className="text-xs font-medium text-gray-500">{date}</span>
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
