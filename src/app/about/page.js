"use client";
import * as React from "react";
import FooterComponent from "@/components/Footer";
import axios from "axios";
import NavBar from "@/components/header/Navbar";
import CustomCursor from "../../components/CustomCursor";
import { Dialog, Transition } from "@headlessui/react";
import ApplyButton from "./applyButton";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function CountryTab({ countryName, isActive }) {
  return (
    <div
      className={`justify-center items-start px-10 py-5 border-r border-solid ${
        isActive
          ? "bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)]"
          : "bg-slate-200"
      } border-neutral-900 max-md:px-5`}
    >
      {countryName}
    </div>
  );
}

function CountrySelector() {
  return (
    <nav className="flex gap-0 pr-20 text-sm leading-5 whitespace-nowrap rounded-3xl bg-slate-200 text-zinc-800 max-md:flex-wrap max-md:pr-5">
      <CountryTab countryName="USA" isActive={true} />
      <CountryTab countryName="INDIA" isActive={false} />
    </nav>
  );
}

export const gradientStyle = {
  backgroundImage: "linear-gradient(126deg, #1862F7 -107.15%, #3DD6C4 98.8%)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const SectionHeader = ({ title }) => (
  // <h1 class="text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">A Guide to Adding Gradients with Tailwind CSS</h1>
  <div
    style={gradientStyle}
    className="text-xl font-medium leading-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-teal-300"
  >
    {title}
  </div>
);

const ProfileCard = ({ name, designation, description, image }) => {
  const [showReadMore, setShowReadMore] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const cancelButtonRef = React.useRef(null);
  const handleonclick = () => {
    setOpen(!open);
  };

  return (
    <div
      onClick={handleonclick}
      className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
    >
      <div className="pb-7 w-full whitespace rounded-2xl border border-gray-400 border-solid bg-neutral-200 max-md:mt-7 max-md:max-w-full">
        <div className="flex flex-col justify-center bg-cyan-200 rounded-2xl max-w-[100%]">
          <img loading="lazy" srcSet={image} className="w-full aspect-[1.56]" />
        </div>
        <div className="flex flex-col self-start mt-8 ml-6 max-md:ml-2.5">
          <div className="text-2xl font-medium leading-9 text-zinc-800">
            {name}
          </div>
          <div className="mt-2 text-xl leading-7 text-zinc-800">
            {designation}
          </div>
          <div className="mt-2 text-lg leading-6  cursor-pointer">
            {/* <SectionHeader title={showReadMore ? "Hide" : "Career background"} /> */}
          </div>
          {/* {showReadMore && (
                        <div className="mt-5 text-lg text-zinc-800">
                            {description}
                        </div>
                    )} */}
        </div>
      </div>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full min-w-[400px] items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="p-6 relative transform overflow-hidden rounded-lg bg-gray-200 max-md:px-5 text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-[900px] lg:max-w-[900px]">
                  <button
                    onClick={handleonclick}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      onClick={handleonclick}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col rounded-2xl bg-cyan-200 r w-6/12 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        srcSet={image}
                        className="grow w-full aspect-[1.06] max-md:mt-2 max-md:max-w-full"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-zinc-800 max-md:mt-2 max-md:max-w-full">
                        <div className="mt-9 text-4xl font-medium leading-[50.04px] max-md:max-w-full">
                          {name}
                        </div>
                        <div>{designation}</div>
                        <div className="mt-10 text-lg leading-6 max-md:max-w-full">
                          {description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

function ContactPage(props) {
  const [about, setAbout] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [leaders, setLeader] = React.useState([])
    const [persons, setPersons] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/contents/abouts/")
      .then((response) => {
        setAbout(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    axios
        .get("https://revive-production.up.railway.app/contents/persons/")
        .then((response) => {
            setPersons(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        });


    axios
    .get("https://revive-production.up.railway.app/contents/leaders-vision/")
    .then((response) => {
      setLeader(response.data);
        setIsLoading(false);
    })
    .catch((error) => {
        console.error(error);
        setIsLoading(false);
    });

  }, []);

  

  let orderOne, orderTwo, orderThree;
  if (about.length) {
    orderOne = about?.filter((item) => item?.order === 0)[0];
    orderTwo = about?.filter((item) => item?.order === 1)[0];
    orderThree = about?.filter((item) => item?.order === 2)[0];
  }


  function LeaderCard({ position, name, description, photo }) {
    return (
      <div className="px-10 pt-14 pb-3 mt-36 w-full bg-teal-400 rounded-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-5 max-md:mt-10 max-md:max-w-full">
            {/* <div className="text-9xl leading-[135px] text-stone-950 max-md:max-w-full max-md:text-4xl">
                                  “
                              </div> */}
            <div className=" text-xl font-medium leading-8 text-zinc-800 max-md:mt-10 max-md:max-w-full">
              {" "}
             {description}
            </div>
            <div className="mt-8 text-2xl font-bold leading-8 text-zinc-800 max-md:max-w-full">
              {name}
            </div>
            <div className="mt-9 text-2xl font-medium leading-8 text-zinc-800 max-md:max-w-full">
              {position}
            </div>
            <div className="flex gap-4 justify-end self-end mt-20 mr-20 max-md:mt-10 max-md:mr-2.5">

            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[31%] max-md:ml-0 max-md:w-full">
         { photo && <img

            loading="lazy"
            srcSet={photo}
            className="w-[100%] h-[70%] aspect-square max-md:mt-10 border border-solid border-black max-md:max-w-full 
            padding-[10px] max-md:mt-10 max-md:max-w-full
            "
          />}
        </div>
      </div>
    </div>

    );
  }

//   return (
//     <div style={{ width: "98%", height: "100%", overflow: "hidden", padding: '30px' }}>
//       <Slider {...sliderSettings}>
//         {items.map((item, idx) => (
//           <ServiceCard key={idx} logo={item.logo} title={item.title} />
//         ))}
//       </Slider>
//     </div>
//   );
// };

const [currentBreakpoint, setCurrentBreakpoint] = React.useState("");

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


const sliderSettings = {
  infinite: true,
  autoplay: false,
  slidesToShow: 1,
  speed: 800,
  autoplaySpeed: 2000,
  cssEase: "ease-out",
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
    <>
      <CustomCursor />
      <NavBar />
      <div className="relative">
        <div
          className="h-[500px] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b')`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="relative text-white text-6xl font-bold">
              About
              <span className="absolute inset-0 bg-white bg-opacity-10 blur-sm"></span>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gray-200mt-10 mb-10 ">
        {/* <div className="mt-10 mx-auto container  overflow-hidden relative flex-col justify-center items-start self-start px-16 pt-60 pb-48 max-w-full text-7xl font-bold whitespace-nowrap rounded-3xl leading-[97.2px] min-h-[400px] text-neutral-200 w-[1712px] max-md:py-10 max-md:pr-5 max-md:pl-8 max-md:text-4xl">
                    <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/522ec72a1464954c5f86eeeec6d97213af9d1abe706c102c563d53cb098987a7?apiKey=7b91412e16384e1384258b56fe71fd0b&"
                        className="object-cover absolute inset-0 size-full"
                    />
                    <div className="flex text-left relative text-7xl font-bold leading-[97.2px] text-neutral-200 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                        About
                    </div>
                </div> */}

        <div className="mt-20 text-7xl font-bold whitespace-nowrap leading-[97.2px] text-zinc-800 max-md:mt-10 max-md:text-4xl ">
          {" "}
          About Revive Analytics{" "}
        </div>
        <div className="mt-[40px] text-2xl leading-8 text-center text-zinc-800 w-[1222px] max-md:mt-10 max-md:max-w-full">
          {" "}
         Where data meets innovation. Discover the driving force behind our
          commitment to transforming raw data into strategic advantages.
        </div>
        <div className="mt-[144px] text-7xl font-bold whitespace-nowrap leading-[97.2px] text-zinc-800 max-md:mt-10 max-md:text-4xl">
          {orderOne?.title}
        </div>

        <div className="mt-[40px] text-2xl  leading-8 text-center text-zinc-800 w-[1222px] max-md:mt-10 max-md:max-w-full">
          {orderOne?.description}
        </div>

        <div className="flex mt-[40px] gap-5 max-md:flex-col max-md:gap-0  mx-auto container">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={orderOne?.image}
              className="grow w-full aspect-[1.16] max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div
              dangerouslySetInnerHTML={{
                __html: orderOne?.side_content,
              }}
              className="flex flex-col mt-2 leading-8 text-zinc-800 max-md:mt-10 max-md:max-w-full"
            ></div>
          </div>
        </div>
        <div className="  mx-auto container">
          <div className="mt-[144px] text-7xl font-bold text-center whitespace-nowrap leading-[97.2px] text-zinc-800 max-md:mt-10 max-md:text-4xl ">
            {orderTwo?.title}
          </div>

          <div className="flex justify-center items-center mt-16 text-2xl leading-8 text-center text-zinc-800 max-md:mt-10 max-md:max-w-full">
  {orderThree?.description}
</div>
          <div className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src={orderTwo?.image}
                  className="grow w-full aspect-[1.16] max-md:mt-10 max-md:max-w-full"
                />
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div
                  dangerouslySetInnerHTML={{
                    __html: orderTwo?.side_content,
                  }}
                  className="flex flex-col mt-2 leading-8 text-zinc-800 max-md:mt-10 max-md:max-w-full"
                ></div>
              </div>
            </div>
          </div>

             <div style={{  width: "98%", height: "100%", overflow: "hidden", padding: '30px' }}>
    <Slider {...sliderSettings}>
    {leaders?.map((leader)=>{
              return (
              <div className="p-3"> 
              <LeaderCard 
              name={leader.name}
              description={leader.description}
              position={leader.position}
              photo={leader.photo}
            /></div>)
            })}
      </Slider>
  </div>


            
        </div>
      </div>

      <div className="mx-auto flex flex-col">
        <div className="mt-22 mb-6 text-7xl font-bold  text-center text-black leading-[97.2px] max-md:mt-10 max-md:text-4xl ">
          Leadership Team
        </div>
        <div class=" p-2 bg-gradient-to-r from-blue-400 to-teal-400">
          <div className=" mx-auto flex flex-col  mb-10 flex flex-col w-full max-w-[1406px] max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className=" mt-10 flex gap-5 max-md:flex-col max-md:gap-0">
                {persons.map((person) => {
                    return (
                        <ProfileCard
                        image={person?.photo}
                        name={person?.name}
                        designation={person?.title}
                        description={person?.description}
                        />
                    );
                })}
                {/* <ProfileCard
                  image={
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/c4f6ee9a9ca2ed7fde30aef85a0c85d22ed53fd8095f54e51df4ecdd8535dace?apiKey=7b91412e16384e1384258b56fe71fd0b"
                  }
                  name={" Sanjeev Swarnkar"}
                  designation={"CEO & Founder"}
                  description={
                    "Through his prior contribution to MicroStar & for Ball Corporation Sanjeev brings a  unique ability to leveragehis expertise in software development, data & analytics and systems integrations to help their operations run smoothly and their businesses grow."
                  }
                />

                <ProfileCard
                  image={
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/3991ecfb6a7cb0193ec2c9b95713e3bf756900ee53349a7404eb96dc8ce74168?apiKey=7b91412e16384e1384258b56fe71fd0b"
                  }
                  name={" Modi Daryani"}
                  designation={"Senior Architect & Co-Founder"}
                  description={
                    "An alumnus of ISB and an engineer, with prior contributions to companies such as Tarana Wireless, Parallel Wireless, Nokia, and Aricent, brings approximately 20 years of extensive experience in the telecom industry. With strong leadership capabilities to lead technical teams and drive innovation, his vision is to enhance network reliability and sustainability through his innovative approach of fostering collaboration within the competitive environment for the right cause."
                  }
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mx-auto  mt-[144px]  flex flex-col content-center text-center w-full max-w-[1406px] max-md:mt-10 max-md:max-w-full">
        <div className="text-7xl font-bold text-zinc-800 text-center whitespace-nowrap leading-[97.2px] max-md:mt-10 max-md:text-4xl">
                  {orderThree?.title}
        </div>
        <div className="flex justify-center items-center mt-16 text-2xl leading-8 text-center text-zinc-800 max-md:mt-10 max-md:max-w-full">
  {orderThree?.description}
</div>
        <div className=" mt-11 w-full max-w-[1406px] max-md:mt-10 max-md:max-w-full">
          <div>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div
                    dangerouslySetInnerHTML={{
                        __html: orderThree?.side_content,
                    }}
                className="flex flex-col grow px-5 py-1.5 text-2xl leading-6 text-black max-md:mt-10 max-md:max-w-full">

                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                    src={orderThree?.image}
                  className="w-full aspect-[1.16] max-md:mt-10 max-md:max-w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-20 font-medium text-zinc-800 mb-20">
          <div className="flex justify-center items-center px-16 mt-24 w-full bg-gray-400 rounded-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex z-10 gap-5 justify-between mt-2 mb-0 w-full max-w-[1406px] max-md:flex-wrap max-md:mb-2.5 max-md:max-w-full relative">
              <div className="flex flex-col my-auto max-w-full md:w-1/2">
                <div className="pt-20 text-4xl tracking-wide capitalize leading-[68px] md:max-w-full md:text-4xl md:leading-[63px]">
                  Discover how you can make an impact with us
                </div>
                <ApplyButton />
              </div>
              <div
                className="absolute top-0 right-0 hidden md:block"
                style={{ marginTop: "-55px" }}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f0430efe94817906ea2602b20c69e593b9e5c0ed1e7dcfb6424b2b36c3a8ccd?apiKey=7b91412e16384e1384258b56fe71fd0b&width=450"
                  className="rounded-xl w-[450px] h-[450px] max-md:w-[300px] max-md:h-[300px] max-md:mt-10 max-md:max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FooterComponent />
      </div>
    </>
  );
}

export default ContactPage;
