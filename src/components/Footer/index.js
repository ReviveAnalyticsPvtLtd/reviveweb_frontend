import axios from "axios";
import Link from "next/link";
import { useState,useEffect } from "react";
export const gradientStyle = {
  backgroundImage: "linear-gradient(126deg, #1862F7 -107.15%, #3DD6C4 98.8%)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

// Define the section header component for reusable headings
const SectionHeader = ({ title, link }) => {
  // <h1 class="text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">A Guide to Adding Gradients with Tailwind CSS</h1>
  return (
    <Link href={link || "#"}>
      <div
        style={gradientStyle}
        className="text-xl font-medium leading-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-teal-300"
      >
        {title}
      </div>
    </Link>
  );
};

// Define the navigation link component for reusable navigation links
const NavLink = (props) => 
 {
  console.log("props", props)
  if(props.realLink === "https://reviveanalytics.com/about" && props.link === "Careers") {
    return ( <a href={`https://reviveanalytics.com/careers`} className="mt-5 text-gray-400">
       Join Us
      </a>)
  }

    return ( <a href={`${props.realLink}#${props.link}`} className="mt-5 text-gray-400">
     {props.link.replace(/-/g, " ")}
      </a>)
 }


const FooterSocial = () => {

    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
       axios.get("https://revive-production.up.railway.app/contents/socials/")

        .then(response => {
            console.log("response", response.data)
            setSocialLinks(response.data)
        })
    }, [])

   const handleOnclick = (link) => {

      const socialLink = socialLinks?.find(socialLink => socialLink.platform === link)
      if(typeof window !== "undefined") {
        window.open(socialLink.url, "_blank")
      }
    }

  return (
    <>
      <div className="flex flex-col max-w-[44px]">
        <div onClick={()=> {handleOnclick("FACEBOOK")}} className="flex justify-center items-center px-3 w-full h-11 rounded-md bg-white bg-opacity-10">
          <img

            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f839c7291cb7b2d50075c719460fe5cb7193963e07c08b97532567d6c5f0f4c9?apiKey=7b91412e16384e1384258b56fe71fd0b&"
            className="cursor-pointer w-5 aspect-square"
          />
        </div>
        <div onClick={()=> {handleOnclick("TWITTER")}} className="flex justify-center items-center px-3 mt-5 w-full h-11 rounded-md bg-white bg-opacity-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e5eeb5fa40317830d03bea1152b67e4ba8ae454b8b9267516cd912376eb4a8e?apiKey=7b91412e16384e1384258b56fe71fd0b&"
            className="cursor-pointer  w-5 aspect-square"
          />
        </div>
        <div onClick={()=> {handleOnclick("LINKEDIN")}} className="flex justify-center items-center px-3 mt-5 w-full h-11 rounded-md bg-white bg-opacity-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f7d6fba42f2f758048735edc38eaecc6ac51ac993446c79006b8414e693caca?apiKey=7b91412e16384e1384258b56fe71fd0b&"
            className="cursor-pointer  w-5 aspect-square"
          />
        </div>
        <div onClick={()=> {handleOnclick("INSTAGRAM")}} className="flex justify-center items-center px-3 mt-5 w-full h-11 rounded-md bg-white bg-opacity-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/abe5856993ba501613e6069fae2aec89872e0e30a71d65338eadc0da4bef2392?apiKey=7b91412e16384e1384258b56fe71fd0b&"
            className="cursor-pointer  w-5 aspect-square"
          />
        </div>
      </div>
    </>
  );
};

const FooterComponent = () => {
  const ahrefLink = "https://reviveanalytics.com";
  // Define the navigation categories with their respective links
  const categories = [
    {
      title: "HOME",
      links: [
        "Who are we",
        "What we do",
        "Specialties and Expertise",
        "Explore Our Services",
        "Testimonials",
        "Frequently asked questions",
      ],
      aherf: ahrefLink + "/",
    },
    {
      title: "SERVICES",
      links: [
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
      title: "IMPACT",
      links: [
        "Aviation",
        "Banking & Financial",
        "Manufacturing",
        "Telecom",
      ],
      aherf: ahrefLink + "/impact",
    },
    // {
    //   title: "BLOG",
    //   links: ["Main Blog 1", "Main Blog 2", "Main Blog 3", "Main Blog 4"],
    //   aherf: ahrefLink +  "/blog",
    // },
    {
      title: "ABOUT US",
      links: ["Our Story", "Leadership", "Careers"],
      aherf: ahrefLink + "/about",
    },
    {
      title: "Contact Us",
      links: ["Business", "Careers"],
      aherf: ahrefLink + "/contact",
    },
  ];
  return (
    <div className="flex flex-col bg-stone-950 pr-20  pl-20">
      <div className="flex justify-end relative p-4 md:p-10 sm:p-0">
        <svg
          width="23"
          height="154"
          viewBox="0 0 23 154"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0"
        >
          <rect width="23" height="154" fill="url(#paint0_linear_1806_970)" />
          <defs>
            <linearGradient
              id="paint0_linear_1806_970"
              x1="-24.9031"
              y1="-162.649"
              x2="56.2932"
              y2="-153.738"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1862F7" />
              <stop offset="1" stopColor="#3DD6C4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <header className="flex flex-col self-center px-4 md:px-5 w-full max-w-[1712px] md:max-w-full">
        <nav className="flex gap-5 justify-between items-start flex-wrap w-full md:flex-no-wrap">
          <div className="mt-10 md:mt-0 mr-4 md:mr-10">
            <div className="flex gap-0 justify-between pr-4 md:pr-5">
              <div className="flex items-center group">
                <Link href="/">
                  <img
                    loading="lazy"
                    src="https://i.ibb.co/YcF4qP1/Frame-46-1.png"
                    alt="Revive"
                    className="max-w-full aspect-[2.04] w-[119px]"
                  />
                </Link>
                <div className=" ml-4 text-2xl text-white-700 font-bold -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
                  <img
                    loading="lazy"
                    src="https://i.ibb.co/9rpt7NS/rev-logo.png"
                    alt="Revive"
                    className="max-w-full aspect-[2.04] w-[119px]"
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 md:mt-8 text-base leading-6 text-gray-400">
              We specialize in customized data analytics <br />solutions and strategic
              partnerships with industry leaders.
            </p>
            <address className="not-italic mt-8 md:mt-10 text-base font-medium leading-6 text-gray-400 whitespace-nowrap">
              <span>connect@reviveanalytics.com</span>
            </address>

            <p className="mt-4 md:mt-5 text-lg  leading-6 text-gray-400">
              11403 West Berry PI <br /> Jefferson County, <br /> CO 80127,
              United States
            </p>
          </div>
          {categories.map((category, index) => (
            <section key={index} className="flex flex-col flex-1 mt-4 md:mt-0">
              <SectionHeader title={category.title} link={category.aherf} />
              {category.links.map((link, linkIndex) => {
                return <NavLink realLink={category.aherf}  key={linkIndex}
                    link={link}
                />;
              })}
            </section>
          ))}
        </nav>
      </header>

      <footer className="block max-md:hidden self-end text-base font-medium leading-6 mt-4 md:mt-0 whitespace-nowrap bg-clip-text bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)]">
        <SectionHeader title="  Get in touch  " />
      </footer>

      <div className="flex justify-end mt-2 md:mt-5 mb-5 ">
        <FooterSocial />
      </div>
      <div className="mt-5 mb-5 flex gap-5 px-5 text-base leading-6 text-left text-white max-md:flex-wrap">
      <div className="flex-auto">© 2015 - Revive Analytics</div>
      <div className="flex gap-5">
        <div className="flex-auto"><Link
        href={`${ahrefLink}/tos`}
        >Terms and Conditions</Link></div>
        <div><Link
        href={`${ahrefLink}/privacy`}
        > Privacy policy</Link></div>
      </div>
    </div>
    </div>
  );
};

//New Adress to be changed!
// Revive Analytics Inc.
// 11403 West Berry PI
// Littleton, Jefferson County, CO 80127, United States

export default FooterComponent;
