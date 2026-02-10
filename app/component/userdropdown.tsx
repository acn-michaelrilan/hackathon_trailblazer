"use client";

import { useState, useEffect } from "react";
import { UserCircle, LogOut } from "lucide-react";
import { logoutUser } from "@/app/auth/actions"; 

interface Props {
  userEmail: string;
}

export default function UserDropdown({ userEmail }: Props) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser(); // call server action
    window.location.href = "/"; // refresh page
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
    <div className="relative" id="user-dropdown">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition-transform"
      >
        <UserCircle size={32} strokeWidth={2} color="#7BA63F" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-50 bg-white border rounded shadow-lg z-20">
          <p className="px-4 py-2 text-gray-700 text-sm border-b">{userEmail}</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}