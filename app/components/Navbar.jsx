"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex py-3 flex-wrap justify-around items-center">
      <h1
        className="text-lg font-semibold mt-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Todo App
      </h1>
      <ul className="flex gap-[40px] mt-4">
        <li className="cursor-pointer" onClick={() => router.push("/")}>
          Home
        </li>
        <li className="cursor-pointer" onClick={() => router.push("/lists")}>
          Lists
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
