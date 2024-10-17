"use client";
import * as React from "react";
import FooterComponent from "@/components/Footer";
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

function ImpactPage(props) {
  const [impact, setImpact] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/contents/impacts/")
      .then((response) => {
        setImpact(response.data);
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
      <div className="flex flex-col bg-gray-200">
        <NavBar />
        {/* <div
                    className="h-[500px] bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/c3b3a896fa42a22aa7b48af8bd76108a480723a490233d47c8e8413d2e6fc314?apiKey=7b91412e16384e1384258b56fe71fd0b')` }}></div> */}

        <div className="relative">
          <div
            className="h-[500px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/c3b3a896fa42a22aa7b48af8bd76108a480723a490233d47c8e8413d2e6fc314?apiKey=7b91412e16384e1384258b56fe71fd0b')`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="relative text-white text-6xl font-bold">
                Impact
                <span className="absolute inset-0 bg-white bg-opacity-10 blur-sm"></span>
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex gap-5 justify-between self-center mt-32 w-full text-center max-w-[1663px] text-zinc-800 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1 px-5 max-md:max-w-full">
              <div className="text-6xl font-bold capitalize leading-[90px] max-md:max-w-full max-md:text-4xl max-md:leading-[62px]">
                Our Impact: Driving Strategic Success Through Data Excellence
              </div>
              <div className="mt-10 text-xl font-medium leading-8 max-md:max-w-full">
                {" "}
                Welcome to Revive Analytics, where our Strategic Data Analytics
                Services have left an indelible mark on large enterprises. Our
                commitment to meticulous data collection and fostering a robust
                data-driven culture has become synonymous with informed
                decision-making. Dive into the transformative impact of our
                services and discover how we've partnered with businesses like
                yours to elevate intelligence and drive strategic success.
                <br />
              </div>
            </div>
            {/* <div className="shrink-0 self-end mt-32 w-16 bg-teal-400 rounded-3xl h-[188px] max-md:mt-10" /> */}
          </div>
        </div>
        {impact.length > 0 &&
          impact.map((imp, index) => {
            const isOdd = (index + 1) % 2 === 0;
            return (
              <div
                id={imp.title}
                key={index}
                className={`flex justify-center items-center w-full px-16 py-16 mt-36 ${
                  isOdd ? "bg-blue-100" : "bg-white"
                } bg-opacity-50 max-md:px-5 max-md:mt-10 max-md:max-w-full`}
              >
                <div className="justify-center w-full max-w-[1406px] max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col pt-6 pb-1 text-zinc-800 max-md:mt-10 max-md:max-w-full">
                        <div className="text-6xl font-medium capitalize leading-[90.24px] max-md:max-w-full max-md:text-4xl">
                          {imp.title}
                        </div>
                        <div className="mt-28 text-3xl leading-10 max-md:mt-10 max-md:max-w-full">
                          {imp.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        src={imp.image}
                        className="grow w-full aspect-[1.33] max-md:mt-10 max-md:max-w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* <div className="flex justify-center items-center px-16 py-16 w-full bg-white bg-opacity-50 max-md:px-5 max-md:max-w-full">
                    <div className="justify-center w-full max-w-[1406px] max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col pt-6 pb-1 text-zinc-800 max-md:mt-10 max-md:max-w-full">
                                    <div className="text-6xl font-medium capitalize leading-[90.24px] max-md:max-w-full max-md:text-4xl">
                                        Banking & Financial
                                    </div>
                                    <div className="mt-28 text-3xl leading-10 max-md:mt-10 max-md:max-w-full">
                                        Enable banks & financial organizations to track key performance indicators (KPIs) &  monitor financial performance to identify areas for improvements. Helping banks to prevent fraud by analyzing customer data, spending patterns & transaction history to protect their customers' assets.
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
                                <img
                                    loading="lazy"
                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c3efaca91ce7c481e79aac0a382bb8b608890e46cff5de74a63555be1680d8f2?apiKey=7b91412e16384e1384258b56fe71fd0b"
                                    className="grow w-full aspect-[1.33] max-md:mt-10 max-md:max-w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
               */}
      </div>
      <div className="flex  bg-gray-200">
        <div className=" container mx-auto ">
          <ContactBanner />
        </div>{" "}
      </div>
      <div>
        <FooterComponent />
      </div>
    </>
  );
}

export default ImpactPage;
