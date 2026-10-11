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

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দাও");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("লগইন সফল হয়েছে!");
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
          সাইন ইন
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8 pt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="signin-email"
              className="text-sm font-semibold text-gray-800"
            >
              ইমেইল
            </Label>
            <Input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/30 h-auto"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="signin-password"
              className="text-sm font-semibold text-gray-800"
            >
              পাসওয়ার্ড
            </Label>
            <Input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/30 h-auto"
            />
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full bg-[#038543] hover:bg-[#026c36] text-white font-medium py-3 px-4 rounded-xl shadow-md transition duration-200 ease-in-out mt-2 h-auto text-base"
          >
            {loading ? "প্রবেশ করা হচ্ছে..." : "সাইন ইন"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
