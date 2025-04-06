"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { signOut } from "@/lib/actions/auth.action";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Signed out successfully.");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast.success("Avatar updated successfully.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4">

      {/* Logo */}
      <Link className="flex items-center gap-2" href="/">
        <Image src="/logo.svg" alt="logo" height={32} width={38} />
        <h2 className="text-primary-100">InterviewIQ</h2>
      </Link>

      {/* Avatar Section */}
      <div className="relative">
        <Image
          src={avatar ? avatar : "/user.svg"}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
            <ul className="list-none p-0 m-0">
              <li>
                <label
                  htmlFor="avatar-upload"
                  className="w-full text-left py-2 px-2 font-bold text-sm text-black hover:bg-gray-300 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Image
                    src={avatar ? avatar : "/user.svg"}
                    alt="Change Avatar"
                    width={20}
                    height={20}
                  />
                  Change Avatar
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-2 font-bold text-sm text-black hover:bg-gray-300 rounded-lg flex items-center gap-1"
                >
                  <Image
                    src="/sign-out.svg"
                    alt="Sign Out"
                    width={20}
                    height={20}
                  />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
