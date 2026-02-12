"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useTransition } from "react";

interface Account {
  id: string;
  full_name: string;
  member_since: string;
  account_status: string;
  updated_at: string;
}

export default function UserProfileForm({
  account,
  userEmail,
  updateFullName,
}: {
  account: Account;
  userEmail: string | undefined;
  updateFullName: (fullName: string) => Promise<void>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialFullName = account?.full_name || "";
  const [fullName, setFullName] = useState(initialFullName);
  const [memberSince] = useState(
    account?.member_since?.split("T")[0] || ""
  );
  const [accountStatus] = useState(account?.account_status || "");

  const isChanged = useMemo(() => {
    return fullName.trim() !== initialFullName.trim();
  }, [fullName, initialFullName]);

  const handleUpdate = () => {
    const confirmed = window.confirm(
      "Are you sure you want to update your full name?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      await updateFullName(fullName);
      alert("Profile updated successfully!");
      router.refresh(); // 🔥 refresh server data
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <h1 className="font-semibold text-[#264D73] mb-8 text-5xl text-center">
        USER PROFILE
      </h1>

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-md bg-gray-100 px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full rounded-md bg-gray-200 px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Member Since
            </label>
            <input
              type="date"
              value={memberSince}
              disabled
              className="w-full rounded-md bg-gray-200 px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Account Status
            </label>
            <textarea
              value={accountStatus}
              disabled
              className="w-full rounded-md bg-gray-200 px-4 py-2.5 resize-none"
            />
          </div>
        </div>

        {isChanged && (
          <button
            onClick={handleUpdate}
            disabled={isPending}
            className="w-full rounded-xl bg-[#7BA63F] py-3 text-white font-semibold mt-6 shadow-md hover:bg-green-600 transition disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </button>
        )}

        <button
          onClick={() => router.push("/overview")}
          className="w-full rounded-xl bg-red-500 py-3 text-white font-semibold mt-3 shadow-md hover:bg-red-600 transition"
        >
          Back to Overview
        </button>
      </div>
    </div>
  );
}
