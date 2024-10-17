"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SliderPage from "./Slider";
import FooterComponent from "../Footer";
import ContactBanner from "@/components/ContactBanner";
import Link from "next/link";
import ServicesOverview from "../ServicesOverview";
import ClientTestimonials from "../ClientTestimonials";
import axiosInstance from "@/utils";
import axios from "axios";
const gradientStyle = {
  backgroundImage: "linear-gradient(126deg, #1862F7 -107.15%, #3DD6C4 98.8%)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const FAQItem = ({ question, answer, altText }) => {
  function ContentSection({ children }) {
    return (
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden m-2">
        <div className="p-4">
          <p className="text-gray-700 leading-relaxed">
            <section
              className="mt-5 leading-6 text-zinc-800 max-md:mr-2.5 max-md:max-w-full"
              dangerouslySetInnerHTML={{ __html: children }}
            ></section>
          </p>
        </div>
      </div>
    );
  }

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div
        className={` ${
          isOpen ? "bg-slate-900 text-white-800" : " text-zinc-800"
        } flex gap-5 justify-between p-6 rounded-xl bg-neutral-200 leading-[139%] shadow-md max-md:flex-wrap max-md:px-5 max-md:max-w-full m-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`grow max-md:max-w-full`}>{question}</div>
        <img
          loading="lazy"
          src={
            isOpen
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/74c5ffa3f4ecb2df47b36a416f986dfece4532cc3064473b39943b11324162e1?apiKey=7b91412e16384e1384258b56fe71fd0b&"
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/d461bfd4dfe869395638b7b243343de4ae542709cb60eb5abecc69569d67f1c6?apiKey=7b91412e16384e1384258b56fe71fd0b&"
          }
          alt={altText}
          className="self-start w-6 aspect-square"
        />
      </div>
      {isOpen && (
        <div className="mt-2 px-6 max-md:px-5">
          <ContentSection> {answer} </ContentSection>
          {/* <div className="text-left text-zinc-800"></div> */}
        </div>
      )}
    </div>
  );
};

const FAQsPage = () => {
  const [faqs, setFaqs] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/contents/faqs/")
      .then((res) => {
        setFaqs(res.data);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setIsLoading(false);
      });
  }, []);

  return (
    <section
      id="Frequently asked questions"
      className="flex justify-center items-center px-16 py-12 max-md:px-5 bg-gradient-to-br from-teal-200 to-teal-900 rounded-3xl container mx-auto mt-[144px] mb-[144px] "
    >
      <div className="mt-2.5 w-full max-w-[1406px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="w-full max-md:ml-0 max-md:w-full">
            <header className="flex flex-col text-zinc-800 max-md:mt-10 max-md:max-w-full">
              <h1 className="text-6xl font-medium capitalize leading-[90px] max-md:max-w-full max-md:text-4xl max-md:leading-[62px]">
                Frequently <br /> asked <br />
                questions
              </h1>

              {/* <p className="mt-8 text-lg leading-6 max-md:max-w-full">
                                Aenean quis est erat. Pellentesque pretium convallis ligula,
                                vite euismod nisl vehicula non. In felis leo, faucibus vel
                                sagittis pharetra, varius ullamcorper quam.
                            </p> */}
            </header>
          </div>
          <div className="ml-5 w-full max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow w-full text-lg rounded-3xl backdrop-blur-[25px] bg-black bg-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
              {faqs?.map(({ question, answer }, index) => (
                <FAQItem
                  key={index}
                  question={question}
                  answer={answer}
                  altText={question}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const gradientBorderStyle = {
  borderImage: "linear-gradient(126deg, #1862F7 -107.15%, #3DD6C4 98.8%)",
  borderImageSlice: 1,
};

function Header() {
  const [data, setData] = React.useState([]);
  const [orderOne, setOrderOne] = React.useState([]);
  const [orderTwo, setOrderTwo] = React.useState([]);
  const [orderThree, setOrderThree] = React.useState([]);
  const [orderFour, setOrderFour] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchSection = () => {
    setIsLoading(true);
    axios
      .get("https://revive-production.up.railway.app/contents/home/")
      .then((response) => {
        if (response.data.length) {
          const orderOne = response.data.find((section) => section.order === 0);
          const orderTwo = response.data.find((section) => section.order === 1);
          const orderThree = response.data.find(
            (section) => section.order === 2
          );
          const orderFour = response.data.find(
            (section) => section.order === 3
          );
          setOrderOne(orderOne);
          setOrderTwo(orderTwo);
          setOrderThree(orderThree);
          setOrderFour(orderFour);
        }

        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchSection();
  }, []);



  const [clientTestimonials, setClientTestimonials] = useState([]);

  useEffect(() => {
    axios.get("https://revive-production.up.railway.app/contents/testimonials/")
    .then(response => {
      console.log("clientTestimonials", response.data)
      setClientTestimonials(response.data)
    })
  }, [])





  return (
    <>
      <Navbar />
      <SliderPage />
      <div className=" container mx-auto">
        <div className="flex flex-col container mx-auto"></div>
        <div className="bg-gray-900 h-0.5 max-w-[1712px] mt-[144px] mx-auto w-full"></div>

        <div className="relative flex flex-col items-center">
          <div
            className="w-full max-w-[1712px] h-[80px] bg-cover bg-center stroke-[2px] stroke-neutral-900 max-md:max-w-full"
            // style={{
            //     backgroundImage: `url('your-left-image-url')`,
            // }}
          ></div>

          <div className="container mx-auto">
            <div className="relative flex z-10 gap-0 justify-between items-start self-stretch max-md:flex-wrap max-md:max-w-full">
              <img
                loading="lazy"
                srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/829a41dc3082130c8c50f30eb2df79ef422d1a471bf78c7b04c11b0bc1f63c12?apiKey=7b91412e16384e1384258b56fe71fd0b&"
                className="absolute self-start -ml-20 w-64 max-w-full aspect-[0.37]"
              />
              {orderOne && (
                <div className="flex flex-col flex-1 self-end px-5 max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col flex-1 self-end px-5 max-md:mt-10 max-md:max-w-full">
                    <div
                      id="Who are we"
                      className="justify-center self-center px-7 py-1 text-xl font-medium leading-8 text-center border-2 border-solid border-[color:var(--gradient-linear,#1862F7)] rounded-[40px] text-zinc-800 max-md:px-5 "
                    >
                      {orderOne?.title}
                    </div>

                    <div className="mt-10 text-6xl font-medium text-center capitalize leading-[90px] text-zinc-800 max-md:max-w-full max-md:text-4xl max-md:leading-[62px]">
                      {orderOne?.subtitle}
                    </div>
                    <div className="mt-10 text-xl font-medium leading-8 text-center text-zinc-800 max-md:max-w-full">
                      {orderOne?.description}
                    </div>
                    <div className="flex justify-center text-zinc-800 ">
                      <Link href="/about">
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
                    </div>

                    <div className="mt-28 max-md:mt-10 max-md:pr-5 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-3/12 max-md:w-full max-md:ml-0">
                          {orderOne?.images?.[0] && (
                            <img
                              loading="lazy"
                              srcSet={orderOne?.images?.[0].image}
                              className="grow max-w-full aspect-[0.9] w-[348px] max-md:mt-5"
                            />
                          )}
                        </div>
                        <div className="flex flex-col w-[49%] ml-5 max-md:w-full max-md:ml-0">
                          <div className="flex flex-col grow justify-center w-full rounded-3xl bg-neutral-900 max-md:mt-5 max-md:max-w-full">
                            {orderOne?.images?.[1] && (
                              <img
                                loading="lazy"
                                srcSet={orderOne.images?.[1].image}
                                className="w-full rounded-3xl mix-blend-difference aspect-[1.75] max-md:max-w-full"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col w-3/12 ml-5 max-md:w-full max-md:ml-0">
                          {orderOne?.images?.[2] && (
                            <img
                              loading="lazy"
                              srcSet={orderOne.images?.[2].image}
                              className="grow max-w-full aspect-[0.9] w-[347px] max-md:mt-5"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-900 h-0.5 max-w-[1712px] mt-[144px]  mx-auto w-full"></div>

        {orderTwo && (
          <div className="container mx-auto">
            <div className="flex flex-col items-center px-10">
              <div
                id="What we do"
                className="justify-center px-7 py-1 mt-24 text-xl font-medium leading-8 text-center whitespace-nowrap border-2 border-solid border-[color:var(--gradient-linear,#1862F7)] rounded-[40px] text-zinc-800 max-md:px-5 max-md:mt-10"
              >
                {orderTwo?.title}
              </div>
              <div className="mt-10 text-6xl font-medium text-center capitalize leading-[90.24px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
                {orderTwo?.subtitle}
              </div>
              <div className="mt-10 text-xl font-medium leading-8 text-center text-zinc-800 max-md:max-w-full">
                {orderTwo?.description}
              </div>
              <div className="mt-10 w-full max-w-[1406px] max-md:max-w-full">
                <div className="flex gap-1.25 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-white max-md:mt-5 max-md:max-w-full">
                      <div className="flex flex-col px-10 py-10 rounded-3xl border border-solid backdrop-blur-[50px] bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] border-[color:var(--text-color,#FFF)] max-md:px-5 max-md:max-w-full">
                        <div className="text-5xl font-medium tracking-wide capitalize leading-[68px] max-md:text-4xl max-md:leading-[63px]">
                          {orderTwo?.cards?.[0]?.title}
                        </div>
                        <div className="mt-10 text-lg leading-6">
                          {orderTwo?.cards?.[0]?.description}
                        </div>
                      </div>
                      <div className="flex flex-col px-10 py-9 mt-5 rounded-3xl border border-solid backdrop-blur-[50px] bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] border-[color:var(--text-color,#FFF)] max-md:px-5 max-md:max-w-full">
                        <div className="text-5xl font-medium tracking-wide capitalize leading-[68px] max-md:text-4xl max-md:leading-[63px]">
                          {orderTwo?.cards?.[1]?.title}
                        </div>
                        <div className="mt-8 text-base leading-6">
                          {orderTwo?.cards?.[1]?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      src={orderTwo?.images?.[0].image}
                      className=" rounded-3xl grow w-full aspect-[0.69] max-md:mt-5 max-md:max-w-full"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-white max-md:mt-5 max-md:max-w-full">
                      <div className="flex flex-col px-10 pt-9 pb-6 rounded-3xl bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] max-md:px-5 max-md:max-w-full">
                        <div className="text-5xl font-medium tracking-wide capitalize leading-[68px] max-md:text-4xl max-md:leading-[63px]">
                          {orderTwo?.cards?.[2]?.title}
                        </div>
                        <div className="mt-12 text-lg leading-6 max-md:mt-10 ">
                          {orderTwo?.cards?.[2]?.description}
                        </div>
                      </div>
                      <div className="flex flex-col px-10 py-11 mt-5 rounded-3xl bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] max-md:px-5 max-md:max-w-full">
                        <div className="text-5xl font-medium tracking-wide capitalize leading-[68px] max-md:text-4xl max-md:leading-[63px]">
                          {orderTwo?.cards?.[3]?.title}
                        </div>
                        <div className="mt-10 mb-3.5 text-base leading-6">
                          {orderTwo?.cards?.[3]?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col px-5 ">
              <div className="bg-gray-900 h-0.5 max-w-[1712px]  mt-[144px]  mx-auto w-full"></div>

              <div
                id="Specialties and Expertise"
                className="justify-center px-7 py-1 mt-24 text-xl font-medium leading-8 self-center whitespace-nowrap border-2 border-solid border-[color:var(--gradient-linear,#1862F7)] rounded-[40px] text-zinc-800 max-md:px-5 max-md:mt-10"
              >
                {orderThree?.title}
              </div>
              <div className="self-end mt-10 text-6xl font-medium text-center capitalize leading-[90px] text-zinc-800 max-md:max-w-full max-md:text-4xl max-md:leading-[62px]">
                {" "}
                {orderThree?.subtitle}
              </div>
              <div className="self-end mt-10 text-2xl font-medium leading-8 text-center text-zinc-800 max-md:max-w-full">
                {" "}
                {orderThree?.description}
              </div>
            </div>

            <main className="block max-md:hidden self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full mt-20">
              <section className="w-[1100px] flex flex-row flex-wrap items-start justify-start gap-[0px_20px] max-w-full">
                <div className=" flex-1 flex flex-col items-start justify-start pt-[213px] px-0 pb-0 box-border min-w-[285px] max-w-full mq750:pt-[90px] mq750:box-border mq1125:pt-[138px] mq1125:box-border">
                  <div className="self-stretch h-[790px] flex flex-col items-start justify-start gap-[20px_0px]">
                    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[0.88]">
                      <img
                        className="self-stretch flex-1 rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                        loading="lazy"
                        alt=""
                        src={orderThree?.images?.[5].image || ""}
                      />
                      {orderThree?.images?.[5].title && (
                        <div className="absolute text-center bottom-0 left-0 right-0 px-14 pb-3.5 bg-opacity-35 bg-black text-white rounded-b-xl">
                          {orderThree?.images?.[5].title}
                        </div>
                      )}
                    </div>
                    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[0.88]">
                      <img
                        className="self-stretch flex-1 relative rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                        loading="lazy"
                        alt=""
                        src={orderThree?.images?.[4].image || ""}
                      />
                      {orderThree?.images?.[4].title && (
                        <div className="absolute text-center rounded-xl r bottom-0 left-0 right-0 px-14 pb-3.5 bg-opacity-35 bg-black text-white rounded-b-xl">
                          {orderThree?.images?.[4].title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[20px_0px] min-w-[285px] max-w-full">
                  <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[0.88]">
                    <img
                      className="self-stretch h-[435px]  rounded-xl relative max-w-full overflow-hidden object-cover rounded-b-xl"
                      loading="lazy"
                      alt=""
                      src={orderThree?.images?.[0].image || ""}
                    />
                    {orderThree?.images?.[0].title && (
                      <div className="absolute text-center bottom-0 left-0 right-0 px-14 pb-3.5 bg-opacity-35 bg-black text-white rounded-b-xl">
                        {orderThree?.images?.[0].title}
                      </div>
                    )}
                  </div>
                  <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[0.88]">
                    <img
                      className="self-stretch h-[436px] relative rounded-xl max-w-full overflow-hidden object-cover"
                      loading="lazy"
                      alt=""
                      src={orderThree?.images?.[1].image || ""}
                    />
                    {orderThree?.images?.[1].title && (
                      <div className="absolute text-center bottom-0 left-0 right-0 px-14 pb-3.5 bg-opacity-35 bg-black text-white rounded-b-xl">
                        {orderThree?.images?.[1].title}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-[223px] px-0 pb-0 box-border min-w-[285px] max-w-full mq750:pt-[94px] mq750:box-border mq1125:pt-[145px] mq1125:box-border">
                  <div className="self-stretch h-[790px] flex flex-col items-start justify-start gap-[20px_0px]">
                    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[0.88]">
                      <img
                        className="self-stretch flex-1 relative rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                        loading="lazy"
                        alt=""
                        src={orderThree?.images?.[3].image || ""}
                      />
                      {orderThree?.images?.[3].title && (
                        <div className="absolute text-center bottom-0 left-0 right-0 px-14 pb-3.5 bg-opacity-35 bg-black text-white rounded-b-xl">
                          {orderThree?.images?.[3].title}
                        </div>
                      )}
                    </div>
                    <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-[0.88]">
                      <img
                        className="self-stretch flex-1 relative rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                        loading="lazy"
                        alt=""
                        src={orderThree?.images?.[2].image || ""}
                      />
                      {orderThree?.images?.[2].title && (
                        <div className="absolute text-center bottom-0 left-0 right-0 px-14 pb-3.5 bg-opacity-35 bg-black text-white rounded-b-xl">
                          {orderThree?.images?.[2].title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        )}
        <div className="bg-gray-900 h-0.5 max-w-[1712px] mt-[144px]  mx-auto w-full"></div>

        <ServicesOverview showCardOnly={true} />
        <div className="bg-gray-900 h-0.5 max-w-[1712px] mt-[144px]  mx-auto w-full"></div>

        <ClientTestimonials orderFour={orderFour} data={clientTestimonials} />

        <div className="mx-auto container">
          <ContactBanner />
        </div>
        <FAQsPage />
      </div>
      <FooterComponent />
    </>
  );
}

export default Header;
