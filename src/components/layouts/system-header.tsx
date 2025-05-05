"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import Logo from "../../../public/favicons/logo.svg";
import { FaPhone } from "react-icons/fa6";

function SystemHeader() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  return (
    <header className="h-[100px] header-shadow w-full bg-white border-b border-border">
      <div className="layout-standard h-full flex items-center justify-between">
        <Link href={"/"} passHref>
          <Image
            src={Logo}
            alt="Central Trademark Revival®"
            priority
            className="md:w-[150px] w-[100px] cursor-pointer"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="tel:+13104244909"
            className="text-heading hover:text-secondary flex items-center gap-2 font-lato"
          >
            <FaPhone />
            <p className="font-semibold text-[14px]">(310) 424-4909</p>
          </Link>

          <Button
            onClick={() => handleNavigation(`/trademark-revival/step-01`)}
            className="md:h-[55px] h-[45px] md:px-8 font-bold font-lato hover:bg-secondary md:text-base text-sm rounded-[0.5rem] bg-primary max-md:hidden"
          >
            Revive Trademark
          </Button>
        </div>
      </div>
    </header>
  );
}

export default SystemHeader;
