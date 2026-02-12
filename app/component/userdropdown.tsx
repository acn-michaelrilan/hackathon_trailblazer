"use client";

import { useState, useEffect } from "react";
import { UserCircle, LogOut, AlertCircle } from "lucide-react";
import { logoutUser } from "@/app/auth/actions";
import { useRouter } from "next/navigation";

interface Props {
  userEmail: string;
}

export default function UserDropdown({ userEmail }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await logoutUser();
    router.push("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#user-dropdown")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative" id="user-dropdown">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition-transform"
        >
          <UserCircle size={32} strokeWidth={2} color="#7BA63F" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-50 bg-white border rounded shadow-lg z-20">
            <p className="px-4 py-2 text-gray-700 text-sm border-b">
              {userEmail}
            </p>

            <button
              onClick={() => {
                setOpen(false);
                router.push("/userprofile");
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              👤 User Profile
            </button>

            <button
              onClick={() => {
                setOpen(false);
                setShowLogoutModal(true);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-1 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in zoom-in duration-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full text-red-500">
                <AlertCircle size={40} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Are you sure?
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              You are about to log out of your profile. You will need to sign
              in again to access your data.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={confirmLogout}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95"
              >
                Yes, Log Me Out
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
