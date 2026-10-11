"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function AuthControls() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("লগআউট করা যায়নি");
        return;
      }

      toast.success("লগআউট সফল হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  }

  if (isPending) {
    return <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200" />;
  }

  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-white px-2 py-2 text-xs md:text-sm font-medium text-green-800 hover:bg-green-50 transition shadow-sm"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={24}
              height={24}
              unoptimized
              className="size-5 md:size-6 rounded-md object-cover"
            />
          ) : (
            <span className="flex size-5 md:size-6 items-center justify-center rounded-full bg-green-100 text-xs">
              👤
            </span>
          )}
          <span className="max-w-15 truncate">{session.user.name}</span>
          <span className="text-xs text-gray-500">⌄</span>
        </button>

        {/* Dropdown Menu Content */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg z-50">
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-100 truncate">
              {session.user.name}
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/profile");
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
            >
              আমার প্রোফাইল
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              লগআউট
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="inline-flex items-center justify-center rounded-lg border border-green-700 bg-white px-3 py-1.5 text-xs md:text-sm font-semibold text-green-700 transition hover:bg-green-50"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="inline-flex items-center justify-center rounded-lg bg-green-700 px-3 py-1.5 text-xs md:text-sm font-semibold text-white transition hover:bg-green-800"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
