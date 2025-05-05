"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";

import Logo from "../../../public/favicons/logo.svg";

function Header() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  return (
    <header className="h-[100px] w-full header-shadow sticky top-0 left-0 bg-white z-[9999]">
      <div className="layout-standard flex items-center justify-between h-full">
        <Link href={"/"} passHref>
          <Image
            src={Logo}
            alt="Central Trademark Revival®"
            priority
            className="md:w-[150px] w-[100px]"
          />
        </Link>

        <Button
          onClick={() => handleNavigation(`/trademark-revival/step-01`)}
          className="md:h-[55px] h-[45px] md:px-8 font-bold font-lato md:text-base text-sm rounded-[0.5rem] bg-primary hover:bg-secondary"
        >
          Revive Trademark
        </Button>
      </div>
    </header>
  );
}

export default Header;
