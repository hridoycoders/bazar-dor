"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const user = session?.user;

  // ফাইল সিলেক্ট করে Base64-এ রূপান্তর এবং প্রিভিউ দেখানোর জন্য
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("ছবির সাইজ ২ মেগাবাইটের কম হতে হবে");
        return;
      }

      setPreviewURL(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedName = name.trim() || user?.name;
    const updatedImage = imageBase64 || user?.image;

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
        image: updatedImage,
      });

      if (result.error) {
        toast.error(result.error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সাইন আউট সফল হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F3F6F3] p-8 text-center text-gray-600">
        প্রোফাইল লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F3F6F3] p-8 text-center">
        <h1 className="text-xl font-bold text-gray-800">
          প্রোফাইল দেখতে সাইন ইন করো
        </h1>
        <button
          type="button"
          onClick={() => router.push("/signin")}
          className="mt-4 rounded-xl bg-green-700 px-6 py-3 text-white font-medium shadow hover:bg-green-800 transition"
        >
          সাইন ইন
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F6F3] pb-12">
      <div className="mx-auto max-w-4xl px-4 pt-10">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1D1A]">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Info Header Card */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {previewURL || user.image ? (
              <Image
                src={previewURL || user.image || ""}
                alt="Profile"
                width={64}
                height={64}
                unoptimized
                className="size-16 rounded-2xl object-cover border border-gray-200"
              />
            ) : (
              <div className="flex size-16 items-center justify-center rounded-2xl bg-green-100 text-2xl font-bold text-green-800">
                {(user.name || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="wrap-break-word  text-lg font-bold text-gray-900">
                {user.name}
              </h2>
              <p className="break-all text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <span>↲</span> সাইন আউট
          </button>
        </div>

        {/* Update Form Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-gray-900">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                নাম
              </label>
              <input
                id="name"
                type="text"
                defaultValue={user.name || ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="তোমার নাম লেখো"
                required
                minLength={2}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/30 px-4 py-3 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Profile Image File Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                প্রোফাইল ছবি পরিবর্তন করুন
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer border border-gray-200 rounded-xl bg-gray-50/30 p-2"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              className="mt-2 w-full rounded-xl bg-[#038543] py-3 font-medium text-white shadow-md transition hover:bg-[#026c36] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
