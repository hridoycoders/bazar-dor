"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
} from "@heroui/react";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সবগুলো ঘর পূরণ করো");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        console.error("SIGN UP ERROR:", result.error);
        toast.error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md border border-gray-100 bg-white rounded-2xl shadow-sm">
      <CardHeader className="flex flex-col items-center text-center px-8 pt-8 pb-2">
        <CardTitle className="text-3xl font-bold text-[#1A1D1A] mb-2">
          অ্যাকাউন্ট তৈরি করুন
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8 pt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="signup-name"
              className="text-sm font-semibold text-gray-800"
            >
              নাম
            </Label>
            <Input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              minLength={2}
              placeholder="যেমন: রহিম উদ্দিন"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/30 h-auto"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="signup-email"
              className="text-sm font-semibold text-gray-800"
            >
              ইমেইল
            </Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/30 h-auto"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="signup-password"
              className="text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড
            </Label>
            <Input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/30 h-auto"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="signup-confirm-password"
              className="text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="আবার লিখুন"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/30 h-auto"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full bg-[#038543] hover:bg-[#026c36] text-white font-medium py-3 px-4 rounded-xl shadow-md transition duration-200 ease-in-out mt-2 h-auto text-base"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

