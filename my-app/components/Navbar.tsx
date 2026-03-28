"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() ?? "/";

  return (
    <>
      {/* Navbar normal (arriba) */}
      <nav className="w-full bg-slate-800 text-slate-200">
        <NavbarContent pathname={pathname} />
      </nav>

      <div className="h-px w-full bg-white" />

      {/* Navbar invertido horizontalmente (abajo) */}
      <nav className="w-full bg-slate-800 text-slate-200 transform -scale-x-100">
        <NavbarContent pathname={pathname} />
      </nav>
    </>
  );
}

function NavbarContent({ pathname }: Readonly<{ pathname: string }>) {
  return (
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-base font-semibold text-white">
          Navbar
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <NavbarItem to="/" isSelected={pathname === "/"} name="Home" />
          <NavbarItem
            to="/features"
            isSelected={pathname === "/features"}
            name="Features"
          />
          <NavbarItem
            to="/pricing"
            isSelected={pathname === "/pricing"}
            name="Pricing"
          />
          <NavbarItem to="/about" isSelected={pathname === "/about"} name="About" />
        </div>
      </div>

      <form
        className="flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="sr-only" htmlFor="navbar-search">
          Search
        </label>
        <input
          id="navbar-search"
          type="text"
          placeholder="Search"
          className="h-8 w-56 rounded-sm border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-400"
        />
        <button
          type="submit"
          className="ml-2 h-8 rounded-sm border border-cyan-500 px-3 text-sm font-medium text-cyan-400"
        >
          Search
        </button>
      </form>
    </div>
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
    <Link
      href={to}
      className={`select-none text-sm transition-colors hover:text-white ${
        isSelected ? "font-semibold text-white" : "text-slate-300"
      }`}
    >
      {name}
    </Link>
  );
}