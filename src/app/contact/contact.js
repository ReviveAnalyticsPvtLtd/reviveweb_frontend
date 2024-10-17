"use client";
import React, { useState , useEffect} from "react";
import axios from "axios";

function SocialIcon({ src, alt }) {
  return (
    <div className="flex justify-center items-center p-3 w-11 h-11 rounded-md bg-white bg-opacity-10">
      <img loading="lazy" src={src} alt={alt} className="w-5 aspect-square" />
    </div>
  );
}

const SOCIALTHING = () => {

  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    axios.get("https://revive-production.up.railway.app/contents/socials/")

      .then(response => {
        setSocialLinks(response.data)
      })
  }, [])


  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd547460a4400521626bf9c1138e5506ef584172fad311d00e72bb4c24d94c43?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 1",
      name: "FACEBOOK"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f62d5684fff20df1ea3cc8d2a0a4e84cf91ef5ef71b01152641a09fb7a809885?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 2",
      name: "TWITTER"

    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3758dd998c615380b18c26a4252ad38c6b2e51ef3f6f916c6888b41080d7e590?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 3",
      name: "LINKEDIN"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e8b0905bc119d55ece09921e276d0496b4597bc5ff65c1f825d1e533bc0774f7?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 4",
      name: "INSTAGRAM"
    },
  ];

  const handleOnclick = (link) => {
    const socialLink = socialLinks?.find(socialLink => socialLink.platform === link);
    
    if (socialLink) {
      // Check if window is defined (client-side)
      if (typeof window !== "undefined") {
        window.open(socialLink.url, "_blank");
      } else {
        // Handle the case where window is undefined (optional)
        console.log("Window is not defined (likely SSR)");
        // You can choose to redirect or handle this differently based on your app's logic
      }
    }
  };



  return (
    <>
      <div className="flex gap-2 self-start mt-10">
        {socialIcons?.map((icon, index) => (
          <>
            <div onClick={() => { handleOnclick(icon.name) }} className="flex cursor-pointer justify-center items-center p-3 w-11 h-11 rounded-md bg-white bg-opacity-10">
              <img loading="lazy" src={icon.src} className="w-5 aspect-square" />
            </div>
          </>
        ))}
      </div>
    </>
  )
}



function ContactForm() {
  const [purpose, setPurpose] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = React.useState({});
  const [fields, setFields] = useState({
    full_name: "",
    organisation: "",
    email: "",
    phone_number: "",
    requirements: "",
    detail: "",
    requirements: "",
  });

  //console log the formData
  const handleOnChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
    setErrors([]);

  };


  const handleSubmit = async (e) => {
    setErrors({})
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData();

    //add the fields to the formData
    for (const key in fields) {
      formData.append(key, fields[key]);
    }



    try {
      const response = await axios.post(
        "https://revive-production.up.railway.app/contents/contacts/",
        formData,
        {

          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setIsLoading(false)
        setIsSubmitted(true)

        // alert("Form submitted successfully")
        //empty the fields
        setFields({
          full_name: "",
          organisation: "",
          email: "",
          phone_number: "",
          detail: "",
          specify: "",
          requirements: "",
        });

      }
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)

      if (error.response && error.response.data) {
        const flattenedErrors = Object.entries(error.response.data).flatMap(
          ([key, value]) =>
            value.map((error) => `${fieldsName[key] || key}: ${error}`)
        );
        setErrors(flattenedErrors);
      }

    }
  };

  const [isOther, setIsOther] = useState(false);


  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd547460a4400521626bf9c1138e5506ef584172fad311d00e72bb4c24d94c43?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f62d5684fff20df1ea3cc8d2a0a4e84cf91ef5ef71b01152641a09fb7a809885?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3758dd998c615380b18c26a4252ad38c6b2e51ef3f6f916c6888b41080d7e590?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 3",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e8b0905bc119d55ece09921e276d0496b4597bc5ff65c1f825d1e533bc0774f7?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 4",
    },
  ];

  const handleOnChangePurpose = (e) => {
    const selectedId = e.target.value;
    const selectedItem = purpose?.find(item => item.id == selectedId);
    if (selectedItem && selectedItem.title === "other") {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  }
  React.useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/contents/purposes/")
      .then((response) => {
        setPurpose(response.data);
      })
      .catch((error) => {
        console.error("Error fetching purposes", error);
      });
  }, []);



  return (
    <div className="pr-10 rounded-3xl border border-solid bg-stone-50 border-stone-950 max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <section className="hidden lg:block flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
          <div className="flex flex-col grow px-10 py-12 w-full rounded-3xl bg-slate-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <h1 className="text-6xl font-medium text-white leading-[97px] max-md:max-w-full max-md:text-4xl max-md:leading-[40px]">
              What’s on your mind?{" "}
            </h1>
            <p className="mt-14 text-4xl text-white leading-[54px] max-md:mt-10 max-md:max-w-full">
              Find the answers you need.
            </p>
            <p className="self-start mt-72 text-4xl tracking-tighter leading-10 text-white max-md:mt-10">
              Get in touch
            </p>
             <SOCIALTHING/>
          </div>
        </section>
        <section className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">

          <div className="flex flex-col mt-10 rounded-3xl max-md:max-w-full">
            {isSubmitted && <span style={{color: 'rgb(17,94,89)', fontSize: '26px', paddingBottom: '4rem'}}> Thank you for contacting us, We will get back to you soon!</span>}
            {!isSubmitted &&  
              <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="full_name"
                  className="text-lg leading-6 text-zinc-800"
                >
                  First Name*
                </label>
                <input
                  onChange={handleOnChange}
                  name="full_name"
                  type="text"
                  id="full_name"
                  placeholder="Full Name"
                  aria-label="Full Name"
                  className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label
                  htmlFor="company"
                  className="text-lg leading-6 text-zinc-800"
                >
                  Company/Organization*
                </label>
                <input
                  onChange={handleOnChange}
                  name="organisation"
                  type="text"
                  id="company"
                  placeholder="Brand/company/Product Name"
                  aria-label="Company Name"
                  className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5"
                />
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex gap-5 max-md:flex-wrap">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="email"
                      className="mt-5 text-lg leading-6 text-zinc-800 max-md:max-w-full"
                    >
                      Email*
                    </label>
                    <input
                      onChange={handleOnChange}
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      aria-label="Email Address"
                      className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="phone"
                      className="mt-5 text-lg leading-6 text-zinc-800 w-full max-md:max-w-full"
                    >
                      Number*
                    </label>
                    <input
                      onChange={handleOnChange}
                      name="phone_number"
                      type="tel"
                      id="phone_number"
                      placeholder="Phone Number"
                      aria-label="Phone Number"
                      className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="requirements"
                  className="mt-5  text-lg leading-6 text-zinc-800"
                >
                  Purpose of inquiry*
                </label>
                <select
                  onChange={handleOnChangePurpose}
                  id="requirements"
                  name="requirements"
                  placeholder="Select an Option"
                  aria-label="Purpose"
                  className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5"
                >
                  <option value="">Select an Option</option>
                  {purpose.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              {isOther && (
                <div className="flex flex-col">
                  <label
                    htmlFor="detail"
                    className="mt-5 text-lg leading-6 text-zinc-800 max-md:max-w-full"
                  >
                    If Other, Please specify
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    id="detail"
                    name="detail"
                    placeholder="detail"
                    aria-label="detail"
                    className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <label
                  htmlFor="requirement"
                  className="mt-5 text-lg leading-6 text-zinc-800 max-md:max-w-full"
                >
                  Requirement*
                </label>
                <textarea

                  onChange={handleOnChange}
                  name="requirements"
                  rows={5}
                  type="text"
                  id="requirement"
                  placeholder="Requirement"
                  aria-label="Requirement"
                  className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="mt-4 mb-4 justify-center self-start px-6 py-3.5 mt-9 text-base leading-6 whitespace-nowrap bg-teal-400 rounded-[40px] text-zinc-800 max-md:px-5"
              >
              {isLoading ? "Please wait..." : "Send Message"}
              </button>
            </form>
}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactForm;
