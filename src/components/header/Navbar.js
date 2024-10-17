"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const ahrefLink = "https://reviveanalytics.com";

const menuItems = [
  {
    name: "Services",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e638058ba0ad6005dac9060257e43b80817ed473041a4ea507138a7b0dc943a0?apiKey=7b91412e16384e1384258b56fe71fd0b&",
    alt: "Services icon",
    link: "/service",
    submenu: [
      "Data-Analytics",
      "Business-Intelligence",
      "Cloud Migration",
      "Consultancy Services",
      "UI/UX Design & Development",
      "Training",
    ],
    aherf: ahrefLink + "/service",
  },
  {
    name: "Impact",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/092c32c67a6d461e2eda972aa1a9d2a6a6db92f52933ea38921a880302ac248c?apiKey=7b91412e16384e1384258b56fe71fd0b&",
    alt: "Impact icon",
    link: "/impact",
    submenu: [
      "Aviation",
      "Banking & Financial",
      "Manufacturing",
      "Telecom",
    ],
    aherf: ahrefLink + "/impact",

  },
  {
    name: "Blog",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/9a9b0c1dc44c8698d056a370b82c32de7fb61751aeca1e57036260647ec5043d?apiKey=7b91412e16384e1384258b56fe71fd0b&",
    alt: "Blog icon",
    link: "/blog",
  },
  {
    name: "About Us",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/9eda2b8ccad79424a1d7993d3556b27c3a916ead0352b46c96b426e75ceb5ebb?apiKey=7b91412e16384e1384258b56fe71fd0b&",
    alt: "About us icon",
    link: "/about",
    submenu: ["Our Story", "Leadership", "Careers"],
    aherf: ahrefLink + "/about",
  },
];

const MenuItem = ({ name, imageSrc, alt, link, links }) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsActive(window.location.pathname === link);
    }
  }, [link]);

  return (
    <div
      className="relative z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={link}>
        <div className={`flex gap-1.5 justify-between p-1 ${isActive ? "text-teal-600 underline" : ""}`}>
          <div className="grow text-teal-400">{name}</div>
        </div>
      </Link>
      {/* {links && links.length > 0 && (
            <div className={`absolute z-[9999] left-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg  ${isHovered ? "block" : "hidden"}`}>
          {links.map((subLink, idx) => (
            <Link key={idx} href={`${link}/${subLink.toLowerCase().replace(/ /g, '-')}`}>
              <div className="z-50 hover:z-50 px-4 py-2 text-gray-700 hover:bg-gray-100">{subLink}</div>
            </Link>
          ))}
        </div>
      )} */}
    </div>
  );
};


const Mobile = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="-0 flex flex-col justify-center px-4 py-2.5 w-full text-base leading-6 whitespace-nowrap backdrop-blur-[10px] bg-white bg-opacity-50 max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-5 justify-between mx-4 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
        <Link href="/">
          <img
            loading="lazy"
            src="https://i.ibb.co/YcF4qP1/Frame-46-1.png"
            alt="Company logo"
            className="max-w-full aspect-[2.04] w-[119px]"
          />
        </Link>
        <div className="flex items-center gap-5 self-start max-md:flex-wrap max-md:max-w-full">
          {/* Hamburger menu icon */}
          <button
            className="text-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={toggleMenu}
          >
            &#9776;
          </button>

          {/* Menu items */}
          {isMenuOpen && (
            <div className="flex gap-5 justify-between my-auto text-neutral-900 max-md:flex-wrap max-md:max-w-full">
              {menuItems.map((item, index) => (
                <MenuItem
                  org={item}
                  key={`menu-item-${index}`}
                  name={item.name}
                  imageSrc={item.imageSrc}
                  alt={item.alt}
                  link={item.link}
                  links={item}
                />
              ))}
            </div>
          )}

          {/* Contact us button */}
          <Link href="/contact">
            <button className="justify-center px-6 py-3.5 bg-teal-400 rounded-full text-zinc-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 max-md:px-5">
              Contact us
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

const Desktop = () => {
  return (
    <header className=" px-10 flex flex-col justify-center py-2.5 w-full text-base leading-6 whitespace-nowrap backdrop-blur-[10px] bg-white bg-opacity-10 max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-5 justify-between mx-2 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
        <div className="flex items-center group">
          <Link href="/">
            <img
              loading="lazy"
              src="https://i.ibb.co/YcF4qP1/Frame-46-1.png"
              alt="Revive"
              className="max-w-full aspect-[2.04] w-[119px]"
            />
          </Link>
          <div className="ml-4 text-2xl text-gray-700 font-bold -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
            <img
              loading="lazy"
              src="https://i.ibb.co/9rpt7NS/rev-logo.png"
              alt="Revive"
              className="max-w-full aspect-[2.04] w-[119px]"
            />
          </div>
        </div>
        <div className="flex gap-5 justify-between self-start max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 justify-between my-auto text-neutral-900 max-md:flex-wrap max-md:max-w-full">
            {menuItems.map((item, index) => (
              <MenuItem
                org={item}
                key={`menu-item-${index}`}
                name={item.name}
                imageSrc={item.imageSrc}
                alt={item.alt}
                link={item.link}
                links={item.submenu}
              />
            ))}
          </div>
          <Link href="/contact">
            <button className=" justify-center px-6 py-3.5 bg-teal-400 rounded-full font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 max-md:px-5">
              CONTACT US
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className=" fixed top-0 right-0 z-50">
        {" "}
        {/* z-50 or any value higher than other elements */}
        <div className="cursor-pointer shadow-sm bg-teal-400 rounded-l-3xl min-h-[128px] fixed top-1/2 transform -translate-y-1/2 right-0 -mr-7 flex items-center">
          <Link href="/contact">
            <p className="transform rotate-90 text-black text-2xl">Enquiry</p>
          </Link>
        </div>
      </div>

      <div className="hidden max-md:block">
        <Mobile />
      </div>
      <div className="block max-md:hidden">
        <Desktop />
      </div>
    </>
  );
};

export default NavBar;
