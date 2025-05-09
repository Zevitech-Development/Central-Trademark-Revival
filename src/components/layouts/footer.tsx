import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

import Logo from "../../../public/favicons/logo.svg";
import { LuMessageSquareText } from "react-icons/lu";
import { IoMdPin, IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-slate-200">
        <div className="layout-standard h-full grid lg:grid-cols-3 gap-12 md:py-[80px] py-[40px]">
          <div className="space-y-6">
            <Image src={Logo} alt="Central Trademark Revival®" width={250} />

            <p className="text-sm text-paragraph">
              Don&apos;t let a dead or abandoned trademark application stand in
              the way of your business growth. At Central Trademark Revival®, we
              specialize in simplifying the trademark revival process, making it
              straightforward and stress-free. Trust our experienced team to
              help you reclaim and protect your brand—every step of the way.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary hover:underline">
                <IoCall size={18} className="text-heading" />
                <Link href="tel:+14083876783" className="text-sm">
                  +1 (408) 387-6783
                </Link>
              </div>

              <div className="flex items-center gap-2 text-primary hover:underline">
                <IoMdMail size={18} className="text-heading" />
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                  className="text-sm"
                >
                  {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
                </Link>
              </div>

              <div className="flex items-center gap-2 text-primary hover:underline">
                <IoMdPin size={18} className="text-heading" />
                <Link
                  href={`https://www.google.com/maps?q=2121+Crystal+Dr,+Arlington,+VA+22202,+USA`}
                  className="text-sm"
                  target="_blank"
                >
                  2121 Crystal Dr, Arlington, VA 22202, USA
                </Link>
              </div>

              <div className="flex items-start gap-2 text-primary hover:underline">
                <IoMdPin size={18} className="text-heading" />
                <Link
                  href={`https://www.google.com/maps?q=1060+Lincoln+Ave,+Suite+20+%23+1071,+San+Jose,+CA+95125,+USA`}
                  className="text-sm"
                  target="_blank"
                >
                  1060 Lincoln Ave, Suite 20 #1071, San Jose, CA 95125, USA
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-heading text-xl uppercase font-lato font-extrabold">
              Website
            </h1>
            <ul className="flex flex-col gap-3">
              <li className="">
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/"}>Contact Us</Link>
              </li>
              <li>
                <Link href={"/"}>About Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-heading font-bold text-xl">Subscribe Now</h1>

            <p className="text-sm md:text-base text-paragraph mt-2">
              Don&apos;t miss our future updates! Get Subscribed Today!
            </p>

            <div className="flex items-center mt-8">
              <input
                className="w-[300px] h-[50px] p-4 rounded-[25px_0px_0px_25px] outline-blue-300 text-base placeholder:text-base"
                type="text"
                placeholder="Your mail here"
              />
              <Button className="w-10 h-[50px] bg-primary flex justify-center items-center rounded-[0px_25px_25px_0px]">
                {" "}
                <LuMessageSquareText size={22} className="text-white" />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <div className="w-full h-10 bg-secondary-background flex-center">
        <p className="text-white text-sm md:text-base">
          ©{new Date().getFullYear()}. Central Trademark Revival®. All Rights
          Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
