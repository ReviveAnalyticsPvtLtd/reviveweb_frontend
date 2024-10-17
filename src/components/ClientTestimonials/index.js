"use client";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, use } from "react";
import axios from "axios";


// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};


const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 245;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const plainTextContent = stripHtmlTags(testimonial?.comment || '');
  const shouldTruncate = plainTextContent.length > characterLimit;
  const truncatedHtml = shouldTruncate 
    ? `${testimonial?.comment.slice(0, characterLimit)}...` 
    : testimonial?.comment;

  return (
    <div className="p-6">
      <div className="max-h-full p-8 text-2xl leading-8 text-white rounded-3xl border-solid bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] border-[1.289px] border-[color:var(--stroke-white,#E1E8ED)] max-md:px-5 max-md:mt-5 max-md:max-w-full h-full">
      <div className="font-bold max-md:max-w-full">{testimonial.title}</div>
        <div className="mt-4 leading-7 max-md:max-w-full">
          <div dangerouslySetInnerHTML={{ __html: isExpanded ? testimonial?.comment : truncatedHtml }}></div>
          {shouldTruncate && (
            <button 
              style={{fontSize: '16px'}}
              onClick={toggleExpand} 
              className="text-blue-500 underline mt-2"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
        <div className="mt-2 max-md:max-w-full">{testimonial?.name}</div>
      </div>
    </div>
  );
};
function ClientTestimonials({ data, orderFour }) {

  console.log("clientTestimonials", data);
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

  const sliderSettings = {
    infinite: true,
    autoplay: true,
    slidesToShow: currentBreakpoint === "sm" ? 1 : 3,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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

  return (
    <div className="flex flex-col items-center px-5 overflow-x-auto ">
      <section
        id="Testimonials"
        className="mt-24 justify-center px-7 py-3 text-lg leading-6 text-center whitespace-nowrap border-2 border-solid border-[color:var(--gradient-linear,#1862F7)] rounded-[40px] text-zinc-800 max-md:px-5 max-md:mt-10"
      >
        {orderFour?.title}
      </section>
      <h2 className="mt-16 text-6xl font-medium text-center capitalize leading-[90.24px] text-zinc-800 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        {orderFour?.subtitle}
      </h2>
      <main className="self-stretch mt-12 w-full max-md:mt-10 max-md:max-w-full overflow-x-auto">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div style={{ width: "98%", height: "100%", overflow: "hidden" }}>
            <Slider {...sliderSettings}>
              {data?.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </Slider>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClientTestimonials;
