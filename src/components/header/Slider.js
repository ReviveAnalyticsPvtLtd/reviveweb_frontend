import * as React from "react";
import { useState, useEffect } from 'react';
import Link from "next/link";
import axios from "axios";

export const gradientStyle = {
  backgroundImage: 'linear-gradient(126deg, #1862F7 -107.15%, #3DD6C4 98.8%)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
};


// Define the section header component for reusable headings
const SectionHeader = ({ title }) => (

  // <h1 class="text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">A Guide to Adding Gradients with Tailwind CSS</h1>
  <div style={gradientStyle} className=" relative font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-teal-300">
    {title}
  </div>)

// Reusable Section Title Component
const SectionTitle = ({ className, children }) => (
  <h2 className={`relative mt-10 font-medium text-white leading-[97px] ${className}`}>
    {children}
  </h2>
);

// Reusable Gradient Text Component
const GradientText = ({ className, children }) => (
  <div
    className={`relative mt-7 font-extrabold bg-clip-text bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] leading-[135%] ${className}`}
  >
    {children}
  </div>
);

// Reusable Text Component
const RegularText = ({ className, children }) => (
  <p className={`relative mt-14 text-lg leading-6 text-white ${className}`}>
    {children}
  </p>
);

// Reusable Button Component
const CTAButton = ({ className, onClick, children }) => (
  <button
    tabIndex="0"
    className={`relative justify-center self-start px-12 py-5 mt-10 text-lg font-bold leading-6 whitespace-nowrap bg-teal-400 rounded-[40px] text-zinc-800 cursor-pointer ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

function HomePageBlur() {
  return (
    <main className="flex overflow-hidden relative flex-col px-10 py-12 text-6xl backdrop-blur-[15px] fill-zinc-900 fill-opacity-50 max-w-[891px] min-h-[727px] stroke-[1px] stroke-white max-md:px-5 max-md:text-4xl">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cc6c5d1d381a5af05633b99e95aab5f4f2679d73dbd61e584ac1ad20e17f275?apiKey=7b91412e16384e1384258b56fe71fd0b&"
        alt="Background image"
        className="object-cover absolute inset-0 size-full"
      />
      <SectionTitle className="max-md:mt-5 max-md:text-4xl max-md:leading-[60px]">
        Empowering Innovation Through Data
      </SectionTitle>
      <div>
        <li> <SectionHeader title={"Excellence"} className="m-10" /></li>
      </div>

      <RegularText className="max-md:mt-10 max-md:max-w-full">
        We specialize in customized data analytics solutions and strategic partnerships with industry leaders.
      </RegularText>
      <CTAButton className="max-md:px-5">Lets Connect</CTAButton>
    </main>
  );
}





function DataInnovationBanner() {
  return (
    <>
      <div className="border-radius-5 relative flex-col backdrop-blur-[15px] fill-zinc-900 fill-opacity-50 max-w-[923px] min-h-[727px] stroke-[1px] stroke-black max-md:px-5 max-md:text-4xl">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cc6c5d1d381a5af05633b99e95aab5f4f2679d73dbd61e584ac1ad20e17f275?apiKey=7b91412e16384e1384258b56fe71fd0b&"
          className="w-full aspect-w-122 aspect-h-100 backdrop-blur-[15px] fill-zinc-900 fill-opacity-50 max-w-[891px] stroke-[1px] stroke-white z-10"
        />
      </div>

    </>
  )
}



function ConnectButton() {
  return (
    <div tabIndex="0" role="button" className="relative justify-center self-start cursor-pointer px-12 py-5 mt-10 text-lg font-bold leading-6 whitespace-nowrap bg-teal-400 rounded-[40px] text-zinc-800 max-md:px-5" >
      Lets Connect
    </div>
  );
}



const ProgressBar = ({ className }) => {
  return (
    <div className={`flex-1 shrink-0 h-1 ${className} rounded-[100px]`}></div>
  );
};



function LandingPage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState(false);


  const slidesz = [
    {
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d481d2200b7e5a8c0bb3dcbc71d176b57680f8c08fc9d561db29b5b395fa6601?apiKey=7b91412e16384e1384258b56fe71fd0b&',
      content: (
        <div className="rounded-[30px] flex overflow-hidden relative flex-col px-4 py-8 md:px-8 lg:px-16 xl:px-20 mt-5 md:mt-10 mb-2 max-w-full text-3xl md:text-6xl backdrop-blur-[12px] fill-zinc-800 fill-opacity-40 md:max-w-[800px] md:min-h-[581px] stroke-[1px] stroke-white">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83141ea38a43075840087582d23eca50352bc92375f226a06f9a55ab1db1ffad?apiKey=7b91412e16384e1384258b56fe71fd0b&"
            className="object-cover absolute inset-0 w-full h-full rounded-[30px]"
          />
          <div className="relative mt-4 font-medium text-white leading-[44px] md:leading-[77px]">
            Empowering Innovation Through Data
          </div>
          <div className="relative h-[1em] overflow-hidden">
            <span className="absolute inset-0 h-full w-full leading-none animate-slide [animation-delay:0s]">
              <SectionHeader title={"Excellence"} />
            </span>
            <span className="absolute inset-0 h-full w-full leading-none animate-slide [animation-delay:-5s]">
              <SectionHeader title={"Analytics"} />
            </span>
            <span className="absolute inset-0 h-full w-full leading-none animate-slide [animation-delay:-2.5s]">
              <SectionHeader title={"Intelligence"} />
            </span>

          </div>

          <div className="relative mt-1 text-base md:text-lg leading-6 text-white md:max-w-4/5">
            We specialize in customized data analytics solutions and strategic partnerships with industry leaders.
          </div>
          <div className="relative justify-center self-start px-6 py-3 mt-5 md:mt-8 mb-7 text-base md:text-lg font-bold leading-6 whitespace-nowrap bg-teal-400 rounded-[30px] text-zinc-800">
            Lets Connect
          </div>
        </div>
      ),
    },
    {
      image: 'https://wallpaperswide.com/download/mountain_lake_landscape_nature-wallpaper-720x1280.jpg',
      content: (
        <div className="rounded-[30px] flex overflow-hidden relative flex-col px-4 py-8 md:px-8 lg:px-16 xl:px-20 mt-5 md:mt-10 mb-2 max-w-full text-3xl md:text-6xl backdrop-blur-[12px] fill-zinc-800 fill-opacity-40 md:max-w-[800px] md:min-h-[581px] stroke-[1px] stroke-white">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83141ea38a43075840087582d23eca50352bc92375f226a06f9a55ab1db1ffad?apiKey=7b91412e16384e1384258b56fe71fd0b&"
            className="object-cover absolute inset-0 w-full h-full rounded-[30px]"
            alt=""
          />
          <div className="relative mt-4 font-medium text-white leading-[48px] md:leading-[77px]">
            Empowering Innovation Through Data
          </div>
          <div className="relative mt-1 font-extrabold bg-clip-text bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] md:text-5xl ]">
            Excellence
          </div>
          <div className="relative mt-1 text-base md:text-lg leading-6 text-white md:max-w-4/5">
            We specialize in customized data analytics solutions and strategic partnerships with industry leaders.
          </div>
          <div className="relative justify-center self-start px-6 py-3 mt-5 md:mt-8 mb-7 text-base md:text-lg font-bold leading-6 whitespace-nowrap bg-teal-400 rounded-[30px] text-zinc-800">
            Lets Connect yp
          </div>
        </div>
      ),
    },
    {
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d481d2200b7e5a8c0bb3dcbc71d176b57680f8c08fc9d561db29b5b395fa6601?apiKey=7b91412e16384e1384258b56fe71fd0b&',
      content: (
        <div className="rounded-[30px] flex overflow-hidden relative flex-col px-4 py-8 md:px-8 lg:px-16 xl:px-20 mt-5 md:mt-10 mb-2 max-w-full text-3xl md:text-6xl backdrop-blur-[12px] fill-zinc-800 fill-opacity-40 md:max-w-[800px] md:min-h-[581px] stroke-[1px] stroke-white">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83141ea38a43075840087582d23eca50352bc92375f226a06f9a55ab1db1ffad?apiKey=7b91412e16384e1384258b56fe71fd0b&"
            className="object-cover absolute inset-0 w-full h-full rounded-[30px]"
            alt=""
          />
          <div className="relative mt-4 font-medium text-white leading-[48px] md:leading-[77px]">
            Empowering Innovation Through Data
          </div>
          <div className="relative mt-1 font-extrabold bg-clip-text bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] md:text-5xl ]">
            Excellence
          </div>
          <div className="relative mt-1 text-base md:text-lg leading-6 text-white md:max-w-4/5">
            We specialize in customized data analytics solutions and strategic partnerships with industry leaders.
          </div>
          <div className="relative justify-center self-start px-6 py-3 mt-5 md:mt-8 mb-7 text-base md:text-lg font-bold leading-6 whitespace-nowrap bg-teal-400 rounded-[30px] text-zinc-800">
            Lets Connect yp
          </div>
        </div>
      ),
    },

  ];




  const handleSlideChange = (index) => {
    setTransition(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTransition(false);
    }, 500);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleSlideChange((currentSlide + 1) % slidesz.length);
  //   }, 8000);

  //   return () => clearInterval(interval);
  // }, [currentSlide, slidesz.length]);

  function HeroSection() {
    return (
      <section className="flex overflow-hidden relative flex-col justify-center items-start px-12 py-14 text-7xl  max-md:px-5 max-md:max-w-full max-md:text-4xl">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a27f99b1aabeac700665a4384685adeb380162927767f2fdeedbc5ba9eb1628?apiKey=7b91412e16384e1384258b56fe71fd0b"
          alt="Background image"
          className="object-cover absolute rounded-2xl inset-0 size-full"
        />
        <div className="flex relative flex-col px-10 py-14 max-w-full rounded-3xl border border-white border-solid backdrop-blur-[15px] bg-zinc-900 bg-opacity-50 w-[891px] max-md:px-5 max-md:text-4xl">
          <h1 className="font-medium text-white leading-[97px] max-md:max-w-full max-md:text-4xl max-md:leading-[60px]">
            Empowering Innovation Through Data
          </h1>
          <div className="mt-7 font-extrabold leading-none max-md:max-w-full max-md:text-4xl">
            <div className="relative h-[1em] overflow-hidden">
              <span className="absolute inset-0 h-full w-full leading-none animate-slide [animation-delay:0s]">
                <SectionHeader title={"Excellence"} />
              </span>
              <span className="absolute inset-0 h-full w-full leading-none animate-slide [animation-delay:-5s]">
                <SectionHeader title={"Analytics"} />
              </span>
              <span className="absolute inset-0 h-full w-full leading-none animate-slide [animation-delay:-2.5s]">
                <SectionHeader title={"Intelligence"} />
              </span>

            </div>
          </div>
          <p className="mt-11 text-lg leading-6 text-white max-md:mt-10 max-md:max-w-full">
            We specialize in customized data analytics solutions and strategic
            partnerships with industry leaders.{" "}
          </p>
          <button className="justify-center self-start px-12 py-5 mt-10 text-lg font-bold leading-6 bg-teal-400 rounded-[40px] text-zinc-800 max-md:px-5">
           <Link href="/contact"> Let's Connect</Link>
          </button>
        </div>
      </section>
    );
  }

  function StatCard({ title, description }) {
    return (
      <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
        <div className="flex grow justify-center items-center px-16 py-11 w-full font-medium text-center text-white rounded-3xl bg-slate-900 max-md:px-5 max-md:mt-5 max-md:max-w-full">
          <div className="flex flex-col">
            <div className="self-center text-5xl tracking-wide capitalize leading-[68.16px] max-md:text-4xl">
              {title}
            </div>
            <div className="mt-10 text-3xl leading-10">{description}</div>
          </div>
        </div>
      </div>
    );
  }


  function StatsSection() {

    const [statsData, setStatData] = useState([])

    useEffect(()=>{
        axios.get('https://revive-production.up.railway.app/contents/statistics/').then((r)=>{
          setStatData(r.data)
        })
    }, [])
    
    return (
      <section className="mt-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {statsData.map((stat) => (
            <StatCard key={stat.id} title={stat.counts} description={stat.title} />
          ))}
        </div>
      </section>
    );
  }



  return (
    // <div className="container mx-auto">

    //   <div className="flex flex-col px-5 pb-20 rounded-3xl border border-white border-solid backdrop-blur-[10px] ">
    //     <div className="flex relative mt-5 gap-1.5 self-end mr-32 sm:mb-5 sm:justify-center">
    //       <div className="shrink-0 h-1 bg-teal-600 rounded-[100px] w-[80px]" />
    //       <div className="shrink-0 h-1 bg-teal-400 rounded-[100px] w-[80px]" />
    //       <div className="shrink-0 h-1 bg-teal-400 rounded-[100px] w-[80px]" />
    //       <div className="shrink-0 h-1 bg-teal-400 rounded-[100px] w-[80px]" />
    //     </div>
    //     <div className="flex overflow-hidden relative flex-col px-12 pb-20 w-full min-h-[899px] md:max-w-full max-md:px-5 max-md:max-w-full">
    //       <img
    //         loading="lazy"
    //         srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d481d2200b7e5a8c0bb3dcbc71d176b57680f8c08fc9d561db29b5b395fa6601?apiKey=7b91412e16384e1384258b56fe71fd0b&"
    //         className="object-cover absolute mx-auto inset-0 w-full h-full rounded-[30px]"
    //       />


    //       <div className="rounded-[30px] flex overflow-hidden relative flex-col px-4 py-8 md:px-8 lg:px-16 xl:px-20 mt-5 md:mt-10 mb-2 max-w-full text-3xl md:text-6xl backdrop-blur-[12px] 
    //       fill-zinc-800 fill-opacity-40 md:max-w-[800px] md:min-h-[581px] stroke-[1px] stroke-white">
    //         <img
    //           loading="lazy"
    //           src="https://cdn.builder.io/api/v1/image/assets/TEMP/83141ea38a43075840087582d23eca50352bc92375f226a06f9a55ab1db1ffad?apiKey=7b91412e16384e1384258b56fe71fd0b&"
    //           className="object-cover absolute inset-0 w-full h-full rounded-[30px]"
    //         />
    //         <div className="relative mt-4 font-medium text-white leading-[48px] md:leading-[77px]">
    //           Empowering Innovation Through Data
    //         </div>
    //         <div className="relative mt-1 font-extrabold bg-clip-text bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] md:text-3xl leading-[108%]">
    //           Excellence
    //         </div>
    //         <div className="relative mt-1 text-base md:text-lg leading-6 text-white md:max-w-4/5">
    //           We specialize in customized data analytics solutions and strategic
    //           partnerships with industry leaders.
    //         </div>
    //         <div className="relative justify-center self-start px-6 py-3 mt-5 md:mt-8 mb-7 text-base md:text-lg font-bold leading-6 whitespace-nowrap bg-teal-400 rounded-[30px] text-zinc-800">
    //           Lets Connect
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>

      <div className="">
        <div className="flex flex-col relative">
          <div className="absolute inset-0 bg-cover bg-center z-0 w-screen" style={{ backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets/TEMP/0a27f99b1aabeac700665a4384685adeb380162927767f2fdeedbc5ba9eb1628?apiKey=7b91412e16384e1384258b56fe71fd0b')", filter: "blur(20px)" }}></div>
          <div className="container mx-auto ">
          <div className="flex flex-col p-5 w-full rounded-3xl border border-white border-solid backdrop-blur-[10px] z-10 max-md:max-w-full mt-5 relative">
            <HeroSection />
            <StatsSection />
          </div>
          </div>
        </div>

        {/* <div className="flex flex-col  rounded-3xl border border-white border-solid backdrop-blur-[10px]">
          <div className="mb-2 flex relative gap-1.5 self-end mr-32 sm:mb-5 sm:justify-center">
            {slidesz.map((_, index) => (
            <div
              key={index}
              className={`shrink-0 h-1 rounded-[100px] w-[80px] cursor-pointer ${index === currentSlide ? 'bg-teal-500' : 'bg-teal-400'}`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
          </div>
          <div className="rounded-xl m-2 flex overflow-hidden relative flex-col px-12 md:max-w-full  max-md:max-w-full">
            <div
              className={`transition-transform duration-500 ${transition ? 'translate-x-full' : ''
                }`}
            >
              <img
                loading="lazy"
                src={slidesz[currentSlide].image}
                className=" object-cover absolute mx-auto inset-0 w-full h-[full] rounded-[30px sm:pt-2]"
                alt=""
              />


              {slidesz[currentSlide].content}
            </div>
          </div>
          <div className=' m-2 container mx-auto m-5 '>
            <div className="flex m-2  gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center text-3xl font-medium tracking-wide leading-10 text-center text-white capitalize max-md:mt-5 max-md:max-w-full">
                  <div className="justify-center items-center px-16 py-10 rounded-3xl bg-slate-900 max-md:px-5 max-md:max-w-full">
                    <span className="text-3xl tracking-wide text-white capitalize leading-[68px]">
                      19+
                    </span>{" "}
                    <br />
                    <span className="text-2xl text-white">Year of Experience</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center text-3xl font-medium tracking-wide leading-10 text-center text-white capitalize max-md:mt-5 max-md:max-w-full">
                  <div className="justify-center items-center px-16 py-10 rounded-3xl bg-slate-900 max-md:px-5 max-md:max-w-full">
                    <span className="text-3xl tracking-wide text-white capitalize leading-[68px]">
                      100+
                    </span>{" "}
                    <br />
                    <span className="text-2xl text-white">Projects</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-center text-3xl font-medium tracking-wide leading-10 text-center text-white capitalize max-md:mt-5 max-md:max-w-full">
                  <div className="justify-center items-center px-16 py-10 rounded-3xl bg-slate-900 max-md:px-5 max-md:max-w-full">
                    <span className="text-2xl tracking-wide text-white capitalize leading-[68px]">
                      100%
                    </span>{" "}
                    <br />
                    <span className="text-2xl text-white">Data security Mesaures</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}


      </div>
    </>

  );
}

export default LandingPage;