'use client'
import Slider from "react-slick";
import { cn } from "../../../lib/utils";
import Link from "next/link";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const MovingCards = ({ items }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("");

  const updateBreakpoint = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 640) {
      setCurrentBreakpoint("sm");
    } else if (screenWidth < 768) {
      setCurrentBreakpoint("md");
    } else if (screenWidth < 1024) {
      setCurrentBreakpoint("lg");
    } else if (screenWidth < 1280) {
      setCurrentBreakpoint("xl");
    } else {
      setCurrentBreakpoint("2xl");
    }
  };

  useEffect(() => {
    // Initial update
    updateBreakpoint();

    // Event listener for window resize
    window.addEventListener("resize", updateBreakpoint);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  function CustomArrows({ style,currentSlide, slideCount, ...props }) {
    const { className, onClick } = props;
    return (
      <div className="custom-arrows-container">
        <div
          style={{ ...style, display: "block", color: "green" }}
          className={`${className} custom-arrow prev`}
          onClick={onClick}
        />
        <div
          className={`${className} custom-arrow next`}
          onClick={onClick}
        />
      </div>
    );
  }

  const sliderSettings = {
    infinite: true,
    autoplay: false,
    slidesToShow: currentBreakpoint === "sm" ? 1 : 6,
    cssEase: "linear",
    nextArrow: <CustomArrows />,
    prevArrow: <CustomArrows />,
    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 1,
        },
      },
      // Add more breakpoints if needed
    ],
  };
      
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", top: 0, right: '10px', zIndex: 1 }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", top: 0, right: '40px', zIndex: 1 }}
        onClick={onClick}
      />
    );
  }


    function ServiceCard({ logo, title }) {
      return (
        <div style={{padding: 5, margin: 4}} className="z-2 flex flex-col px-6 pt-7 pb-4 w-full rounded-3xl border border-solid bg-neutral-200 border-[color:var(--gray,#B4BBC5)]">
          <img
            loading="lazy"
            src={logo}
            alt={title}
            className="self-center max-w-full aspect-square w-[122px]"
          />
          <div className="flex gap-2 justify-between mt-6 rounded-2xl bg-slate-900 transition-colors duration-400 ease-in-out hover:bg-teal-400">
            <div className="w-10 bg-teal-400 h-[100px] rounded-[44.5px] transition-all duration-400" />
            <div className="grow my-auto text-white">{title}</div>
          </div>
        </div>
      );
    }
  
    return (
      <div style={{ width: "98%", height: "100%", overflow: "hidden", padding: '30px' }}>
        <Slider {...sliderSettings}>
          {items.map((item, idx) => (
            <ServiceCard key={idx} logo={item.logo} title={item.title} />
          ))}
        </Slider>
      </div>
    );
  };



function ServicesOverview({ showCardOnly, ...props }) {
    const [currentBreakpoint, setCurrentBreakpoint] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServioces] = useState([])

    const updateBreakpoint = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth < 640) {
            setCurrentBreakpoint('sm');
        } else if (screenWidth < 768) {
            setCurrentBreakpoint('md');
        } else if (screenWidth < 1024) {
            setCurrentBreakpoint('lg');
        } else if (screenWidth < 1280) {
            setCurrentBreakpoint('xl');
        } else {
            setCurrentBreakpoint('2xl');
        }
    };

    useEffect(() => {
        // Initial update
        updateBreakpoint();

        // Event listener for window resize
        window.addEventListener('resize', updateBreakpoint);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateBreakpoint);
        };
    }, []);

    useEffect(()=>{
        axios.get('https://revive-production.up.railway.app/contents/services/')
        .then((res)=>{
            setServioces(res.data)
            setIsLoading(false)
        })
        .catch((err)=>{
            console.log(err)
            setIsLoading(false)
        })

    }, [])



    return (
        <section id="Explore Our Services" className="z-0 py-10 flex flex-col items-center px-10 font-medium text-center text-zinc-800">
             <div className=" mt-6 text-6xl font-medium text-center capitalize leading-[90px] text-zinc-800 max-md:max-w-full max-md:text-4xl max-md:leading-[62px]">
                {" "}
                Explore Our Services{" "}
              </div>

            {showCardOnly && <><header className="text-6xl capitalize leading-[90.24px] max-md:max-w-full max-md:text-4xl">
                {}
            </header>
                <Link href="/service">
                    <p className="z-0 m-10 flex gap-2 mt-12 text-xl leading-8 whitespace-nowrap max-md:mt-10">
                        Learn more
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bfbc1b225afd2242bc4bd8637be99c77ad22589c81ded1782921121e178198c?apiKey=7b91412e16384e1384258b56fe71fd0b&"
                            alt="Learn More Arrow"
                            className="z-0aspect-square rounded-[100px] w-[30px]"
                        />
                    </p>
                </Link>
            </>}
            <MovingCards items={services} />

        </section >
    );
}

export default ServicesOverview