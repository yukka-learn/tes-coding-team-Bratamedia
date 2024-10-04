"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Navbar() {
  const navList = [
    {
      name: "Home",
      href: "/dashboard",
    },
    {
      name: "Students",
      href: "/students",
    },
    {
      name: "Teachers",
      href: "/teachers",
    },
    {
      name: "Class",
      href: "/class",
    },
  ];
  return (
    <nav>
      <ul className="text-lg space-x-5 flex">
        {navList.map((nav) => (
          <li key={nav.href}>
            <NavLink href={nav.href}>{nav.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const selectedUser = useSelectedLayoutSegments();
  const segment = selectedUser[0];

  const actives =
    href === `/${segment}` || (href === "/" && !selectedUser.length);
  return (
    <Link
      href={href}
      className={cn(
        "text-lg",
        actives ? "font-bold" : ""
      )}
    >
      {children}
    </Link>
  );
}
