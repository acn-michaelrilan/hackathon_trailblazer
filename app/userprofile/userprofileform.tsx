"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

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
  hasExercisePlan,
  userId,
}: {
  account: Account;
  userEmail: string | undefined;
  updateFullName: (fullName: string) => Promise<void>;
  hasExercisePlan: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialFullName = account?.full_name || "";
  const [fullName, setFullName] = useState(initialFullName);

  const [memberSince] = useState(account?.member_since?.split("T")[0] || "");
  const [accountStatus] = useState(account?.account_status || "");

  // ✅ Use local state so UI can change when API confirms plan exists
  const [hasPlan, setHasPlan] = useState<boolean>(hasExercisePlan);
  const [checkingPlan, setCheckingPlan] = useState<boolean>(!hasExercisePlan);

  // ✅ If initial server says false, re-check using API (200 => enable UI)
  useEffect(() => {
    let cancelled = false;

    async function recheckPlan() {
      if (hasPlan) return;

      setCheckingPlan(true);
      try {
        const res = await fetch(`/api/check-plan?user_id=${userId}`, {
          cache: "no-store",
        });

        if (!cancelled && res.ok) {
          setHasPlan(true);
        }
      } finally {
        if (!cancelled) setCheckingPlan(false);
      }
    }

    recheckPlan();
    return () => {
      cancelled = true;
    };
  }, [hasPlan, userId]);

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
      router.refresh(); // refresh server data
    });
  };

  const inputDisabled = !hasPlan || checkingPlan;

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
              disabled={inputDisabled}
              className={`w-full rounded-md px-4 py-2.5 ${
                inputDisabled
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-100"
              }`}
            />
            {!hasPlan && !checkingPlan && (
              <p className="text-xs text-gray-500 mt-1">
                Full name editing is enabled after an exercise plan is created.
              </p>
            )}
            {checkingPlan && (
              <p className="text-xs text-gray-500 mt-1">
                Checking exercise plan...
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={userEmail || ""}
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

        {isChanged && hasPlan && (
          <button
            onClick={handleUpdate}
            disabled={isPending}
            className="w-full rounded-xl bg-[#7BA63F] py-3 text-white font-semibold mt-6 shadow-md hover:bg-green-600 transition disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </button>
        )}

        <button
          onClick={() => router.push(hasPlan ? "/overview" : "/informationinput")}
          className="w-full rounded-xl bg-red-500 py-3 text-white font-semibold mt-3 shadow-md hover:bg-red-600 transition"
        >
          {hasPlan ? "Back to Overview" : "Back to Information Input Page"}
        </button>
      </div>
    </div>
  );
}