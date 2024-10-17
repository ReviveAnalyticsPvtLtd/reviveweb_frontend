"use client";
import * as React from "react";
import FooterComponent from "@/components/Footer";
import NavBar from "@/components/header/Navbar";
import ContactBanner from "@/components/ContactBanner";
import CustomCursor from "../../components/CustomCursor";
import axios from "axios";

function TosPage(props) {
  const [tos, setTos] = React.useState({
    title: "Terms of Service",
    body: "<p>Loading...</p>",
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/contents/tos/")
      .then((response) => {
        setTos(response.data[0]);
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
                {tos.title || "Terms of Service"}
                <span className="absolute inset-0 bg-white bg-opacity-10 blur-sm"></span>
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex gap-5 justify-between self-center mt-32 w-full text-center max-w-[1663px] text-zinc-800 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1 px-5 max-md:max-w-full">
              <div
              dangerouslySetInnerHTML={{ __html: tos.body }}
              >

              </div>
              
            </div>
            {/* <div className="shrink-0 self-end mt-32 w-16 bg-teal-400 rounded-3xl h-[188px] max-md:mt-10" /> */}
          </div>
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
    </>
  );
}

export default TosPage;
