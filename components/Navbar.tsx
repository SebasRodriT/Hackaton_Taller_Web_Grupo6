"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  return (
    <nav className="bg-blue-900 text-gray-400 dark:text-gray-200 absolute h-24 w-full z-50 align-middle justify-center">
      <div className="h-full flex">
        <div className="justify-content">
          <h1>NavBar</h1>
          &nbsp;&nbsp;
        </div>

        <NavbarItem to="/" isSelected={pathname === "/"} name="Home" />
        <NavbarItem
          to="/features"
          isSelected={pathname === "/features"}
          name="Features"
        />
        <NavbarItem
          to="/Pricing"
          isSelected={pathname === "/Pricing"}
          name="Pricing"
        />
        <NavbarItem to="/About" isSelected={pathname === "/About"} name="About" />

        <input type="text" placeholder="Buscar" required />
      

      <div className="btn">
        <i className="fas fa-search-dollar"></i>
      </div>

      <button type="button" onClick={() => router.push("/pagina-siguiente")}>Next</button>
      </div>
    </nav>
  );
}

function NavbarItem({
  name,
  to,
  isSelected,
}: Readonly<{
  name: string;
  to: string;
  isSelected: boolean;
}>) {
  return (
    <Link href={to}>
      <h1
        className={`lg:text-xl text-lg px-2 lg:px-2 lg:mx-14 py-2 cursor-pointer hover:underline select-none w-24 lg:w-44 flex justify-center ${
          isSelected
            ? "bg-gray-300/25 rounded-xl text-gray-400 dark:text-gray-100 font-bold"
            : ""
        }`}
      >{`${name}`}</h1>
    </Link>
  );
}