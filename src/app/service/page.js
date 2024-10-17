"use client";
import * as React from "react";

import FooterComponent from "@/components/Footer";
import ServicesOverview from "@/components/ServicesOverview";
import NavBar from "@/components/header/Navbar";
import ContactBanner from "@/components/ContactBanner";

import CustomCursor from "../../components/CustomCursor";
import axios from "axios";

// const CallToActionButton = ({ text }) => (
//     <button className="relative overflow-hidden flex items-center justify-center py-2.5 px-6 mt-10 text-lg font-medium text-white border-2 border-white rounded-full group hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-all duration-300 ease-in-out">
//         <span className="absolute top-0 left-0 w-0 h-full bg-slate-900 group-hover:w-full transition-all duration-300 ease-linear"></span>
//         <span className="relative">{text}</span>
//     </button>
// );

// function ContactBanner() {
//     return (
//         <section className="rounded-2xl flex justify-center items-center px-16 py-20 text-white bg-slate-900 sm:px-5 mt-20 mb-20">
//             <div className="flex flex-col items-center mt-20 max-w-4xl w-full sm:mt-10">
//                 <h2 className="text-5xl font-bold text-center capitalize leading-tight sm:text-4xl sm:leading-normal">
//                     Ready to Start Work with Us?
//                 </h2>
//                 <CallToActionButton text="Contact Us" />
//             </div>
//         </section>
//     );
// }

function ServicePage(props) {
  const [services, setServices] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/contents/services/")
      .then((response) => {
        setServices(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <CustomCursor />
      <NavBar />
      <div className="relative">
        <div
          className="h-[500px] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/f3ca5a400afb3f9b1cc59b96a34e68c53ff0e420ab63ee977c08ff7ffbaef5e1?apiKey=7b91412e16384e1384258b56fe71fd0b')`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="relative text-white text-6xl font-bold">
              Our Services
              <span className="absolute inset-0 bg-white bg-opacity-10 blur-sm"></span>
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-10  flex flex-col bg-gray-200">
        <div className="flex-col items-center self-center w-full max-w-[1816px] max-md:max-w-full">
          <div className="m-10  flex z-10 gap-5 justify-between self-stretch mt-36 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col grow shrink-0 items-center px-5 basis-0 w-fit max-md:max-w-full">
              <div className="text-6xl font-medium text-center capitalize leading-[90px] text-zinc-800 max-md:max-w-full max-md:text-4xl max-md:leading-[62px]">
                Strategic Data Analytics Services: Elevating Your Business
                Intelligence
              </div>
              <div className="mt-10 text-xl font-medium leading-8 text-center text-zinc-800 max-md:max-w-full">
                {" "}
                At Revive Analytics, we empower large enterprises with
                meticulous data collection, fostering a data-driven culture for
                informed decision-making. Our services enable business owners to
                leverage cutting-edge data science techniques, unlocking
                valuable insights and predicting future outcomes. Transforming
                raw data into actionable intelligence, we are your partners in
                driving strategic success across your business.
              </div>
            </div>
          </div>
        </div>

        <ServicesOverview showCardsOnly={true} />
        <div className="mt-10 flex z-10 flex-col items-center self-center w-full max-w-[1816px] max-md:max-w-full">
          {/* Desktop Version */}
          <div className="hidden md:block w-full">
            {services.length > 0 &&
              services.map((service, number) => {
                if (number % 2 === 0) {
                  // Render content for even numbers
                  return (
                    <div
                      key={number}
                      className="grid grid-cols-3 border-t-2 border-black"
                    >
                      <div className="col-span-1 border-r-2 border-black p-10">
                        <img
                          loading="lazy"
                          src={service.image}
                          className="self-stretch my-auto w-full aspect-[0.81]"
                          alt={`Service ${number}`}
                        />
                      </div>
                      <div id={service.title} className="col-span-2">
                        <div className="text-zinc-800 p-10 flex flex-col flex-1 self-stretch my-auto">
                          <div className="flex flex-col grow px-5 pt-5 text-xl font-medium leading-8 text-zinc-800">
                            <div className="text-7xl leading-[97.2px]">
                              {service.title}
                            </div>
                            <div
                              className="text-zinc-800 p-10 flex flex-col flex-1 self-stretch my-auto"
                              dangerouslySetInnerHTML={{
                                __html: service.description,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  // Render content for odd numbers
                  return (
                    <div
                      key={number}
                      className="grid grid-cols-3 border-t-2 border-black"
                    >
                      <div className="col-span-2">
                        <div className="m-10 py-16 w-full max-w-[1406px]">
                          <div className="flex gap-5">
                            <div className="flex flex-col w-[69%]">
                              <div className="flex flex-col grow px-5 pt-5 text-xl font-medium leading-8 text-zinc-800">
                                <div className="text-7xl leading-[97.2px]">
                                  {service.title}
                                </div>
                                <div className="text-zinc-800 p-10 flex flex-col flex-1 self-stretch my-auto">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: service.description,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 border-l-2 border-black">
                        <img
                          loading="lazy"
                          src={service.image}
                          className="p-10 self-stretch my-auto w-full aspect-[0.8]"
                          alt={`Service ${number}`}
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </div>

          {/* Mobile Version */}
          <div className="block md:hidden w-full">
            {services.length > 0 &&
              services.map((service, number) => (
                <div key={number} className="border-t-2 border-black">
                  <div className="p-10">
                    <img
                      loading="lazy"
                      src={service.image}
                      className="w-full aspect-[0.81]"
                      alt={`Service ${number}`}
                    />
                  </div>
                  <div id={service.title} className="text-zinc-800 p-10">
                    <div className="text-xl font-medium leading-8 text-zinc-800">
                      <div className="text-4xl">{service.title}</div>
                      <div
                        className="p-10"
                        dangerouslySetInnerHTML={{
                          __html: service.description,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex  bg-gray-200">
          <div className=" container mx-auto ">
            <ContactBanner />
          </div>{" "}
        </div>
        <div>
          <FooterComponent />
        </div>
      </div>
    </>
  );
}
export default ServicePage;
